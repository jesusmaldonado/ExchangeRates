import React from 'react'

export default function Pocket({currency, amount}){
  return (
      <tr>
        <td>{currency}</td>
        <td>{amount} </td>
      </tr>
  )
};
