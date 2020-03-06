import { useState, useEffect } from 'react';
export default function useError(input, pockets, index){
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    if (index === 0){
      const {type: primaryInputType, amount: primaryInputAmount } = input;
      const currentAmount = Number(primaryInputAmount);
      const {amount: maximumAmount} = pockets.find(p => p.type === primaryInputType);
      const errorMessage = currentAmount > maximumAmount ?
        `The maximimum you can send is ${maximumAmount}` :
        null;
      setErrorMessage(errorMessage);
    }
  }, [input, pockets, index])
  return errorMessage
}
