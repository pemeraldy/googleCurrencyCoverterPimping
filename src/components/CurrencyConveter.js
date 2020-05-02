import React from 'react'


const CurrencyConveter = (props) => {
    const { countries, selectedCurrency, onChangeCurrency, amount, onChangeAmount } = props
    console.log(countries)
    return (
        <div>
            <input type="number" value={amount} onChange={onChangeAmount} />
            <select value={selectedCurrency} onChange={onChangeCurrency}>
                {countries.map(country => <option key={country.name} value={country.currencies[0].code}>{`${country.name} ${country.currencies[0].code}`}</option>)}
            </select>

        </div>
    )
}

export default CurrencyConveter