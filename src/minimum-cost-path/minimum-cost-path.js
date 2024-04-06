import React from 'react';
import GridCell from './grid-cell';
import './minimum-cost-path.css';

class MinimumCostPath extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: [
        [1, 3, 1],
        [1, 5, 1],
        [4, 2, 1]
      ],
      minimumCostGrid: [],
      history: [],
      currentStep: 0
    };
  }

  componentDidMount() {
    this.calculateMinimumCost();
  }

  calculateMinimumCost = () => {
    const { grid } = this.state;
    const minimumCostGenerator = [];

    // Minimum Cost Path calculation algorithm
    for (let r = 0; r < grid.length; r++) {
      const row = [];
      minimumCostGenerator.push(row);

      for (let c = 0; c < grid[r].length; c++) {
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

        // this.setHistory([...this.state.history, [...minimumCostGenerator]]);
        this.setHistory(minimumCostGenerator);
      }
    }

    let step = 0;
    const totalSteps = grid.length * grid[0].length;

    const intervalId = setInterval(() => {
      if (step < totalSteps) {
        this.setMinimumCostGrid(this.state.history[step]);
        step++;
        this.setState({ currentStep: step });
      } else {
        clearInterval(intervalId);
      }
    }, 2000);
  };

  setHistory = (newHistory) => {
    // this.setState({ history: newHistory }); // DOESN'T WORK
    this.state.history.push(JSON.stringify([...newHistory])); // WORKS
    // this.state.history.push([...newHistory]); // INCONSISTENTLY WORKS
  };

  setMinimumCostGrid = (newMinimumCostGrid) => {
    // this.setState({ minimumCostGrid: newMinimumCostGrid }); // DOESN'T WORK
    this.setState({ minimumCostGrid: JSON.parse(newMinimumCostGrid) }); // WORKS
    // this.setState({ minimumCostGrid: newMinimumCostGrid }); // INCONSISTENTLY WORKS
  };

  handleBack = () => {
    const { currentStep, history } = this.state;
    if (currentStep > 0) {
      this.setState({ currentStep: currentStep - 1 });
      this.setMinimumCostGrid(history[currentStep - 1]);
    }
  };

  handleForward = () => {
    const { currentStep, history } = this.state;
    if (currentStep < history.length - 1) {
      this.setState({ currentStep: currentStep + 1 });
      this.setMinimumCostGrid(history[currentStep + 1]);
    }
  };

  render() {
    const { grid, minimumCostGrid, currentStep, history } = this.state;

    return (
      <div className="App">
        <h1>Minimum Cost Path</h1>
        <button onClick={this.handleBack} disabled={currentStep === 0}>
          Back
        </button>
        <button onClick={this.handleForward} disabled={currentStep === history.length - 1}>
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
}

export default MinimumCostPath;
