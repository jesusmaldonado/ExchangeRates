import React from 'react';
import clsx from 'clsx';
export default function CurrencyInput({errorMessage, input, index, handleOnChangeAmount}){
  return (
    <div className="input-group d-flex">
    <input type="text"
      className={clsx("form-control", "p-2", errorMessage && 'is-invalid')}
      value={input.amount}
      data-index={index}
      onChange={handleOnChangeAmount}
    />
    {errorMessage && (
      <div className={clsx("p-2", 'invalid-tooltip')}>
        {errorMessage}
      </div>
    )}
    </div>
  )
}
