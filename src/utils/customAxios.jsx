import axios from "axios";

// Axios instance 생성
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
});

// Request interceptor: 인증 헤더 추가
api.interceptors.request.use(
    (request) => {
        let recoilState = localStorage.getItem("recoil-persist");
        if (recoilState !== null) {
            recoilState = JSON.parse(recoilState);
        }
        const accessToken = recoilState.UserAtom.accessToken;
        if (accessToken) {
            request.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor: 로그인 상태 처리 (토큰 갱신 구현 예정)
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response?.stauts === 401) {
            localStorage.setItem("recoil-persist", null);
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
