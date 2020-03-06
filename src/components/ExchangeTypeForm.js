import React from 'react'
import ExchangeRateDisplay from './ExchangeRateDisplay';
import useError from '../hooks/useError';
import clsx from 'clsx';
import PocketSelect from './PocketSelect';
import CurrencyInput from './CurrencyInput';
export default function ExchangeTypeForm({
  input,
  index,
  pockets,
  handleOnChangeCurrency,
  handleOnChangeAmount,
  currentExchangeRate
}){
  const possiblePockets = pockets.map(p => p.type);
  const errorMessage = useError(input, pockets, index);
  return (
    <>
    <div className="d-flex">
      <PocketSelect
      input={input}
      index={index}
      handleOnChangeCurrency={handleOnChangeCurrency}
      possiblePockets={possiblePockets} />
      <CurrencyInput
        errorMessage={errorMessage}
        input={input}
        index={index}
        handleOnChangeAmount={handleOnChangeAmount} />
    </div>
    {index === 0 && currentExchangeRate && (
      <ExchangeRateDisplay currentExchangeRate={currentExchangeRate} />
    )}
    </>
  );
}
