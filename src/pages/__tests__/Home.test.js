/**
 * @jest-environment jsdom
 */
import {render, screen,fireEvent} from "@testing-library/react"
import { Home } from '../Home'
import React from "react";


jest.mock('current-exchange-rate/src/hooks/useGetCurrencies.js', () => ({
    useGetCurrencies: jest.fn(() => ({
      sourceCurrency: 'PLN',
      currencies: ['USD', 'EUR'],
      currenciesLoaded: true,
    })),
  }));
  
  jest.mock('current-exchange-rate/src/hooks/useGetRates.js', () => ({
    useGetRates: jest.fn(() => ({
      rate: 4.00,
      ratesLoaded: true,
      currencyName: 'PLN',
    })),
  }));

  test('sets the value of the source input', () => {
    const { container } = render(<Home />);
    const sourceInput = container.querySelector('.Input2 input');
  
    fireEvent.change(sourceInput, { target: { value: '100' } });
  
    expect(sourceInput.value).toBe('100');
  });
  
  
