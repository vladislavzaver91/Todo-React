import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { CgClose } from 'react-icons/cg';
import * as Yup from 'yup';
import Translator from '../Translator/Translator';

interface AddTodoModalProps {
	isOpen: boolean;
	onClose: () => void;
	onAddTodo: (text: string) => void;
}

const validationSchema = Yup.object({
	text: Yup.string().required('Text is required').min(2, 'Text must be at least 2 characters long.'),
});

const AddTodoModal = ({ isOpen, onClose, onAddTodo }: AddTodoModalProps) => {
	const { t } = useTranslation();

	return !isOpen ? null : (
		<div className="fixed inset-0 flex items-center justify-center bg-black dark:bg-dSecondColor  bg-opacity-65 dark:bg-opacity-65">
			<div className="absolute bg-white dark:bg-dSecondBgColor p-6 md:p-8 rounded-md shadow-lg max-w-sm md:max-w-lg w-full">
				<button className="absolute top-3 right-3" onClick={onClose}>
					<CgClose className="size-5 md:size-6 text-primeColor dark:text-dSecondColor focus:text-accentColor dark:focus:text-accentColor hover:text-accentColor dark:hover:text-accentColor" />
				</button>
				<h2 className="text-primeColor dark:text-dPrimeColor font-bold text-sm md:text-2xl tracking-tighter mb-4 md:mb-6">
					<Translator>addTodo</Translator>
				</h2>
				<Formik
					initialValues={{ text: '' }}
					validationSchema={validationSchema}
					onSubmit={(values, { resetForm }) => {
						onAddTodo(values.text);
						resetForm();
						onClose();
					}}
				>
					{() => (
						<Form>
							<div className="mb-8 md:mb-9 relative">
								<Field
									id="text"
									name="text"
									placeholder={t('placeholderAdd')}
									className="border rounded-md h-12 md:h-16 shadow-custom dark:shadow-dCustom w-full py-3.5 md:py-5 pl-5 md:pl-6 pr-2 md:pr-5 text-xs md:text-[18px] font-normal tracking-tighter text-secondColor dark:text-dPrimeColor dark:placeholder-dSecondColor focus:ring-1 focus:ring-borderColor dark:ring-dBorderColor focus:border-borderColor dark:border-dBorderColor outline-none dark:bg-dSecondBgColor"
								/>
								<ErrorMessage name="text" component="div" className="text-red-500 text-sm md:text-[18px] absolute" />
							</div>
							<button
								type="submit"
								className="bg-custom-gradient text-white dark:text-dPrimeColor focus:text-borderColor dark:focus:text-dSecondColor hover:text-borderColor dark:hover:text-dSecondColor font-bold text-sm md:text-[18px] tracking-tighter rounded-md px-4 md:px-6 py-2 md:py-3"
							>
								<Translator>add</Translator>
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default AddTodoModal;
