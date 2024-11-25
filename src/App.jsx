import { ThemeProvider } from "styled-components";
import theme from "./config/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import { RecoilRoot } from "recoil";
import TokenManager from "./utils/TokenManager";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <RecoilRoot>
                <BrowserRouter basename="/page">
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/token" element={<TokenManager />} />
                    </Routes>
                </BrowserRouter>
            </RecoilRoot>
        </ThemeProvider>
    );
}

export default App;
