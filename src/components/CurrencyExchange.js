import React, { useState, useEffect } from "react";
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
