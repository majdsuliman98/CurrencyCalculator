/**
 * @jest-environment jsdom
 */
import { renderHook, waitFor} from '@testing-library/react';
import { useGetRates } from '../useGetRates';

global.fetch = jest.fn();

describe('useGetRates', () => {
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
    const { result, rerender } = renderHook(() => useGetRates('USD'));
    
    expect(result.current.ratesLoaded).toBe(false);
    rerender();
    await waitFor(() => {
      expect(result.current.ratesLoaded).toBe(true);
      expect(result.current.rate).toBe(3.9456);
      expect(result.current.currencyName).toBe('dolar amerykański');
    })
  });

  // it('should return 0 if currency not found', async () => {
  //   const { result, rerender } = renderHook(() => useGetRates('GBP'));

  //   expect(result.current.ratesLoaded).toBe(false);

  //   rerender();

  //   await waitFor( () => {
  //     expect(result.current.ratesLoaded).toBe(true);
  //     expect(result.current.rate).toBe(0);
  //     expect(result.current.currencyName).toBe('');
  //   });    
  // });

  // it('should return 0 if request status is not 200', async () => {
  //   global.fetch.mockResolvedValueOnce({ status: 500 });
  //   const { result, rerender } = renderHook(() => useGetRates('USD'));

  //   expect(result.current.ratesLoaded).toBe(false);
  //   rerender();

  //   await waitFor(() => {
  //     expect(result.current.ratesLoaded).toBe(true);
  //     expect(result.current.rate).toBe(0);
  //     expect(result.current.currencyName).toBe('');
  //   })
  // });
});