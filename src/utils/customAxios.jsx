import axios from "axios";
import { useRecoilState } from "recoil";
import { UserAtom } from "../shared/recoil/UserAtom";

const [userState, setUserState] = useRecoilState(UserAtom);

// Axios instance 생성
const api = axios.create({
    baseURL: "process.env.REACT_APP_API_URL",
    timeout: 10000,
});

// Request interceptor: 인증 헤더 추가
api.interceptors.request.use(
    (request) => {
        const accessToken = userState.accessToken;
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
            setUserState((prev) => ({
                ...prev,
                islogin: false,
            }));
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
