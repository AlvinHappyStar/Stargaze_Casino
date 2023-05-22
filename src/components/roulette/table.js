import React from "react";
import PropTypes from "prop-types";
import "./style.scss"

import Slot from "./slot";

const Table = ({ betSelected, selectBetHandler }) => {
  let topRow = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, "3rd row"];

  let middleRow = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, "2nd row"];
 

  let bottomRow = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, "1st row"];

  let sideLineTop = ["1st 12", "2nd 12", "3rd 12"];

  let sideLineBot = ["1-18", "EVEN", "Red", "Black", "ODD", "19-36"];


  return (
    <div>
      <div className="board">
        <div >
          <Slot
            betValue={0}
            betSelected={betSelected}
            selectBetHandler={selectBetHandler}
          />
        </div>
        <div className="topthree__rows">
          <div className="top-row">
            {topRow.map((bet, index) => (
              <Slot
                betValue={bet}
                betSelected={betSelected}
                selectBetHandler={selectBetHandler}
                betAmount={topRow[index]}
              />
            ))}
          </div>
          <div className="middle-row">
            {middleRow.map((bet, index) => (
              <Slot
                betValue={bet}
                betSelected={betSelected}
                selectBetHandler={selectBetHandler}
                betAmount={middleRow[index]}
              />
            ))}
          </div>
          <div className="bottom-row">
            {bottomRow.map((bet, index) => (
              <Slot
                key={bet}
                betValue={bet}
                betSelected={betSelected}
                selectBetHandler={selectBetHandler}
                betAmount={bottomRow[index]}
              />
            ))}
          </div>
        </div>

        <div className="side-line-1">
          {sideLineTop.map((bet, index) => (
            <Slot
              key={bet}
              betValue={bet}
              betSelected={betSelected}
              selectBetHandler={selectBetHandler}
              betAmount={sideLineTop[index]}
            />
          ))}
        </div>
        <div className="side-line-2">
          {sideLineBot.map((bet, index) => (
            <Slot
              key={bet}
              betValue={bet}
              betSelected={betSelected}
              selectBetHandler={selectBetHandler}
              betAmount={sideLineBot[index]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

Table.propTypes = {
  betSelected: PropTypes.string,
  selectBetHandler: PropTypes.func.isRequired
};
export default Table;
