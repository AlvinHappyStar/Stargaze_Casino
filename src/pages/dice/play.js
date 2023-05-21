import React, { useState } from "react";
import { Button, Container } from "@mui/material";
import { toast } from "react-toastify";

import Navbar from "../../components/navbar";
import SelectBet from "../../components/dice/selectBet";
import CheckBet from "../../components/dice/checkBet";

import { useSigningClient } from '../../contexts/cosmwasm'
import { BET_TYPE_EVEN, BET_TYPE_ODD } from "../../config";

function Play() {
  const [isBetState, setIsBetState] = useState(true);
  const [currentBetPrice, setCurrentBetPrice] = useState(0);
  const [currentBetType, setCurrentBetType] = useState("odd");
  const [lastResult, setLastResult] = useState(6);
  const [lastIndex, setLastIndex] = useState();

  const {
    walletAddress,
    signingClient,
    executeFlip,
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
      return
    }

    if (nativeBalance < currentBetPrice) {
      toast.error("Insufficient Funds");
      return
    }

    let gameResult = null;

    // if (currentBetType === "head")
    //   gameResult = await executeFlip(0, currentBetPrice);
    // else if(currentBetType === "tail")
    //   gameResult = await executeFlip(1, currentBetPrice);

    console.log("--------gameresult------", gameResult);
    if (gameResult != 6) {
      if ((gameResult % 2 === 0 && currentBetType === BET_TYPE_ODD) || (gameResult % 2 === 1 && currentBetType === BET_TYPE_EVEN))
        setLastResult(0);
      else
        setLastResult(1);
    }

    setLastIndex(gameResult + 1);



    // if(gameResult === 6 || gameResult === undefined || gameResult === null)
    //   setIsBetState(true);
    // else
    setIsBetState(false);
  };

  const onClickPlayAgainButton = () => {
    setCurrentBetPrice(0);
    setCurrentBetType("odd");
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
