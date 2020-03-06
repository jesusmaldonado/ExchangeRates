import { useState, useEffect } from 'react';

export default function useCurrentExchangeRate(inputs, rates){
  const [currentExchangeRate, setCurrentExchangeRate] = useState('');
  useEffect(() => {
    if (Object.keys(rates).length !== 0){
      const [{type: baseCurrency}, {type: secondaryCurrency}] = inputs;
      const rate = rates[baseCurrency][secondaryCurrency];
      setCurrentExchangeRate(`${baseCurrency}-${secondaryCurrency}:${rate.toFixed(2)}`);
    }
  }, [inputs, rates])
  return currentExchangeRate;
}
