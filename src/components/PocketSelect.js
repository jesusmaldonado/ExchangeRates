import React from 'react';
export default function PocketSelect({
  input,
  index,
  handleOnChangeCurrency,
  possiblePockets
}){
  return (
    <select className="custom-select" value={input.type} data-index={index} required onChange={handleOnChangeCurrency}>
    {possiblePockets.map((pocket) => (
            <option key={pocket} value={pocket}>
            {pocket}
            </option>
    ))}
    </select>
  );
}
