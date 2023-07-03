import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });
  it('should render proper info about conversion when PLN -> USD', () => {
    const testCases = [
      { amount: '100', from: 'PLN', to: 'USD' },
      { amount: '20', from: 'PLN', to: 'USD' },
      { amount: '200', from: 'PLN', to: 'USD' },
      { amount: '345', from: 'PLN', to: 'USD' },
    ];

    for (const testObj of testCases) {
      //render component
      render(
        <ResultBox
          from={testObj.from}
          to={testObj.to}
          amount={parseInt(testObj.amount)}
        />
      );

      //find ResultBox div
      const resultBox = screen.getByTestId('result-box');

      //check ResultBox value
      const formattedAmount = parseFloat(testObj.amount).toFixed(2);
      const convertedAmount = (testObj.amount / 3.5).toFixed(2);

      expect(resultBox).toHaveTextContent(
        'PLN ' + formattedAmount + ' = $' + convertedAmount
      );

      // unmount component
      cleanup();
    }
  });
  it('should render proper info about conversion when USD -> PLN', () => {
    const testCases = [
      { amount: '10', from: 'USD', to: 'PLN' },
      { amount: '20', from: 'USD', to: 'PLN' },
      { amount: '25', from: 'USD', to: 'PLN' },
      { amount: '34', from: 'USD', to: 'PLN' },
    ];

    for (const testObj of testCases) {
      //render component
      render(
        <ResultBox
          from={testObj.from}
          to={testObj.to}
          amount={parseInt(testObj.amount)}
        />
      );

      //find ResultBox div
      const resultBox = screen.getByTestId('result-box');

      //check ResultBox value
      const formattedAmount = parseFloat(testObj.amount).toFixed(2);
      const convertedAmount = (testObj.amount * 3.5).toFixed(2);

      expect(resultBox).toHaveTextContent(
        '$' + formattedAmount + ' = PLN ' + convertedAmount
      );

      // unmount component
      cleanup();
    }
  });
  it('should render the same value when from and to value are the same', () => {
    const testCases = [
      { amount: '10', from: 'USD', to: 'USD' },
      { amount: '200', from: 'PLN', to: 'PLN' },
      { amount: '250', from: 'PLN', to: 'PLN' },
      { amount: '34', from: 'USD', to: 'USD' },
    ];

    for (const testObj of testCases) {
      //render component
      render(
        <ResultBox
          from={testObj.from}
          to={testObj.to}
          amount={parseInt(testObj.amount)}
        />
      );

      //find ResultBox div
      const resultBox = screen.getByTestId('result-box');

      const formattedAmount = parseFloat(testObj.amount).toFixed(2);
      const convertedAmount = parseFloat(testObj.amount).toFixed(2);

      const expectedResult =
        testObj.from === 'PLN'
          ? 'PLN ' + formattedAmount + ' = PLN ' + convertedAmount
          : '$' + formattedAmount + ' = $' + convertedAmount;

      expect(resultBox).toHaveTextContent(expectedResult);

      // unmount component
      cleanup();
    }
  });
  it('should return Wrong value when input is lower than zero', () => {
    const testCases = [
      { amount: '-10', from: 'PLN', to: 'USD' },
      { amount: '-3666', from: 'USD', to: 'PLN' },
      { amount: '-2', from: 'USD', to: 'PLN' },
      { amount: '-5', from: 'PLN', to: 'USD' },
    ];

    for (const testObj of testCases) {
      //render component
      render(
        <ResultBox
          from={testObj.from}
          to={testObj.to}
          amount={parseInt(testObj.amount)}
        />
      );

      //find ResultBox div
      const resultBox = screen.getByTestId('result-box');

      expect(resultBox).toHaveTextContent('Wrong value');

      // unmount component
      cleanup();
    }
  });
});
