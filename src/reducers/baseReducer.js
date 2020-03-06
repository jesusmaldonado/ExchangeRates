import checkNumberFormat from '../utils/checkNumberFormat';
function changeCurrencyUnitReducer(state, {newCurrencyUnit, indexOfCurrentInput}){
  // if type is the same, do nothing.
  const { inputs } = state;
  const currentInput = inputs[indexOfCurrentInput];
  const { type: currentType, amount: currentInputAmount } = currentInput
  if (currentType === newCurrencyUnit){
    return {...state};
  }

  // if newCurrencyUnit is the same as the other input, flip them.
  const otherInput = inputs.find((inp, i) => i !== indexOfCurrentInput);
  const { type: otherInputType, amount: otherInputAmount } = otherInput;
  if (otherInputType === newCurrencyUnit) {
    return {
      inputs: [
        {type: otherInputType, amount:otherInputAmount},
        {type: currentType, amount: currentInputAmount}
      ]
    };
  }

  //otherwise, we proceed and add the new type of currency
  const newInputs = inputs.map((input, i) => {
    if (i === indexOfCurrentInput){
      return {
        ...input,
        type: newCurrencyUnit
      }
    }
    return input;
  });
  return {
    inputs: newInputs
  };
}
const convertedCurrencyAmount = (newCurrencyAmount, rates, baseCurrency, secondaryCurrency) => {
    const correctRate = rates[baseCurrency][secondaryCurrency];
    const approximateNumber = Number(newCurrencyAmount) * Number(correctRate);
    return checkNumberFormat(approximateNumber);
};

function changeCurrencyAmountReducer(state, {newCurrencyAmount, indexOfCurrentInput, rates}){
  const { inputs } = state;
  const sanitizedNewCurrencyAmount = checkNumberFormat(newCurrencyAmount);
  const indexToChange = indexOfCurrentInput === 0 ? 1 : 0;
  const baseCurrency = inputs[indexOfCurrentInput]['type'];
  const secondaryCurrency = inputs[indexToChange]['type'];
  const secondaryAmount = convertedCurrencyAmount(sanitizedNewCurrencyAmount, rates, baseCurrency, secondaryCurrency);
  const newInputs = inputs.map(({type, amount}, idx) => {
    if (idx === indexOfCurrentInput) {
      return {
        type,
        amount: sanitizedNewCurrencyAmount
      };
    }
    return {
      type,
      amount: secondaryAmount
    };
  });
  return {
    inputs: newInputs
  }
};
export default function baseReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_CURRENCY_UNIT':
      return changeCurrencyUnitReducer(state, action.payload);
    case 'CHANGE_CURRENCY_AMOUNT':
      return changeCurrencyAmountReducer(state, action.payload);
    default:
      throw new Error();
  }
}
