const axios = require("axios");

const getExchangeRate = async (fromCurrency, toCurrency) => {
    const response = await axios.get(
        "http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1"
    );
    const rate = response.data.rates;
    const euro = 1 / rate[fromCurrency];
    const exchangeRate = euro * rate[toCurrency];

    if (isNaN(exchangeRate)) {
        throw new Error(
            `Oops! Unable to get currency ${fromCurrency} to ${toCurrency}`
        );
    }
    return exchangeRate;
};

const getCoutries = async (toCurrency) => {
    try {
        const response = await axios.get(
            `https://restcountries.eu/rest/v2/currency/${toCurrency}`
        );
        return response.data.map((country) => country.name);
    } catch (err) {
        throw new Error(`Sorry, could not get a country that use ${err}`);
    }
};

const convertCurrency = async (fromCurrency, toCurrency, amount) => {
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    const countries = await getCoutries(toCurrency);
    const convertedAmount = (amount * exchangeRate).toFixed(2);

    return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency} and it can be spent in the
    following coutries: ${countries}`;
};
// getCoutries("NGN");

// getExchangeRate("USD", "NGN");
const converter = convertCurrency("USD", "NGN", 54);
converter.then((n) => console.log(n));
