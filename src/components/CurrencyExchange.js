import React, { useState, useEffect } from "react";
function useRates(){
  const [rates, setRates] = useState({});
  async function fetchData() {
    let jsonResults;
    try {
      const resUSD = await fetch("https://api.exchangeratesapi.io/latest?base=USD");
      const resEuro = await fetch("https://api.exchangeratesapi.io/latest?base=EUR");
      const resGBP = await fetch("https://api.exchangeratesapi.io/latest?base=GBP");
      jsonResults = await Promise.all([resUSD.json(), resEuro.json(), resGBP.json()])
    } catch (err) {
      console.log(err);
    }
    const currencies = ['EUR', 'GBP', 'USD'];
    const rdc = jsonResults.reduce((obj, {rates, base}) => {
      const ratesNotIncluded = currencies
        .filter(currency => currency !== base)
        .map(currency => ({[currency]: rates[currency]}));
        return {
          ...obj,
          [base]: ratesNotIncluded.reduce((acc, obj) => ({...acc, ...obj}), {})
        }
    }, {})
    setRates(rdc);
  }

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 1000);
    return () => clearInterval(id);
  }, []);

  return rates;
}
const CurrencyExchange = () => {
  const rates = useRates();
  const [pockets, setPockets] = useState({
    'USD': 100,
    'GBP': 50,
    'EUR': 150,
  });
  return (
    <div>
      {Object.entries(pockets).map(([currency, value]) => (
        <>
        <div>
          {currency}
        </div>
        <div>
          {value}
        </div>
        </>
      ))}
    </div>
  );
};
export default CurrencyExchange;
