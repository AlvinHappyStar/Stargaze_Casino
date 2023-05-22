import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {
  BET_TYPE_ODD,
  BET_TYPE_EVEN,
  SUPPORTED_TOKEN_INFO,
} from "../../config";

import Table from "./table";

const supportedTokenInfo = SUPPORTED_TOKEN_INFO;

export default function SelectBet({ resetBetPrice, resetBetType }) {
  const [selectedTokenIndex, setSelectedTokenIndex] = useState(0);
  const [selectedBetPrice, setSelectedBetPrice] = useState(0);
  const [selectedBetType, setSelectedBetType] = useState("");

  const setBetType = (value) => {
    setSelectedBetType(value);
    resetBetType(value);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          marginTop: { xs: "30px", sm: "40px", md: "50px" },
        }}
      >
        <Box
          sx={{
            maxWidth: "calc(100vw - 20px)",
            height: { xs: "54px", md: "64px" },
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            background: "#FFC700",
            borderRadius: "10px",
            padding: "4px 6px",
            overflow: "auto",
            "& .MuiButton-root": {
              borderRadius: "15px",
              fontWeight: "600",
              fontSize: { xs: "14px", sm: "18px", md: "25px" },
              color: "black",
              "&:hover": {
                background: "white",
              },
            },
          }}
        >
          {supportedTokenInfo?.length > 0 &&
            supportedTokenInfo[selectedTokenIndex]?.betPrices?.length > 0 &&
            supportedTokenInfo[selectedTokenIndex]?.betPrices.map(
              (item, index) => (
                <Button
                  sx={{
                    background:
                      selectedBetPrice === item ? "white" : "transparent",
                  }}
                  onClick={() => {
                    setSelectedBetPrice(item);
                    resetBetPrice(item);
                  }}
                >
                  {item}
                </Button>
              )
            )}
        </Box>
        <Select
          sx={{
            width: "180px",
            height: { xs: "42px", sm: "64px" },
            background: "#FFC700",
            borderRadius: { xs: "20px", sm: "10px" },
            marginLeft: "15px",
            marginTop: { xs: "10px", sm: "20px", md: "0" },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "0",
            },
            "& .MuiSelect-select": {
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            },
          }}
          value={selectedTokenIndex}
          onChange={(e) => {
            setSelectedTokenIndex(e.target.value);
            setSelectedBetPrice(0);
          }}
        >
          {supportedTokenInfo?.length > 0 &&
            supportedTokenInfo.map((item) => (
              <MenuItem
                value={item.index}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <img
                  alt=""
                  src={item.logo}
                  style={{
                    width: "28px",
                    marginLeft: "5px",
                    borderRadius: "50%",
                  }}
                />
                <Typography
                  sx={{
                    marginLeft: "10px",
                    fontWeight: "600",
                    fontSize: { xs: "16px", sm: "25px" },
                    color: "#000000",
                  }}
                >
                  {item.symbol}
                </Typography>
              </MenuItem>
            ))}
        </Select>
      </Box>
      <Box
        sx={{
          maxWidth: "calc(100vw - 20px)",
          // height: { xs: "54px", md: "64px" },
          display: "flex",
          flexDirection: "row",
          marginTop: "20px",
          alignItems: "center",
          background: "white",
          borderRadius: "10px",
          padding: "4px 6px",
          overflow: "auto",
          "& .MuiButton-root": {
            borderRadius: "15px",
            fontWeight: "600",
            fontSize: { xs: "14px", sm: "18px", md: "25px" },
            color: "black",
            "&:hover": {
              background: "white",
            },
          },
        }}
      >
        <Table
          betSelected={selectedBetType}
          selectBetHandler={setBetType}
        />
      </Box>
    </>
  );
}
