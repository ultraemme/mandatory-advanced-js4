import React from 'react';

const Grid = (props) => {
  const grid = props.grid;

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
                      onClick={props.makeMove}
                      data-pos={`${idx}-${idx2}`}/>
                  )})}
              </div>
            )})}
      </div>
    </>
  );
}

export default Grid;