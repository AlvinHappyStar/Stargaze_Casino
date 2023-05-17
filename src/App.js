import { createContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SnackbarProvider } from "notistack";
import { SigningCosmWasmProvider } from './contexts/cosmwasm'


import RPSHome from "./pages/rps/home";
import RPSPlay from "./pages/rps/play";
import FlipHome from "./pages/flip/home";
import FlipPlay from "./pages/flip/play";

function App() {

  return (
    <>
      <SnackbarProvider>
        <SigningCosmWasmProvider>
          <Router>
            <Routes>
              <Route path="/flip" element={<FlipHome />} />
              <Route path="/flip_play" element={<FlipPlay />} />
              <Route path="/" element={<RPSHome />} />
              <Route path="/rps_play" element={<RPSPlay />} />
            </Routes>
          </Router>
        </SigningCosmWasmProvider>
      </SnackbarProvider>
      <ToastContainer autoClose={3000} draggableDirection="x" />
    </>
  );
}

export default App;
