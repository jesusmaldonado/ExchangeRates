import React from 'react';
import Pocket from './Pocket'
export default function Pockets({pockets}){
  return (
    <table className="table">
    <tbody>
      {Object.entries(pockets).map(([currency, amount]) => (
        <Pocket key={currency} currency={currency} amount={amount} />
      ))}
    </tbody>
    </table>
  )
}
