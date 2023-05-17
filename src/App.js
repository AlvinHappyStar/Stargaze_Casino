import { createContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SnackbarProvider } from "notistack";
import { SigningCosmWasmProvider } from './contexts/cosmwasm'


import Home from "./pages/home";
import Play from "./pages/play";

function App() {

  return (
    <>
      <SnackbarProvider>
        <SigningCosmWasmProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/play" element={<Play />} />
            </Routes>
          </Router>
        </SigningCosmWasmProvider>
      </SnackbarProvider>
      <ToastContainer autoClose={3000} draggableDirection="x" />
    </>
  );
}

export default App;
