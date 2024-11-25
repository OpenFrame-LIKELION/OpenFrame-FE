import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
    base: "/page",
    plugins: [
        react({
            babel: {
                plugins: [
                    "babel-plugin-macros",
                    "babel-plugin-styled-components",
                ],
            },
        }),
        svgr(),
    ],
});
