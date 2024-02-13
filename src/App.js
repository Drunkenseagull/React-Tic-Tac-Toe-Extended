import Square from "./Square"
import { useState } from 'react';

export default function Board() {

  const [dimensions, setDimensions] = useState({
    width: 3,
    height: 3,
    winDistance: 3
  });

  let [winLines, setWinLines] = useState(calculateWinLines());
  console.log(winLines);

  const [squares, setSquares] = useState(Array(dimensions.width * dimensions.height).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = checkWinner();
  let status;
  if (winner) {
    status = "Winner!: " + winner;
  }
  else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    if (squares[i]) { return; }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    }
    else {
      nextSquares[i] = "O";
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function calculateWinLines() {
    let newWinLines = Array(dimensions.width * dimensions.height).fill(null);
    let stopVert = dimensions.width * dimensions.height - ((dimensions.winDistance - 1) * dimensions.width);; // vertical index that will go out of bounds, will always been same
    let stopHoriForw = 0; // horizontal index that will go out of bounds counting forward, needs to be updated per row
    let stopHoriBack = 0; //horizontal index that will go out of bounds counting backward, needs to be updated per row
    for (let i = 0; i < dimensions.width * dimensions.height; i++) {
      if (i % dimensions.width === 0) {
        stopHoriForw = i + dimensions.width - (dimensions.winDistance - 1);
        stopHoriBack = i + dimensions.winDistance - 2;
      }

      newWinLines[i] = {
        vert: calculateVertLine(i),
        hori: calculateHoriLine(i),
        diagForw: calculateDiagForwLine(i),
        diagBack: calculateDiagBackLine(i)
      }
    }

    function calculateVertLine(i) {
      if (i >= stopVert) {
        return null;
      }
      else {
        let res = [];
        for (let j = i + dimensions.width; j <= i + (dimensions.winDistance - 1) * dimensions.width; j += dimensions.width) {
          res.push(j)
        }
        return res;
      }
    }

    function calculateHoriLine(i) {
      if (i >= stopHoriForw) {
        return null;
      }
      else {
        let res = [];
        for (let j = i + 1; j <= i + (dimensions.winDistance - 1); j++) {
          res.push(j)
        }
        return res;
      }
    }

    function calculateDiagForwLine(i) {
      if (i >= stopVert || i >= stopHoriForw) {
        return null;
      }
      else {
        let res = [];
        for (let j = i + 1 + dimensions.width; j <= i + ((dimensions.winDistance - 1) * dimensions.width) + (dimensions.winDistance - 1); j += dimensions.width + 1) {
          res.push(j)
        }
        return res;
      }
    }

    function calculateDiagBackLine(i) {
      if (i >= stopVert || i <= stopHoriBack) {
        return null;
      }
      else {
        let res = [];
        for (let j = i - 1 + dimensions.width; j <= i + ((dimensions.winDistance - 1) * dimensions.width) - (dimensions.winDistance - 1); j += dimensions.width - 1) {
          res.push(j)
        }
        return res;
      }
    }
    return newWinLines;
  }


  function checkWinner() {
    let checkVal = null;
    for (let i = 0; i < dimensions.width * dimensions.height; i++) {
      checkVal = squares[i];
      if (!checkVal)
        continue;

      if (checkCell(i))
        return checkCell(i);
    }
    return null;

    //methods 
    function checkCell(i) {
      console.log("winLines " + i + " : " + winLines[i]);
      for (const line of Object.values(winLines[i])) {
        if (!line)
          continue;
        const lineWin = checkLine(line);
        if (lineWin)
          return lineWin;
      }
      return null;

      function checkLine(line) {
        console.log(line);
        for (let i = 0; i < line.length; i++) {
          console.log("Check " + i + ": " + line[i]);
          if (squares[line[i]] !== checkVal)
            return null;
        }
        return checkVal;
      }
    }
  }



  function buildBoard() {
    return (
      5
    )
  }




  // let squareButtons = new Array(dimensions.width * dimensions.height).fill(null);
  // for (let i = 0; i < dimensions.width * dimensions.height; i++) {
  //   squareButtons[i] = <Square value={squares[i]} onSquareClick={() => handleClick(i)} />
  // };
  // let board = (() => {
  //   <div className="board-row"></div>
  // })

  // let t2 = [
  //   <Square value={squares[0]} onSquareClick={() => handleClick(0)} key={"square" + 1}/>,
  //   <Square value={squares[1]} onSquareClick={() => handleClick(1)} key={"square" + 2}/>,
  //   <Square value={squares[2]} onSquareClick={() => handleClick(2)} key={"square" + 3}/>];


  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}