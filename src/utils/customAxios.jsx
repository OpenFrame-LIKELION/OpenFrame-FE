import axios from "axios";

// Axios instance 생성
const api = axios.create({
    baseURL: "https://openframe.link/v1/api",
    timeout: 30000,
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
        if (error.response?.status === 401) {
            localStorage.setItem("recoil-persist", {
                UserAtom: {
                    accessToken: null,
                    refreshToken: null,
                    isLogin: false,
                },
            });
            window.location.href = "/page/login";
        } else {
            alert("서버 오류가 발생했습니다.");
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

export default api;
