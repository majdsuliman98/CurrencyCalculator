import { useEffect, useState } from "react"

const RATES_URL = "https://api.nbp.pl/api/exchangerates/tables/a/last/?format=JSON";

export const useGetRates = (currency) => {
    const [ratesLoaded,setRateLoaded] = useState(false);
    const [rate,setRate] = useState(0);
    const [currencyName, setCurrencyName] = useState([])

    const fetchRates = async (currency) => {
        const request = await fetch(RATES_URL);
        
        if(request.status !== 200){
            return 0;
        }
        const data = await request.json();
        const foundRates = data[0].rates.filter(rate => rate.code === currency);
        const foundName= data[0].rates.filter(name => name.code === currency)[0]
        if(!foundRates.length){
            return 0;
        }
        const currencyRate = foundRates[0].mid;
        setRate(currencyRate);
        setRateLoaded(true)
        setCurrencyName(foundName['currency'])
    }

    useEffect(() => {
        fetchRates(currency);
    },[currency])

    return {
        ratesLoaded,
        rate,
        currencyName
    }
}