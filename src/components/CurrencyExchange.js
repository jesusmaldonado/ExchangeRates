import React, { useState, useEffect } from "react";
import Pockets from './Pockets';
import useRates from '../hooks/useRates';
import ExchangeUnit from './ExchangeUnit';
const CurrencyExchange = () => {
  const rates = useRates();
  const [pockets, setPockets] = useState({
    'USD': 100,
    'GBP': 50,
    'EUR': 150,
  });
  return (
    <div>
      <ExchangeUnit
        pockets={pockets}
        rates={rates}/>
      <Pockets pockets={pockets}/>
    </div>
  );
};
export default CurrencyExchange;
