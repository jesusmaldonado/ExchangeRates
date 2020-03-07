import React from 'react'
import { cIconMap, cSymbolMap } from '../utils/countryIconsMap';
export default function Pocket({currency, amount}){
  return (
      <tr>
        <td className="text-center">
          <span
            className={`flag-icon flag-icon-${cIconMap[currency]}`}>
          </span>
        </td>
        <td className="text-center">
          <span>{`${cSymbolMap[currency]}${amount}`}</span>
        </td>
      </tr>
  )
};
