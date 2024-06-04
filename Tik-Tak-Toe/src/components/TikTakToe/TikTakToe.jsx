import React from 'react'
import './TikTakToe.css'
import circle_icon from '../assets/circle.png'
import cross_icon from '../assets/cross.png'
import { useState } from 'react'
function TikTakToe() {

    const [count, setCount] = useState(0);
    const [data, setData] = useState(Array(9).fill(null));
    const [lock, setLock] = useState(false);
    
    const toggle = (e, num) => {
        if (lock || data[num]) {
            return;
        }
        const newData = [...data];
        if (count % 2 === 0) {
            newData[num] = "x";
            e.target.innerHTML = `<img src= '${cross_icon}' alt='x'>`
        } else {
            newData[num] = "o";
            e.target.innerHTML = `<img src= '${circle_icon}' alt='o'>`
        }
        setData(newData);
        setCount(prevCount => prevCount + 1);
        checkWin(newData);
    }

    const checkWin = (newData) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (newData[a] && newData[a] === newData[b] && newData[a] === newData[c]) {
                // Handle win condition
                setLock(true);
                console.log(`Player ${newData[a]} wins!`);
                return;
            }
        }

        // Check for a tie
        if (count === 8) {
            console.log("It's a tie!");
            setLock(true);
        }
    }

    const resetGame = () => {
        setData(Array(9).fill(null));
        setCount(0);
        setLock(false);
        document.querySelectorAll('.boxes').forEach(box => box.innerHTML = '');
    }

    return (
        <div className='container'>
            <h1 className='title'>Tic-Tac-Toe</h1>
            <div className="board">
                <div className="row1">
                    <div className="boxes" onClick={(e) => toggle(e, 0)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 1)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 2)}></div>
                </div>
                <div className="row2">
                    <div className="boxes" onClick={(e) => toggle(e, 3)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 4)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 5)}></div>
                </div>
                <div className="row3">
                    <div className="boxes" onClick={(e) => toggle(e, 6)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 7)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 8)}></div>
                </div>
            </div>
            <button className='reset' onClick={resetGame}>Reset</button>
        </div>

  )
  }

export default TikTakToe
