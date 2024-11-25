import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: "recoil-persist",
    storage: localStorage,
});

export const UserAtom = atom({
    key: "UserAtom",
    default: { accessToken: "", refreshToken: "", isLogin: false },
    effects_UNSTABLE: [persistAtom],
});
