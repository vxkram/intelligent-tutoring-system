import { createTheme } from "@mui/material/styles";
import { createContext, useMemo, useState } from "react";

//color design tokens
export const tokens = (mode) => ({
	...(mode === "dark"
		? {
				secondary: {
					100: "#d4d4d4",
					200: "#a9a9a9",
					300: "#7e7e7e",
					400: "#535353",
					500: "#282828",
					600: "#202020",
					700: "#181818",
					800: "#101010",
					900: "#080808",
				},
				primary: {
					100: "#d1d0d1",
					200: "#a2a2a2",
					300: "#747374",
					400: "#454545",
					500: "#171617",
					600: "#121212",
					700: "#0e0d0e",
					800: "#090909",
					900: "#050405",
				},
				green: {
					100: "#dbf5ee",
					200: "#b7ebde",
					300: "#94e2cd",
					400: "#70d8bd",
					500: "#4cceac",
					600: "#3da58a",
					700: "#2e7c67",
					800: "#1e5245",
					900: "#0f2922",
				},
		  }
		: {
				secondary: {
					100: "#fefefe",
					200: "#fefefe",
					300: "#fdfdfd",
					400: "#fdfdfd",
					500: "#fcf0f0",
					600: "#cacaca",
					700: "#979797",
					800: "#656565",
					900: "#323232",
				},
				primary: {
					100: "#050405",
					200: "#090909",
					300: "#0e0d0e",
					400: "#d0d1d5", // manually changed
					500: "#fcfcfc",
					600: "#454545",
					700: "#747374",
					800: "#a2a2a2",
					900: "#d1d0d1",
				},
				green: {
					100: "#0f2922",
					200: "#1e5245",
					300: "#2e7c67",
					400: "#3da58a",
					500: "#4cceac",
					600: "#70d8bd",
					700: "#94e2cd",
					800: "#b7ebde",
					900: "#dbf5ee",
				},
		  }),
});

export const themeSettings = (mode) => {
	const colors = tokens(mode);

	return {
		palette: {
			mode: mode,
			...(mode === "dark"
				? {
						primary: {
							main: colors.primary[500],
						},
						secondary: {
							main: colors.secondary[500],
						},
						accent: {
							main: colors.green[500],
						},
						background: {
							default: colors.primary[500],
						},
				  }
				: {
						primary: {
							main: colors.primary[500],
						},
						secondary: {
							main: colors.secondary[500],
						},
						accent: {
							main: colors.green[500],
						},
						background: {
							default: colors.primary[500],
						},
				  }),
		},
		typography: {
			fontFamily: ["Source Sans 3", "sans-serif"].join(","),
			fontSize: 12,
			h1: {
				fontFamily: ["Source Sans 3", "sans-serif"].join(","),
				fontSize: 40,
			},
			h2: {
				fontFamily: ["Source Sans 3", "sans-serif"].join(","),
				fontSize: 32,
			},
			h3: {
				fontFamily: ["Source Sans 3", "sans-serif"].join(","),
				fontSize: 24,
			},
			h4: {
				fontFamily: ["Source Sans 3", "sans-serif"].join(","),
				fontSize: 20,
			},
			h5: {
				fontFamily: ["Source Sans 3", "sans-serif"].join(","),
				fontSize: 16,
			},
			h6: {
				fontFamily: ["Source Sans 3", "sans-serif"].join(","),
				fontSize: 14,
			},
		},
	};
};

export const ColorModeContext = createContext({
	toggleColorMode: () => {},
});

export const useMode = () => {
	const [mode, setMode] = useState("dark");

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () =>
				setMode((prev) => (prev === "light" ? "dark" : "light")),
		}),
		[]
	);

	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

	return [theme, colorMode];
};
