import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useSigningClient } from '../contexts/cosmwasm'

const PAGE_TABS = ['COINFLIP', 'RPS', 'DICE', 'ROULETTE'];
const PAGE_TAB_URLS = ['/', '/rps', '/dice', '/roulette'];

export default function Navbar() {
  const navigate = useNavigate();

  const location = useLocation();
  const [currentTab, setCurrentTab] = useState(PAGE_TAB_URLS[0]);

  const {
    walletAddress,
    connectWallet,
    signingClient,
    disconnect,
    getConfig,
    getBalances,
  } = useSigningClient()

  const handleConnect = () => {
    if (walletAddress.length === 0) {
      connectWallet(false)
    } else {
      disconnect()
    }
  }

  useEffect(() => {
    let pathName = location.pathname;
    setCurrentTab(pathName);
  }, [location]);

  useEffect(() => {
    let account = localStorage.getItem("address")
    if (account != null) {
      connectWallet(true)
    }
  }, [])

  useEffect(() => {
    if (!signingClient || walletAddress.length === 0)
      return
    getConfig()
    getBalances()
  }, [walletAddress, signingClient])

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          width: "100vw",
          height: { xs: "60px", sm: "80px", md: "150px" },
          backgroundColor: "#FFC700",
          padding: { xs: "0 10px", sm: "0 20px" },
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: "1",
          "& .MuiBox-root": {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          },
        }}
      >
        <Box
          sx={{
            cursor: "pointer",
            "& img": {
              height: { xs: "36px", sm: "42px", md: "90px" },
            },
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          <img alt="" src="./logo192.png" />
          <Typography
            sx={{
              display: { xs: "none", sm: "flex" },
              fontSize: { sm: "24px", md: "40px" },
              fontWeight: "400",
              color: "white",
            }}
          >
            STARPS
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: { xs: "30px", sm: "40px", md: "100px" },
          }}
        >
          {PAGE_TAB_URLS.map((item, index) => (
            <Box
              sx={{
                marginLeft: { xs: "10px", sm: "20px", md: "25px" },
                cursor: "pointer",
                borderRadius: "10%",
                borderBottom: item === currentTab || currentTab === (item + "_play") || (index == 0 && currentTab === "/flip_play")? "5px solid #b14444" : "none",
                padding: "5px",
                color: "white",
                fontSize: { xs: "10px", sm: "20px", md: "25px" },
                fontWeight: "600",
                textTransform: "none",
                "&:hover": {
                  color: "#b14444",
                  borderBottom: "5px solid white",
                },
              }}
              onClick={() => {
                if(item.includes("/flip"))
                  navigate("/");
                else
                  navigate(item);
              }}
            >
              {PAGE_TABS[index]}
            </Box>
          ))
          }
        </Box>
        <Box>
          {/* <Typography
            sx={{
              fontSize: { xs: "14px", sm: "18px", md: "32px" },
              fontWeight: "600",
              color: "black",
            }}
          >
            {nativeBalanceStr}
          </Typography> */}
          <Box
            sx={{
              marginLeft: { xs: "10px", sm: "20px", md: "30px" },
            }}
          >
            <Button
              sx={{
                marginLeft: { xs: "2px", sm: "20px", md: "30px" },
                maxWidth: { xs: "10px", sm: "300px", md: "400px" },
                borderRadius: "10px",
                background: "#b14444",
                color: "white",
                fontSize: { xs: "10px", sm: "15px", md: "25px" },
                fontWeight: "600",
                textTransform: "none",
                "&:hover": {
                  background: "black",
                },
                textOverflow: "ellipsis",
                overflow: 'hidden',
              }}
              onClick={handleConnect}
            >
              {walletAddress ? walletAddress.substring(0, 12) + "..." + walletAddress.substring(walletAddress.length - 6, walletAddress.length) : 'Connect Wallet'}
            </Button>
          </Box>

        </Box>
      </Box>
      <Box
        sx={{
          position: "fixed",
          width: { xs: "100px", md: "154px" },
          height: { xs: "42px", md: "64px" },
          borderRadius: "10px",
          left: { xs: "10px", md: "36px" },
          bottom: "20px",
          backgroundColor: "#FFC700",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "1",
          "& .MuiIconButton-root": {
            width: { xs: "42px", md: "64px" },
            aspectRatio: "1",
            backgroundSize: "cover",
          },
        }}
      >
        <IconButton
          sx={{
            background: "url(./images/twitter.png)",
          }}
        />
        <IconButton
          sx={{
            marginLeft: "5px",
            background: "url(./images/discord.png)",
          }}
        />
      </Box>
      <Button
        sx={{
          position: "fixed",
          width: { xs: "120px", md: "220px" },
          height: { xs: "42px", md: "65px" },
          right: { xs: "10px", md: "36px" },
          bottom: "20px",
          borderRadius: "10px",
          border: "5px solid #FFC700",
          fontSize: { xs: "14px", md: "25px" },
          fontWeight: "600",
          color: "black",
          textTransform: "none",
          zIndex: "1",
          display: PAGE_TAB_URLS.includes(currentTab) ? "none" : "flex",
        }}
        onClick={() => {
          if (currentTab === "/rps_play")
            navigate("/rps");
          else if(currentTab === "/dice_play")
            navigate("/dice");
          else if(currentTab === "/roulette_play")
            navigate("/roulette");
          else
            navigate("/");
        }}
      >
        Back
      </Button>
    </>
  );
}
