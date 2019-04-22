import React, { useState, useEffect } from 'react';
import './App.css';
import Grid from './components/Grid';

const cols = 7, rows = 6;
let turn = 'yellow';

const switchPlayer = () => {
  turn === 'yellow' ?  turn = 'red' : turn = 'yellow';
  return turn;
}

//https://stackoverflow.com/questions/9979560/javascript-multidimensional-array-updating-specific-element
const createGrid = (cols, rows) => {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = "";
    }
  }
  return arr;
}

const App = () => {
  const initialGrid = createGrid(cols, rows);
  const [grid, setGrid] = useState(initialGrid);
  const [status, setStatus] = useState("");

  useEffect(() => {
    checkWinCondition();
  }, [grid])

  const checkWinCondition = () => {
    console.log(grid);

    //vertical
    for (let col of grid) {
      for (let i = 0; i < 3; i++) {
        if (col[i] === col[i+1] && col[i] === col[i+2] && col[i] === col[i+3] && col[i] !== "") {
          setStatus(`Player ${col[i]} wins!`);
        }
      }
    }

    //horizontal
    for(let i = 0; i < 4; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === grid[i+1][j] && grid[i][j] === grid[i+2][j] && grid[i][j] === grid[i+3][j] && grid[i][j] !== "") {
          setStatus(`Player ${grid[i][j]} wins!`);
        }
      }
    }

    //diagonal
    for(let i = 0; i < 4; i++) {
      for(let j = 0; j < 3; j++) {
        if (grid[i][j] === grid[i+1][j+1] && grid[i][j] === grid[i+2][j+2] && grid[i][j] === grid[i+3][j+3] && grid[i][j] !== "") {
          console.log("diagonal from top-left to bottom-right hit")
        }
      }
    }

    for(let i = 0; i < 4; i++) {
      for(let j = 3; j < 6; j++) {
        if (grid[i][j] === grid[i+1][j-1] && grid[i][j] === grid[i+2][j-2] && grid[i][j] === grid[i+3][j-3] && grid[i][j] !== "") {
          console.log("diagonal from bottom-left to top-right hit")
        }
      }
    }
  }

  const resetGame = () => {
    setGrid(createGrid(cols, rows));
    setStatus("");
  }

  const makeMove = (e) => {
    let pos = e.target.dataset.pos.split("-");
    let newGrid = JSON.parse(JSON.stringify(grid)); //make and entierly new copy of of an array of arrays with an unknown level of depths
    for (let i = grid[pos[0]].length; i >= 0; i--) {
      if (grid[pos[0]][i] === "") {
        newGrid[pos[0]][i] = switchPlayer();
        setGrid(newGrid);
        return;
      }
    }
  }

  return (
    <div className="App">
      <button onClick={resetGame} className="btn__reset">RESET</button>
      {status &&
        <p className="msg__status">{status}</p>
      }
      <Grid grid={grid} makeMove={makeMove}/>
    </div>
  );
}

export default App;
