import React from 'react';
import clsx from 'clsx';
export default function CurrencyInput({errorMessage, input, index, handleOnChangeAmount}){
  return (
    <div className="input-group d-flex">
    <input type="text"
      className={clsx("form-control", "p-2", errorMessage && index === 0 && 'is-invalid')}
      value={input.amount}
      data-index={index}
      onBlur={handleOnChangeAmount}
      onChange={handleOnChangeAmount}
    />
    {errorMessage && index === 0 && (
      <div className={clsx("p-2", 'invalid-tooltip')}>
        {errorMessage}
      </div>
    )}
    </div>
  )
}
