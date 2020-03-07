import { useState, useEffect } from 'react';
export default function useError(input, pockets, index){
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
      const {type: primaryInputType, amount: primaryInputAmount } = input;
      const currentAmount = Number(primaryInputAmount);
      const {amount: maximumAmount} = pockets.find(p => p.type === primaryInputType);
      const errorMessage = currentAmount > maximumAmount ?
        `The maximimum you can send is ${maximumAmount}` :
        null;
      setErrorMessage(errorMessage);
  }, [input, pockets])
  return errorMessage
}
