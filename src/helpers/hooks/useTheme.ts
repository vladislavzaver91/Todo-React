import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export const useTheme = () => {
	const value = useContext(ThemeContext);

	if (!value) {
		throw new Error('Context error');
	}

	return value;
};
