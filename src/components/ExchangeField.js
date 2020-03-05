import React from 'react'
export default function ExchangeField({
  pocket, possiblePockets, pocketIdx, handleOnChangeCurrency, idx}){

  return (
    <div className="exchange-unit-inputs input-group mb-3">
      <select
        className="custom-select"
        value={pocket}
        required
        onChange={(evt) => { handleOnChangeCurrency(evt, 0)}}>
        {possiblePockets.map((pocket) => (
                <option key={pocket} value={pocket}>
                {pocket}
                </option>
        ))}
      </select>
    </div>
  );
}

// <input
//   type="text"
//   className="form-control"
//   value={currentInputValues['0']}
//   onChange={(evt) => handleChangeInput(evt, 0)}/>
