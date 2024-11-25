import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserAtom } from "../shared/recoil/UserAtom";
import { useRecoilState } from "recoil";

const TokenManager = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [userState, setUserState] = useRecoilState(UserAtom);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const accessToken = queryParams.get("accessToken");
        const refreshToken = queryParams.get("refreshToken");

        if (accessToken && refreshToken) {
            setUserState({
                accessToken,
                refreshToken,
                isLogin: true,
            });
        }

        navigate("/", { replace: true });
    }, [location]);
};

export default TokenManager;
