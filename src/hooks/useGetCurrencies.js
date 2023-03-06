import { useEffect, useState } from "react";

const CURRENCIES_URL = "https://api.nbp.pl/api/exchangerates/tables/a/last/?format=JSON";

export const useGetCurrencies = () => {
    const [currencies, setCurrencies] = useState([])
    const [currenciesLoaded,setCurrenciesLoaded] = useState(false);

 
    const fetchCurrencies = async () => {
        setCurrenciesLoaded(false);
        const request = await fetch(CURRENCIES_URL);
    
        // if(request.status !== 200){
        //     return 0;
        // }
    
        const data = await request.json();
        const currencies = data[0].rates.map(rate => rate.code);
        setCurrencies(currencies);
        setCurrenciesLoaded(true)

    }

    useEffect(() => {
        fetchCurrencies();
    },[])

    return {
        sourceCurrency: "PLN",
        currencies,
        currenciesLoaded,

    }
}