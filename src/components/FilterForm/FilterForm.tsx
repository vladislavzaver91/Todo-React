import { Field, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { FiSearch } from 'react-icons/fi';
import * as Yup from 'yup';

interface FilterFormProps {
	value: string;
	onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const validationSchema = Yup.object({
	filter: Yup.string(),
});

const FilterForm = ({ value, onChange }: FilterFormProps) => {
	const { t } = useTranslation();

	return (
		<Formik initialValues={{ filter: value }} validationSchema={validationSchema} onSubmit={() => {}}>
			{({ setFieldValue }) => (
				<Form>
					<div className="mb-4 md:mb-6">
						<div className="relative flex items-center">
							<Field
								id="filter"
								name="filter"
								placeholder={t('placeholderSearch')}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setFieldValue('filter', e.currentTarget.value);
									onChange(e);
								}}
								className="rounded-md h-12 md:h-16 shadow-custom dark:shadow-dCustom bg-white dark:bg-dSecondBgColor w-full py-3.5 md:py-5 pl-5 md:pl-6 pr-2 md:pr-3 text-xs md:text-[18px] font-normal tracking-tighter text-secondColor dark:text-dPrimeColor dark:placeholder-dSecondColor focus:ring-1 focus:ring-borderColor dark:ring-dBorderColor focus:border-borderColor dark:border-dBorderColor outline-none"
							/>
							<div className="absolute inset-y-0 right-3 flex items-center pl-3">
								<FiSearch className="text-secondColor dark:text-dSecondColor md:size-6" />
							</div>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default FilterForm;
