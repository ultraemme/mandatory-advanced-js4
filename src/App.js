import React, { useState, useEffect } from 'react';
import './App.css';
import Grid from './components/Grid';

const cols = 7, rows = 6; //alt. state?
let player = 1; //alt. state?
let turn = 0;

const switchPlayer = () => {
  return (player === 1) ?  player = 2 : player = 1;
}

const createGrid = (cols, rows) => {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0;
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
    checkDrawCondition();
  }, [grid])

  const checkWinCondition = () => {
    for(let i = 0; i < grid.length; i++) { //vertical
      for (let j = 0; j < grid[i].length-3; j++) {
        if (grid[i][j] === grid[i][j+1] && grid[i][j] === grid[i][j+2] && grid[i][j] === grid[i][j+3] && grid[i][j]) {
          setStatus(`Player ${grid[i][j]} wins!`);
        }
      }
    }

    for(let i = 0; i < grid.length-3; i++) { //horizontal
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === grid[i+1][j] && grid[i][j] === grid[i+2][j] && grid[i][j] === grid[i+3][j] && grid[i][j]) {
          setStatus(`Player ${grid[i][j]} wins!`);
        }
      }
    }

    for(let i = 0; i < grid.length-3; i++) { //diagonal from top-left to bottom-right
      for(let j = 0; j < grid[i].length-3; j++) {
        if (grid[i][j] === grid[i+1][j+1] && grid[i][j] === grid[i+2][j+2] && grid[i][j] === grid[i+3][j+3] && grid[i][j]) {
          setStatus(`Player ${grid[i][j]} wins!`);
        }
      }
    }

    for(let i = 0; i < grid.length-3; i++) { // diagonal from bottom-left to top-right
      for(let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === grid[i+1][j-1] && grid[i][j] === grid[i+2][j-2] && grid[i][j] === grid[i+3][j-3] && grid[i][j]) {
          setStatus(`Player ${grid[i][j]} wins!`);
        }
      }
    }
  }

  const checkDrawCondition = () => {
    if(turn >= cols*rows && !status) {
      setStatus("It's a draw!");
    }
  }

  const resetGame = () => {
    turn = 0;
    setGrid(createGrid(cols, rows));
    setStatus("");
  }

  const makeMove = (e) => {
    if (!status) {
      let pos = e.target.dataset.pos.split("-");
      let newGrid = JSON.parse(JSON.stringify(grid));
      for (let i = grid[pos[0]].length; i >= 0; i--) {
        if (grid[pos[0]][i] === 0) {
          turn++;
          newGrid[pos[0]][i] = switchPlayer();
          setGrid(newGrid);
          return;
        }
      }
    }
  }

  return (
    <div className="App">
      <h1 className="title">Connect Four</h1>
      <button onClick={resetGame} className="btn__reset">RESTART</button>
      <p className="msg__status">{status}</p>
      <Grid grid={grid} makeMove={makeMove}/>
    </div>
  );
}

export default App;
