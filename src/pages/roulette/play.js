import React, { useState } from "react";
import { Button, Container } from "@mui/material";
import { toast } from "react-toastify";

import Navbar from "../../components/navbar";
import SelectBet from "../../components/roulette/selectBet";
import CheckBet from "../../components/roulette/checkBet";

import { useSigningClient } from '../../contexts/cosmwasm'
import { BET_TYPE_EVEN, BET_TYPE_ODD } from "../../config";

function Play() {
  const [isBetState, setIsBetState] = useState(true);
  const [currentBetPrice, setCurrentBetPrice] = useState(0);
  const [currentBetType, setCurrentBetType] = useState("");
  const [lastResult, setLastResult] = useState(50);
  const [lastIndex, setLastIndex] = useState();

  const red = [
    1,
    3,
    5,
    7,
    9,
    12,
    14,
    16,
    18,
    19,
    21,
    23,
    25,
    27,
    30,
    32,
    34,
    36
  ];
  const black = [
    2,
    4,
    6,
    8,
    10,
    11,
    13,
    15,
    17,
    20,
    22,
    24,
    26,
    28,
    29,
    31,
    33,
    35
  ];

  const {
    walletAddress,
    signingClient,
    executeRoulette,
    nativeBalance

  } = useSigningClient()

  const resetBetPrice = (value) => {
    setCurrentBetPrice(value);
  };

  const resetBetType = (value) => {
    setCurrentBetType(value);
  };

  const onClickPlayButton = async () => {
    console.log("currentBet ======================> ", currentBetPrice, currentBetType);
    if (currentBetPrice <= 0) {
      toast.warning("Please select bet price.");
      return;
    }
    if (currentBetType === "") {
      toast.warning("Please select ODD or EVEN.");
      return;
    }

    if (!signingClient || walletAddress.length === 0) {
      toast.error('Please connect wallet first');
      return;
    }

    if (nativeBalance < currentBetPrice) {
      toast.error("Insufficient Funds");
      return
    }

    let gameResult = 50;
    let mode = 50;

    if (currentBetType === "1st row")
      mode = 37;
    else if (currentBetType === "2nd row")
      mode = 38;
    else if (currentBetType === "3rd row")
      mode = 39;
    else if (currentBetType === "1st 12")
      mode = 40;
    else if (currentBetType === "2nd 12")
      mode = 41;
    else if (currentBetType === "3rd 12")
      mode = 42;
    else if (currentBetType === "1-18")
      mode = 43;
    else if (currentBetType === "19-36")
      mode = 44;
    else if (currentBetType === "EVEN")
      mode = 45;
    else if (currentBetType === "ODD")
      mode = 46;
    else if (currentBetType === "Red")
      mode = 47;
    else if (currentBetType === "Black")
      mode = 48;
    else
      mode = parseInt(currentBetType);

    gameResult = await executeRoulette(mode, currentBetPrice);

    console.log("--------gameresult------", gameResult);
    if (gameResult != 50) {
      if(mode === 37 && ((gameResult - 1) % 3 === 0))      
        setLastResult(0);
      else if(mode === 38 && ((gameResult - 2) % 3 === 0))
        setLastResult(0);
      else if(mode === 39 && (gameResult % 3 === 0))
        setLastResult(0);
      else if(mode === 40 && (gameResult <= 12 && gameResult > 0))
        setLastResult(0);
      else if(mode === 41 && (gameResult <= 24 && gameResult > 12))
        setLastResult(0);
      else if(mode === 42 && (gameResult <= 36 && gameResult > 24))
        setLastResult(0);
      else if(mode === 43 && (gameResult <= 18 && gameResult >= 1))
        setLastResult(0);
      else if(mode === 44 && (gameResult <= 36 && gameResult >= 19))
        setLastResult(0);
      else if(mode === 45 && (gameResult % 2 == 0))
        setLastResult(0);
      else if(mode === 46 && (gameResult % 2 == 1))
        setLastResult(0);
      else if(mode === 47 && (red.indexOf(gameResult) > -1))
        setLastResult(0);
      else if(mode === 48 && (black.indexOf(gameResult) > -1))
        setLastResult(0);
      else if(mode === gameResult)
        setLastResult(0);
      else
        setLastResult(1);
    }

    setLastIndex(gameResult);

    if (gameResult === 50 || gameResult === undefined || gameResult === null)
      setIsBetState(true);
    else
      setIsBetState(false);
  };

  const onClickPlayAgainButton = () => {
    setCurrentBetPrice(0);
    setCurrentBetType("");
    setIsBetState(true);
    setLastResult(3);
    setLastIndex(0);
  };

  return (
    <>
      <Navbar />
      <Container
        sx={{
          paddingTop: { xs: "60px", sm: "80px", md: "150px" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isBetState ? (
          <SelectBet
            resetBetPrice={resetBetPrice}
            resetBetType={resetBetType}
          />
        ) : (
          <CheckBet
            selectedBetType={currentBetType}
            onClickPlayAgainButton={onClickPlayAgainButton}
            lastResult={lastResult}
            index={lastIndex}
          />
        )}
        {isBetState && (
          <Button
            sx={{
              width: { xs: "160px", sm: "240px", md: "275px" },
              height: { xs: "42px", sm: "64px", md: "75px" },
              borderRadius: "20px",
              background: "#FFC700",
              fontSize: { xs: "16px", sm: "28px", md: "36px" },
              fontWeight: "700",
              color: "black",
              textTransform: "none",
              marginBottom: "60px",
              "&:hover": {
                background: "#FFC700",
              },
            }}
            onClick={onClickPlayButton}
          >
            Play
          </Button>
        )}
      </Container>
    </>
  );
}

export default Play;
