import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Confetti from "react-confetti";
import { keyframes } from '@emotion/react';

import "./style.scss"

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
  
  const degree = [0, 135, 302, 20, 320, 175, 273, 59, 205, 97, 185, 223, 39, 243, 115, 340, 155, 282, 77, 330, 125, 312, 87, 195, 165, 290, 10, 253, 49, 68, 215, 107, 350, 145, 273, 30, 233];

  console.log(index);
  const [confettiView, setConfettiView] = useState(false);

  const animation = keyframes`
  0% {
    transform: rotateZ(0deg);

  }
  50% {
    transform: rotateZ(3690deg);
  }
  100% {
    transform: rotateZ(${degree[index]}deg);
  }
`;

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (downCounter > 0) {
        setDownCounter(downCounter - 1);
      } else {
        setConfettiView(lastResult === 0);
        setIsChecked(true);
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
        <Grid item xs={12} sm={4}>
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
              background: "#b14444",
              backgroundSize: "contain",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              "& .MuiTypography-root": {
                fontWeight: "700",
                fontSize: { xs: "12px", sm: "24px" },
              },

            }}>
            <Typography
              sx={{
                color: "black",
              }}
            >
              {selectedBetType}
            </Typography>

          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
            <Box
              sx={{
                marginTop: { xs: "50px", sm: "-80px", md: "-120px" },
                width: { xs: "200px", sm: "360px", md: "700px" },
                aspectRatio: "1",
                borderRadius: "8px",
                background: "url(images/roulette.png)",
                backgroundSize: "cover",
                backgroundPosition: 'center',
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                transform: `rotateZ(${degree[index]}deg)`,
                marginLeft: { xs: "0px", sm: "350px", md: "750px" },
                animation: `${animation} 4s `,
              }}>
                
            </Box>
            <div className="ball" />;
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
