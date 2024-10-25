import { useState } from 'react';
import { Todo } from '../../../App';
import { useTheme } from '../../../helpers/hooks/useTheme';
import { EditIcon, TrashIcon } from '../../../icons';

interface TodoItemProps {
	todo: Todo;
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
	onEdit: (id: string, newText: string) => void;
}

const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
	const { theme } = useTheme();
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [newText, setNewText] = useState<string>(todo.text);

	const handleEdit = () => {
		if (isEditing) {
			onEdit(todo.id, newText);
		}
		setIsEditing(!isEditing);
		console.log(todo);
	};

	const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
		if (evt.key === 'Enter') {
			handleEdit();
		}
	};

	return (
		<li
			className={`${
				isEditing ? 'bg-editingBgColor dark:bg-dEditingBgColor' : 'bg-white dark:bg-dSecondBgColor'
			} py-4 md:py-5 pl-5 pr-2 md:pl-6 md:pr-3 flex justify-between border-b-2 border-borderColor dark:border-dBorderColor ${
				todo.completed ? 'line-through text-lineThroughColor dark:text-dLineThroughColor' : ''
			} group`}
		>
			<div className="flex items-center w-full overflow-hidden">
				<label className="custom-checkbox mr-3 md:mr-6">
					<input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} className="hidden" />
					<span className={`custom-checkbox__indicator ${theme === 'dark' ? 'dark' : ''}`}></span>
				</label>
				{isEditing ? (
					<input
						type="text"
						value={newText}
						onChange={e => setNewText(e.target.value)}
						className="border rounded-md shadow-custom dark:shadow-dCustom text-xs md:text-[18px] font-normal tracking-tighter text-secondColor dark:text-dPrimeColor dark:placeholder-dSecondColor focus:ring-1 focus:ring-borderColor dark:ring-dBorderColor focus:border-borderColor dark:border-dBorderColor outline-none bg-white dark:bg-dSecondColor p-2 w-[200px] md:w-[380px]"
						onBlur={handleEdit}
						onKeyDown={handleKeyDown}
					/>
				) : (
					<p
						className={`font-medium md:font-normal text-sm md:text-[18px] whitespace-nowrap overflow-x-auto scrollbar-hide w-[200px] md:w-[380px] ${
							todo.completed
								? 'text-lineThroughColor dark:text-dLineThroughColor'
								: 'text-primeColor dark:text-dPrimeColor'
						}`}
					>
						{todo.text}
					</p>
				)}
			</div>
			<div className="flex gap-2">
				<button
					className="cursor-pointer md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 md:transition-opacity md:duration-300"
					onClick={() => handleEdit()}
				>
					<EditIcon className="md:size-6 stroke-primeColor dark:stroke-dSecondColor focus:stroke-secondColor dark:focus:stroke-dPrimeColor hover:stroke-secondColor dark:hover:stroke-dPrimeColor" />
				</button>
				<button
					className="cursor-pointer md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 md:transition-opacity md:duration-300"
					onClick={() => onDelete(todo.id)}
				>
					<TrashIcon className="md:size-6 stroke-primeColor dark:stroke-dSecondColor focus:stroke-secondColor dark:focus:stroke-dPrimeColor hover:stroke-secondColor dark:hover:stroke-dPrimeColor" />
				</button>
			</div>
		</li>
	);
};

export default TodoItem;
