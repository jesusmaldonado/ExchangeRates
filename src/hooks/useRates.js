import { useState, useEffect } from "react";

export default function useRates(){
  const [rates, setRates] = useState({});
  const abortController = new AbortController();
  const signal = abortController.signal
  let jsonResults;
  async function fetchData() {
    try {
      const resUSD = await fetch(
        "https://api.exchangeratesapi.io/latest?base=USD",
        {signal}
      );
      const resEuro = await fetch(
        "https://api.exchangeratesapi.io/latest?base=EUR",
        {signal}
      );
      const resGBP = await fetch(
        "https://api.exchangeratesapi.io/latest?base=GBP",
        {signal}
      );
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
    const id = setInterval(fetchData, 10000);
    return () => {
      clearInterval(id);
      abortController.abort();
    };
    // this is not a dependency, this hook needs to run once.
    // eslint-disable-next-line
  }, []);

  return rates;
}
