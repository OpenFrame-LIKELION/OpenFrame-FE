import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./config/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import { RecoilRoot } from "recoil";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <RecoilRoot>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/login" element={<LoginPage />} />
                    </Routes>
                </BrowserRouter>
            </RecoilRoot>
        </ThemeProvider>
    );
}

export default App;
