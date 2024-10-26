import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

interface IThemeContext {
	theme: string;
	toggleTheme: () => void;
}

interface ThemeProps {
	children: React.ReactNode;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: ThemeProps) => {
	const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

	useEffect(() => {
		document.documentElement.classList.toggle('dark', theme === 'dark');
		if (theme === 'dark') {
			document.body.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
		}
		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggleTheme = useCallback(() => {
		setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
	}, []);

	const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
