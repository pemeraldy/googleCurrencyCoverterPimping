import React, { useState, useEffect } from 'react';
import './App.css';
import CurrencyConveter from './components/CurrencyConveter';

// const extRate = 'http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1'

function App() {
  const [countries, setCountries] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [amount, setAmount] = useState(1)
  const [exchangeRate, setExchangeRate] = useState()
  const [inFromCurrency, setAmountInFromCurrency] = useState(true)

  let fromAmount, toAmount
  if (inFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }


  const fetchExchangeRates = () => {
    fetch('http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1')
      .then(resp => resp.json())
      .then(data => {
        console.log(fromCurrency)
        const rate = data.rates;
        const euro = 1 / rate[fromCurrency];
        console.log(euro)
        const exchRate = euro * rate[toCurrency];
        setExchangeRate(exchRate)
        // console.log(exchangeRate)
      })
  }
  // fetchExchangeRates()

  useEffect(() => {
    /**get countries**/
    fetch(`https://restcountries.eu/rest/v2`)
      .then((resp) => resp.json())
      .then(data => {
        setFromCurrency(data[4].currencies[0].code)//initial value of from currency
        setToCurrency(data[0].currencies[0].code)//initial value of to currency
        setCountries(data)
      })
  }, [])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetchExchangeRates()
    }
  }, [fromCurrency, toCurrency])

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }
  const handleTAmountChange = (e) => {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  // function changeCurr(e) {
  //   console.log(e.target.value)
  //   setToCurrency(e.target.value)
  // }
  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <CurrencyConveter
        countries={countries}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
      />
      <CurrencyConveter
        countries={countries}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleTAmountChange}
      />

    </div>
  );
}

export default App;
