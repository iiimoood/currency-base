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
});
