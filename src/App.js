import React from 'react';
import './App.css';
import CurrencyExchange from './components/CurrencyExchange';
function App() {
  return (
    <div className="app">
      <h1 className="app-header"> Exchange Rates </h1>
      <CurrencyExchange />
    </div>
  );
}

export default App;
