import React, { useState } from 'react'
// ## TODO REFACTOR THIS INTO 3,4 components
// ##REMOVE THE LOGIC
// ##MAKE THE LOGIC TESTABLE
// ##ADD THE RATE FIELD
// ##ADD SOME BASIC TESTS

export default function ExchangeUnit({rates, pockets}){
  const possiblePockets = Object.keys(pockets);
  const [pocketsInUse, setPocketsInUse] = useState(['USD', 'EUR'])
  const [currentInputValues, setCurrentInputValues] = useState({
    '0': '0',
    '1': '0'
  });
  const handleOnChangeCurrency = (evt, index) => {
    const pocket = evt.target.value;
    if (pocketsInUse.includes(pocket)){
      setPocketsInUse(pocketsInUse.reverse());
    } else {
      pocketsInUse[index] = pocket;
      setPocketsInUse(pocketsInUse);
    }
  }

  const checkNumberFormat = (value) => {
    const string = String(value);
    if (string.match(/^\d+(?:\.\d{1,2})?$/)){
      return Number(value).toFixed(2);
    } else {
      return value;
    }
  }

  const convertCurrency = (correctlyFormattedNumber, originalIdx, secondaryIdx) => {
    const base = pocketsInUse[originalIdx];
    const secondaryCurrency = pocketsInUse[secondaryIdx]
    const correctRate = rates[base][secondaryCurrency];
    const approximateNumber = correctlyFormattedNumber * correctRate;
    return checkNumberFormat(approximateNumber);
  };
  const handleChangeInput = (evt, idx) => {
    const correctlyFormattedNumber = checkNumberFormat(evt.target.value);
    const secondaryStringIdx = idx === 0 ? 1 : 0;
    const secondaryCorrectFormattedNumber = convertCurrency(correctlyFormattedNumber, idx, secondaryStringIdx);
    setCurrentInputValues({
      [idx]: correctlyFormattedNumber,
      [secondaryStringIdx]: secondaryCorrectFormattedNumber
    })
  };
  const handleExchange = (evt) => {

  };
  const primaryPocket = pocketsInUse[0];
  const secondaryPocket = pocketsInUse[1];
  return (
    <>
      <div className="exchange-unit">
        <div className="input-group mb-3 exchange-unit-inputs">
          <select className="custom-select" value={primaryPocket} required onChange={(evt) => { handleOnChangeCurrency(evt, 0)}}>
          {possiblePockets.map((pocket) => (
                  <option key={pocket} value={pocket}>
                  {pocket}
                  </option>
          ))}
          </select>
          <input type="tel" className="form-control" value={currentInputValues['0']} onChange={(evt) => handleChangeInput(evt, 0)}/>
        </div>
      </div>
      <div className="input-group mb-3 exchange-unit-inputs">
        <select className="custom-select" value={secondaryPocket} required onChange={(evt) => { handleOnChangeCurrency(evt, 1)}}>
        {possiblePockets.map((pocket) => (
                <option key={pocket} value={pocket}>
                {pocket}
                </option>
        ))}
        </select>
        <input type="tel" className="form-control" min={0} value={currentInputValues['1']} onChange={(evt) => handleChangeInput(evt, 1)}/>
      </div>
      <button type="button" className="form-control" onClick={handleExchange}> Exchange </button>
      </>
  )
}
