import React, { useReducer } from 'react';
import ExchangeTypeForm from './ExchangeTypeForm';
import useDetectChangeCurrencyType from '../hooks/useDetectChangeCurrencyType';
import useCurrentExchangeRate from '../hooks/useCurrentExchangeRate';
import usePrevious from "../hooks/usePrevious";
import baseReducer from '../reducers/baseReducer';
import inputStore from '../stores/inputStore';
import useError from '../hooks/useError';

export default function Exchange({rates, pockets, setPockets}){
  const [state, dispatch] = useReducer(baseReducer, inputStore);
  const { inputs } = state;
  const previousInputs = usePrevious(inputs);
  // this effect changes the amount if the currency type changes
  useDetectChangeCurrencyType(inputs, previousInputs, rates, dispatch);
  // this effect fetches the current exchange rate applicable to
  // the current inputs
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
    let newCurrencyAmount = evt.target.value;
    if (!newCurrencyAmount){
      newCurrencyAmount = '0';
    }
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
  const errorMessage = useError(inputs[0], pockets);
  const isButtonDisabled = errorMessage || inputs[0]['amount'] === "0";

  const handleExchange = () => {
    if (isButtonDisabled){
      return;
    }
    const [
      {type: firstInputType, amount: firstInputAmount},
      {type: secondInputType, amount: secondInputAmount}
    ]= inputs;
    const newPockets = pockets.map((pocket) => {
      if (pocket.type === firstInputType){
        const castedFirstInputAmount = Number(firstInputAmount);
        const newAmount = (pocket.amount - castedFirstInputAmount).toFixed(2);
        return {
          type: pocket.type,
          amount: Number(newAmount)
        };
      }
      if (pocket.type === secondInputType){
        const castedSecondInputAmount = Number(secondInputAmount);
        const newAmount = (pocket.amount + castedSecondInputAmount).toFixed(2);
        return {
          type: pocket.type,
          amount: Number(newAmount)
        };
      }
      return pocket;
    });
    setPockets(newPockets);
    dispatch({ type: 'RESET_CURRENCY' });
  };

  return (
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-around">
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
                errorMessage={errorMessage}
                handleOnChangeAmount={handleOnChangeAmount}
              />
            )
          })}
        </div>
        <button
          onClick={handleExchange}
          type="button"
          disabled={isButtonDisabled}
          className={
            "btn btn-primary btn-lg align-self-center"
          }>
          Exchange
        </button>
      </div>
  )
}
