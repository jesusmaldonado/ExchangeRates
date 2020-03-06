import React from 'react';
export default function ExchangeRateDisplay({currentExchangeRate}){
  const [currencyUnits, rate] = currentExchangeRate.split(":");
  const [baseCurrency, secondaryCurrency] = currencyUnits.split("-");
  return (<div className="d-flex">
    {currentExchangeRate !== '' && (
      <>
      <div>{baseCurrency}</div>
      <div>{secondaryCurrency}</div>
      <div>{rate}</div>
      </>
    )}
  </div>);
}
