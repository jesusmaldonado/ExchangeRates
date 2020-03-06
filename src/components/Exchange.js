import React, { useReducer, useRef, useEffect } from 'react';
import ExchangeTypeForm from './ExchangeTypeForm';
import useDetectChangeCurrencyType from '../hooks/useDetectChangeCurrencyType';
import useCurrentExchangeRate from '../hooks/useCurrentExchangeRate';
import usePrevious from "../hooks/usePrevious";
import baseReducer from '../reducers/baseReducer';
const initialState = {
  inputs: [
    {type: 'USD', amount: '0'},
    {type: 'EUR', amount: '0'}
  ]
};


export default function Exchange({rates, pockets, setPockets}){
  const possiblePockets = pockets.map(p => p.type);
  const [state, dispatch] = useReducer(baseReducer, initialState);
  const { inputs } = state;
  const previousInputs = usePrevious(inputs);
  // this effect changes the amount if the currency type changes
  useDetectChangeCurrencyType(inputs, previousInputs, rates, dispatch);
  const currentExchangeRate = useCurrentExchangeRate(inputs, rates);
  const handleOnChangeCurrency = (evt) => {
    const newCurrencyUnit = evt.target.value;
    const indexOfCurrentInput = Number(evt.target.dataset.index);
    dispatch({type: 'CHANGE_CURRENCY_UNIT', payload: {
      newCurrencyUnit,
      indexOfCurrentInput
    }});
  };

  const handleOnChangeAmount = (evt) => {
    const newCurrencyAmount = evt.target.value;
    const indexOfCurrentInput = Number(evt.target.dataset.index);
    dispatch({
      type: 'CHANGE_CURRENCY_AMOUNT',
      payload: {
        newCurrencyAmount,
        indexOfCurrentInput,
        rates
      }
    });
  };
  return (
      <div className="d-flex justify-content-between">
        {inputs.map((input, i) => {
          return (
            <ExchangeTypeForm
              key={input.type}
              handleOnChangeCurrency={handleOnChangeCurrency}
              input={input}
              index={i}
              setPockets={setPockets}
              currentExchangeRate={currentExchangeRate}
              pockets={pockets}
              handleOnChangeAmount={handleOnChangeAmount}
            />
          )
        })}
      </div>
  )
}
