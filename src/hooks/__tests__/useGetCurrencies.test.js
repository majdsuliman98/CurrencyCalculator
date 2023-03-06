/**
 * @jest-environment jsdom
 */
import { renderHook, waitFor } from '@testing-library/react';
import { useGetCurrencies } from '../useGetCurrencies';

global.fetch = jest.fn();

describe('useGetCurrencies', () => {
    const mockRates = [{
        table: "A",
        no: "038/A/NBP/2022",
        effectiveDate: "2022-02-25",
        rates: [
            { currency: "bat (Tajlandia)", code: "THB", mid: 0.1212 },
            { currency: "dolar amerykański", code: "USD", mid: 3.9456 },
            { currency: "euro", code: "EUR", mid: 4.5423 }
        ]
        }];
        
    beforeAll(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockRates),
        status: 200
    });
    });

    afterAll(() => {
    jest.restoreAllMocks();
    });
    
  it('should fetch currency rate', async () => {
    const { result, rerender } = renderHook(() => useGetCurrencies());
    
    expect(result.current.currenciesLoaded).toBe(false);
    rerender();
    await waitFor(() => {
      expect(result.current.currenciesLoaded).toBe(true);
      expect(result.current.currencies.length).toBeGreaterThan(0);;
    })
  });
});