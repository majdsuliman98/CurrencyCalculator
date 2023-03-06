import React, { useEffect, useState } from 'react'
import { useGetCurrencies } from '../hooks/useGetCurrencies';
import { useGetRates } from '../hooks/useGetRates'
import { Input, Select } from "antd"
import '../styles/Home.css'
const { Option } = Select;

const CurrenciesDropdown = (currencies, currencyCode, onCurrencyCodeChange) => (
    
    <Select defaultValue={currencyCode}
        value={currencyCode}
        onChange={onCurrencyCodeChange}
        >
        
        {currencies.map((currency) => (
            <Option key={currency} value={currency} >{currency}</Option>
        ))}

    </Select>
)

const ConstantCurrency = (currency) => (
    <span style={{ background: "white" }} >
       {currency}
    </span>
)
const countryFlag = (code) => {
    
    return (
    <img 
    style = {{borderRadius:"2px", boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.4)"}}
    src = {`http://flagcdn.com/${code.toLowerCase().slice(0,-1)}.svg`}
    width ="30"/>
        )}

    
export const Home = () => {
    const [currencyCode, setCurrencyCode] = useState("USD");
    const [sourceAmount, setSourceAmount] = useState("");
    const [targetAmount, setTargetAmount] = useState("");
    const [sourceConverted, setSourceConverted] = useState();
    const [targetConverted, setTargetConverted] = useState();
    const [fieldChanging, setFieldChanging] = useState(1);

    const { sourceCurrency, currencies, currenciesLoaded} = useGetCurrencies();
    const { rate, ratesLoaded, currencyName} = useGetRates(currencyCode);

    
    const onSourceInputHandler = (evt) => {
        const value = evt.target.value;
        if (isNaN(value)) {
            return;
        }
        setSourceAmount(value);
    }

    const onTargetInputHandler = (evt) => {
        const value = evt.target.value;
        if (isNaN(value)) {
            return;
        }
        setTargetAmount(value);
        
    }

    const onCurrencyChange = (currency) => {
        console.log("New Currency:", currency)
        setFieldChanging(2);
        setCurrencyCode(currency);
    }

    useEffect(() => {
        if(ratesLoaded){
            setSourceConverted(rate)
            setTargetAmount(1)
        }

    }, [rate])

    useEffect(() => {
        if (ratesLoaded && sourceAmount && fieldChanging === 1) {
            setTargetAmount();
            setTargetConverted(parseFloat(sourceAmount / rate).toFixed(2));
            
        }
    }, [sourceAmount, currencyCode])

    useEffect(() => {
        if (ratesLoaded && targetAmount && fieldChanging === 2) {
            setSourceAmount();
            setSourceConverted(parseFloat(targetAmount * rate).toFixed(2));
            
        }
    }, [targetAmount, currencyCode])

    return (
        <section data-testid = 'id1' className= "container" >
            <h1 style= {{color:"grey"}}>Currency Exchange Calculator</h1>
            <span className='TargetCurrency' >1 {currencyName} =</span>
            <span className='SourceCurrency'>{rate} Polish Zloty</span>
            {currenciesLoaded &&
                <Input
                    className='Input1'
                    prefix = {countryFlag(currencyCode)}
                    // addonBefore = {getUnicodeFlagIcon(currencyCode)} 
                    addonAfter={CurrenciesDropdown(currencies, currencyCode, onCurrencyChange)}
                    placeholder={targetConverted}
                    value={targetAmount}
                    onFocus={() => setFieldChanging(2)}
                    onChange={onTargetInputHandler}
                     />}

            <Input
                className='Input2'
                prefix = {countryFlag(sourceCurrency)}
                addonAfter={ConstantCurrency(sourceCurrency)}
                placeholder={sourceConverted}
                value={sourceAmount}
                onChange={onSourceInputHandler}
                onFocus={() => setFieldChanging(1)}
            

            />


        </section>
    )
}