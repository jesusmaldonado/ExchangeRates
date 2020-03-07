import React from 'react';
import { cIconMap } from '../utils/countryIconsMap';
export default function ExchangeRateDisplay({currentExchangeRate}){
  const [currencyUnits, rate] = currentExchangeRate.split(":");
  const [baseCurrency, secondaryCurrency] = currencyUnits.split("-");
  return (<div className="d-flex flex-column">
    {currentExchangeRate !== '' && (
      <>
      <div>
        <span>{baseCurrency}</span>
        <span
          className={`flag-icon flag-icon-${cIconMap[baseCurrency]}`}>
        </span>
        <span> to </span>
        <span>{secondaryCurrency}</span>
        <span
          className={`flag-icon flag-icon-${cIconMap[secondaryCurrency]}`}>
        </span>
      </div>
      <div className="align-self-center"><span className="font-weight-bold">Rate  </span>{rate}</div>
      </>
    )}
  </div>);
}
