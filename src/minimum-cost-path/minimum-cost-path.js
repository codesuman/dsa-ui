// minimum-cost-path.js
import React, { useState, useEffect } from 'react';
import GridCell from './grid-cell';
import './minimum-cost-path.css';

function MinimumCostPath() {
  // const gridVal = [
  //   [1, 3, 5],
  //   [2, 4, 7],
  //   [5, 8, 9]
  // ];

  const gridVal = [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1]
  ];

  const [grid, setGrid] = useState(gridVal);

  const [minimumCostGrid, setMinimumCostGrid] = useState([]);
  const [history, setHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    calculateMinimumCost();
  }, []);

  const calculateMinimumCost = async () => {
    const minimumCostGenerator = [];

    // Minimum Cost Path calculation algorithm
    for (let r = 0; r < grid.length; r++) {
      const row = [];
      minimumCostGenerator.push(row);

      for (let c = 0; c < grid[r].length; c++) {
        if (currentStep >= history.length) {
          /**
           * PUSH CURRENT STATE TO HISTORY
           * This part concatenates the shallow copy of minimumCostGenerator to the end of history, 
           * creating a new array that contains all the elements of history along with the new snapshot of minimumCostGenerator. 
           * Essentially, it's creating a new array representing the updated history with the latest state appended to it.
           */
          setHistory([...history, [...minimumCostGenerator]]);
          setCurrentStep(currentStep + 1); // Increment currentStep
        }

        await new Promise(resolve => setTimeout(resolve, 2000)); // Pause for 2 seconds

        if(r === 0 && c === 0) {
          // Starting cell
          row.push(grid[r][c]);
        } else if(r === 0) {
          // 0th row
          row.push(grid[r][c] + minimumCostGenerator[r][c-1]);
        } else if(c === 0) {
          // 0th column
          row.push(grid[r][c] + minimumCostGenerator[r-1][c]);
        } else {
          // Other than 0 index cells
          row.push(Math.min(grid[r][c] + minimumCostGenerator[r-1][c], grid[r][c] + minimumCostGenerator[r][c-1]));
        }

        setMinimumCostGrid([...minimumCostGenerator]); // Update minimumCostGenerator grid after each step
      }
    }

    setMinimumCostGrid(minimumCostGenerator); // Set final minimumCostGenerator grid
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setMinimumCostGrid(history[currentStep - 1]);
    }
  };

  const handleForward = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1);
      setMinimumCostGrid(history[currentStep + 1]);
    }
  };

  return (
    <div className="App">
      <h1>Minimum Cost Path</h1>
      <button onClick={handleBack} disabled={currentStep === 0}>
        Back
      </button>
      <button onClick={handleForward} disabled={currentStep === history.length - 1}>
        Forward
      </button>
      <table>
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cost, colIndex) => (
                <GridCell
                    key={colIndex}
                    cost={cost}
                    cumulativeCost={
                      minimumCostGrid[rowIndex] ? minimumCostGrid[rowIndex][colIndex] : undefined
                    } // Add a check to ensure minimumCostGrid[rowIndex] is defined
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MinimumCostPath;
