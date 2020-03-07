import React, { useState } from "react";
import Pockets from './Pockets';
import useRates from '../hooks/useRates';
import Exchange from './Exchange';
const CurrencyExchange = () => {
  const rates = useRates();
  const [pockets, setPockets] = useState([
    {type: 'USD', amount: 150},
    {type: 'EUR', amount: 50},
    {type: 'GBP', amount: 100}
  ]);
  const isRatesEmpty = Object.keys(rates).length === 0
  if (isRatesEmpty) {
    return (
      <div className="d-flex flex-column">
        <strong className="align-self-center">Loading...</strong>
        <div className="align-self-center spinner-border" role="status" aria-hidden="true"></div>
      </div>
    )
  }
  return (
    <div>
      <Exchange
        pockets={pockets}
        setPockets={setPockets}
        rates={rates}/>
      <Pockets pockets={pockets}/>
    </div>
  );
};
export default CurrencyExchange;
