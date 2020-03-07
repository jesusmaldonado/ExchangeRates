import React from 'react';
import CurrencyExchange from '../components/CurrencyExchange';
import ExchangeRateDisplay from '../components/ExchangeRateDisplay';
import { create, act as actTest } from 'react-test-renderer';
import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import responses from './utils/responseObject';
let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterAll(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders a loading state", async() => {
  await act(async() => {
    render(<CurrencyExchange />, container);
  });
  expect(container.innerHTML).toMatch('Loading...');
});
describe('after receiving data', () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation((argument) =>{
      const fakeResponse = responses[argument];
      return Promise.resolve({
        json: () => Promise.resolve(fakeResponse)
      });
    });
  })
  afterEach(() => {
    global.fetch.mockRestore();
  });

  it("is not in a load state", async ()=> {
    await act(async () => {
      render(<CurrencyExchange/>, container);
    });
    expect(container.innerHTML).not.toMatch('Loading...');
  });

  it('passes a rate mechanism', async () => {
    let component;
    await actTest(async () => {
      component = create(<CurrencyExchange/>);
    });
    let instance = component.root;
    expect(instance.findByType(ExchangeRateDisplay).props['currentExchangeRate']).toEqual('USD-EUR:0.88');
  });

  it('receives input and converts currency', async () => {
    await act(async () => {
      render(<CurrencyExchange/>, container);
    });
    let [firstInput, secondInput] = container.querySelectorAll('input');
    act(() => {
      Simulate.change(secondInput, {
        target: {
          value: '20.00',
          dataset: {
            index: '1'
          }
        }
      })
    });

    expect(firstInput.value).toEqual('22.67');
    expect(secondInput.value).toEqual('20.00');

  });
  it('sanitizes weird input', async () => {
    await act(async () => {
      render(<CurrencyExchange/>, container);
    });
    let [firstInput, secondInput] = container.querySelectorAll('input');
    act(() => {
      Simulate.change(secondInput, {
        target: {
          value: '=-338.39939020382083',
          dataset: {
            index: '1'
          }
        }
      })
    });

    expect(firstInput.value).toEqual('383.59');
    expect(secondInput.value).toEqual('338.39');
  });
  it('switches currency appropriately', async () => {
    await act(async () => {
      render(<CurrencyExchange/>, container);
    });
    let [firstInput, secondInput] = container.querySelectorAll('input');
    act(() => {
      Simulate.change(firstInput, {
        target: {
          value: '20',
          dataset: {
            index: '0'
          }
        }
      })
    });

    expect(firstInput.value).toEqual('20');
    expect(secondInput.value).toEqual('17.64');
    const firstSelect = container.querySelector('select')
    act(() => {
      //this is not great but firing on the option directly doesn't work;
      Simulate.change(firstSelect, {
        target: {
          value: 'GBP',
          dataset: {
            index: '0'
          }
        }
      });
    });
    let [firstInputNew, secondInputNew] = container.querySelectorAll('input');
    expect(firstInputNew.value).toEqual('15.37');
    expect(secondInputNew.value).toEqual('17.64');
  });
  it('handles exchnage', async() => {
    await act(async () => {
      render(<CurrencyExchange/>, container);
    });
    let [firstInput] = container.querySelectorAll('input');
    act(() => {
      Simulate.change(firstInput, {
        target: {
          value: '20',
          dataset: {
            index: '0'
          }
        }
      })
    });
    const button = container.querySelector('button');
    expect(button.disabled).toEqual(false);
    act(() => {
      Simulate.click(button);
    });
    const tableRows = Array.from(container.querySelector('tbody').querySelectorAll('tr'));
    const [usAmount, eurAmount] = tableRows.map((tr) => tr.textContent);
    expect(usAmount).toMatch('130');
    expect(eurAmount).toMatch('67.64')
    // we also expect the inputs to be reset
    let [firstInputNew, secondInputNew] = container.querySelectorAll('input');
    expect(firstInputNew.value).toEqual('0');
    expect(secondInputNew.value).toEqual('0');
  });

  it("doesn't let us update exchange more and shows an error message", async() => {
    jest.useFakeTimers();
    await act(async () => {
      render(<CurrencyExchange/>, container);
    });
    let [firstInput] = container.querySelectorAll('input');
    await act(async () => {
      Simulate.change(firstInput, {
        target: {
          value: '200',
          dataset: {
            index: '0'
          }
        }
      })
    });
    const button = container.querySelector('button');
    await act(async() => {
      Simulate.click(button);
    });
    expect(button.disabled).toEqual(true);
    const tableRows = Array.from(container.querySelector('tbody').querySelectorAll('tr'));
    const [usAmount, eurAmount] = tableRows.map((tr) => tr.textContent);
    expect(usAmount).toMatch('150');
    expect(eurAmount).toMatch('50')
    const invalidTooltips = container.querySelectorAll('.invalid-tooltip');
    expect(invalidTooltips.length).toEqual(1)
    expect(invalidTooltips[0].textContent).toEqual('The maximimum you can send is 150')

    // we also expect the inputs to be reset
    let [firstInputNew, secondInputNew] = container.querySelectorAll('input');
    expect(firstInputNew.className).toMatch('is-invalid');
    expect(secondInputNew.className).not.toMatch('is-invalid');
  });
});
