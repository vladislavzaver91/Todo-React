import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../helpers/hooks/useTheme';
import { AddIcon, LogoIcon, MoonIcon, SunIcon } from '../../icons';

interface HeaderProps {
	isModalOpen: boolean;
	setIsModalOpen: (open: boolean) => void;
}

const Header = ({ isModalOpen, setIsModalOpen }: HeaderProps) => {
	const { theme, toggleTheme } = useTheme();
	const { i18n } = useTranslation();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
		setIsDropdownOpen(false);
	};

	return (
		<header className="flex justify-between items-start mb-10">
			<div className="flex items-start gap-2 md:gap-3">
				<LogoIcon className="size-6" />
				<h1 className="text-xl font-semibold md:font-bold text-white md:text-2xl">TODO</h1>
			</div>

			<div className="flex items-center gap-4 md:gap-5 relative">
				<button className="cursor-pointer" onClick={() => setIsModalOpen(!isModalOpen)}>
					<AddIcon className="size-5 fill-white hover:fill-lineThroughColor focus:fill-lineThroughColor" />
				</button>
				<button className="cursor-pointer" onClick={toggleTheme}>
					{theme === 'dark' ? (
						<SunIcon className="size-5 fill-white hover:fill-lineThroughColor focus:fill-lineThroughColor" />
					) : (
						<MoonIcon className="size-5 fill-white hover:fill-lineThroughColor focus:fill-lineThroughColor" />
					)}
				</button>
				<div className="relative">
					<button
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}
						className=" text-white rounded-md focus:outline-none focus:text-lineThroughColor hover:text-lineThroughColor text-[20px]"
					>
						{i18n.resolvedLanguage === 'en' ? 'En' : 'Uk'}
					</button>
					{isDropdownOpen && (
						<div className="absolute right-0 mt-2 w-32 bg-white dark:bg-dSecondBgColor shadow-lg rounded-md z-10">
							<button
								onClick={() => changeLanguage('en')}
								className="block w-full text-left px-4 py-2 text-sm text-primeColor dark:text-dPrimeColor hover:bg-lineThroughColor dark:hover:bg-dLineThroughColor focus:bg-lineThroughColor dark:focus:bg-dLineThroughColor rounded-t-md"
							>
								En
							</button>
							<button
								onClick={() => changeLanguage('uk')}
								className="block w-full text-left px-4 py-2 text-sm text-primeColor dark:text-dPrimeColor hover:bg-lineThroughColor dark:hover:bg-dLineThroughColor focus:bg-lineThroughColor dark:focus:bg-dLineThroughColor rounded-b-md"
							>
								Uk
							</button>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
