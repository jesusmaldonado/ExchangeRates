import React from 'react';
import { cIconMap } from '../utils/countryIconsMap';
export default function PocketSelect({
  input,
  index,
  handleOnChangeCurrency,
  possiblePockets
}){
  return (
    <div className="input-group">
      <div>
        <label className="input-group-text d-block">
        <span
          className={`flag-icon flag-icon-${cIconMap[input.type]}`}>
        </span>
        </label>
      </div>
      <select id="inputGroupSelect01" className="custom-select" value={input.type} data-index={index} required onChange={handleOnChangeCurrency}>
      {possiblePockets.map((pocket) => (
              <option key={pocket} value={pocket}>
                  {pocket}
              </option>
      ))}
      </select>
    </div>
  );
}
