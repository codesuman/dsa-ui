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
  // const [history, setHistory] = useState([]);
  // let [currentStep, setCurrentStep] = useState(0);
  const history = [];
  let currentStep = 0;
  let intervalId = null;

  useEffect(() => {
    calculateMinimumCost();
  }, []);

  const calculateMinimumCost = () => {
    const minimumCostGenerator = [];

    // Minimum Cost Path calculation algorithm
    for (let r = 0; r < grid.length; r++) {
      const row = [];
      minimumCostGenerator.push(row);

      for (let c = 0; c < grid[r].length; c++) {
        if(r === 0 && c === 0) {
          // Starting cell - 0th row, 0th column
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

        // setHistory([...history, [...minimumCostGenerator]]);
        history.push(JSON.stringify([...minimumCostGenerator]));
      }
    }

    simulateDryRun();
  };

  const simulateDryRun = () => {
    const totalSteps = grid.length * grid[0].length;

    intervalId = setInterval(() => {
      if (currentStep < totalSteps && history && history.length > 0) {
        setMinimumCostGrid(JSON.parse(history[currentStep]));
        // setCurrentStep(currentStep + 1);
        currentStep++;
      } else {
        clearInterval(intervalId);
      }
    }, 2000);
  };

  const stopDryRun = () => {
    if(intervalId) clearInterval(intervalId);
  };

  const handleBack = () => {
    stopDryRun();

    if (currentStep > 0) {
      // setCurrentStep(currentStep - 1);
      currentStep--;
      setMinimumCostGrid(JSON.parse(history[currentStep]));
    }
  };

  const handleForward = () => {
    stopDryRun();
    
    if (currentStep < history.length - 1) {
      // setCurrentStep(currentStep + 1);
      currentStep++;
      setMinimumCostGrid(JSON.parse(history[currentStep]));
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
                      minimumCostGrid && minimumCostGrid[rowIndex] ? minimumCostGrid[rowIndex][colIndex] : undefined
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
