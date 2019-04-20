import React, { useState, useEffect } from 'react';

const cols = 7, rows = 6;
let turn = 'yellow';

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

const switchTurn = () => {
  turn === 'yellow' ?  turn = 'red' : turn = 'yellow';
  return turn;
}


const Grid = (props) => {
  const initialGrid = createGrid(cols, rows);
  const [grid, setGrid] = useState(initialGrid);

  useEffect(() => {
    checkWinCondition();
  }, [grid])

  const checkWinCondition = () => {
    console.log(grid);

    //vertical
    for (let col of grid) {
      for (let i = 0; i < 3; i++) {
        if (col[i] === col[i+1] && col[i+1] === col[i+2] && col[i+2] === col[i+3] && col[i] !== "") {
          console.log("vertical winner winner chicken dinner!")
        }
      }
    }

    //horizontal
    for(let i = 0; i < 4; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === grid[i+1][j] && grid[i+1][j] === grid[i+2][j] && grid[i+2][j] === grid[i+3][j] && grid[i][j] !== "") {
          console.log("horizontal winner winner chicken dinner!")
        }
      }
    }

    //diagonal

  }

  const makeMove = (e) => {
    let position = e.target.dataset.position.split("-");
    let newGrid = JSON.parse(JSON.stringify(grid)); //make and entierly new copy of of an array of arrays with an unknown level of depths
    for (let i = grid[position[0]].length; i >= 0; i--) {
      if (grid[position[0]][i] === "") {
        newGrid[position[0]][i] = switchTurn();
        setGrid(newGrid);
        return;
      }
    }
  }

  return (
    <>
      <div className="grid">
        {grid.map((col, idx) => {
            return (
              <div className="col" key={idx}>
                {col.map((cell, idx2) => {
                  return (
                    <div
                      key={`${idx}-${idx2}`}
                      className="cell"
                      style={cell === "" ? null : {backgroundColor: cell}}
                      onClick={makeMove}
                      data-position={`${idx}-${idx2}`}/>
                  )})}
              </div>
            )})}
      </div>
    </>
  );
}

export default Grid;