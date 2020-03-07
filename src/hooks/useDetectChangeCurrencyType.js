
import { useEffect } from "react";
export default function useDetectChangeCurrencyType(inputs, previousInputs, rates, dispatch){
  useEffect(() => {
    if (!previousInputs){
      return;
    }
    const previousTypes = previousInputs.map(inp => inp.type).join("");
    const currentTypes = inputs.map(inp => inp.type).join("");
    const isNewTypes = previousTypes !== currentTypes;
    if (isNewTypes) {
      const indexOfCurrentInput = previousTypes[0] === currentTypes[0] ? 0 : 1;
      const newCurrencyAmount = inputs[indexOfCurrentInput]['amount'];
      dispatch({
        type: 'CHANGE_CURRENCY_AMOUNT',
        payload: {
          newCurrencyAmount,
          indexOfCurrentInput,
          rates
        }
      });
    }
  }, [inputs, rates, previousInputs, dispatch]);
}
