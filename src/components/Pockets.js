import React from 'react';
import Pocket from './Pocket'
export default function Pockets({pockets}){
  return (
    <table className="table table-sm pockets mx-auto mt-6">
    <thead>
      <tr>
        <th scope="col">Currency</th>
        <th scope="col">Current Amount</th>
      </tr>
    </thead>
    <tbody>
      {(pockets).map(({type, amount}) => (
        <Pocket key={type} currency={type} amount={amount} />
      ))}
    </tbody>
    </table>
  )
}
