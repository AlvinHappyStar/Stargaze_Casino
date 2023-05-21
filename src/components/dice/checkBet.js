import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Confetti from "react-confetti";
import { keyframes } from '@emotion/react';

const RESULT = [
  { txt: "WIN", color: "#1CC700" },
  { txt: "LOSE", color: "#000000" },
  { txt: "LOSE", color: "#000000" },
];

export default function CheckBet({ selectedBetType, onClickPlayAgainButton, lastResult, index }) {
  console.log("BET TYPE --------------------------------> ", selectedBetType);
  console.log("RESULT --------------------------------> ", index);
  const [isChecked, setIsChecked] = useState(false);
  const [downCounter, setDownCounter] = useState(3);
  const [housePickedResult, setHousePickedResult] = useState(index);

  console.log(index);
  const [confettiView, setConfettiView] = useState(false);

  const animation = keyframes`
  from {
    transform: rotateX(0deg) rotateY(3690deg) translateZ(0px);

  }
  to {
    transform: rotateX(3690deg) rotateY(0deg) translateZ(-10px);
  }
`;

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("======downcounter========", downCounter)
      if (downCounter > 0) {
        setDownCounter(downCounter - 1);
      } else {
        console.log("-----------lastResult--------", lastResult)
        setConfettiView(lastResult === 0);
        setIsChecked(true);
        setHousePickedResult(index)
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [downCounter]);

  return (
    <>
      <Grid
        container
        sx={{
          marginTop: { xs: "20px", sm: "60px", md: "80px" },
          "& .MuiGrid-root": {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        <Grid item xs={12} sm={6}>
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: { xs: "16px", sm: "24px", md: "32px" },
              color: "black",
            }}
          >
            YOU PICKED
          </Typography>
          <Box
            sx={{
              marginTop: "20px",
              width: { xs: "90px", sm: "120px", md: "200px" },
              aspectRatio: "1",
              borderRadius: "8px",
              background: `url(images/${selectedBetType}.png)`,
              backgroundSize: "contain",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            sx={{
              marginTop: { xs: "20px", sm: "0" },
              fontWeight: "700",
              fontSize: { xs: "16px", sm: "24px", md: "32px" },
              color: "black",
            }}
          >
            PICKED
          </Typography>
          <Box
            sx={{
              marginTop: "20px",
              width: { xs: "90px", sm: "120px", md: "200px" },
              aspectRatio: "1",
              borderRadius: "8px",
              background: `url(images/${downCounter > 0 ? Math.floor(Math.random() * 6) + 1 : housePickedResult
                }.png)`,
              backgroundSize: "contain",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              animation: `${animation} 4s`,
            }}/>
        </Grid>
      </Grid>
      {isChecked && (
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            position: "absolute",
            paddingTop: { xs: "90px", sm: "150px", md: "220px" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#ffffffa0",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              "& .MuiTypography-root": {
                fontWeight: "700",
                fontSize: { xs: "36px", sm: "48px" },
              },
            }}
          >
            <Typography
              sx={{
                color: "black",
              }}
            >
              YOU
            </Typography>
            <Typography
              sx={{
                marginLeft: "10px",
                color: `${RESULT[lastResult]?.color}`,
              }}
            >
              {RESULT[lastResult]?.txt}!
            </Typography>
          </Box>
          <Button
            sx={{
              marginTop: "30px",
              width: { xs: "160px", sm: "240px", md: "275px" },
              height: { xs: "42px", sm: "64px", md: "75px" },
              borderRadius: "20px",
              background: "#FFC700",
              fontSize: { xs: "16px", sm: "28px", md: "36px" },
              fontWeight: "700",
              color: "black",
              textTransform: "none",
              "&:hover": {
                background: "#FFC700",
              },
            }}
            onClick={onClickPlayAgainButton}
          >
            Play Again
          </Button>
          <Confetti
            style={{
              position: "fixed",
            }}
            width={window.innerWidth}
            height={window.innerHeight}
            run={confettiView}
          />
        </Box>
      )}
    </>
  );
}
