import { Todo } from '../../App';
import { useTodoContext } from '../../helpers/hooks/useTodoContext';
import { ClipboardIcon } from '../../icons';
import Translator from '../Translator/Translator';
import TodoItem from './TodoItem/TodoItem';

const TodoList = ({ filteredTodos }: { filteredTodos: Todo[] }) => {
	const { todos, toggleTodo, editTodo, deleteTodo, clearCompletedTodos } = useTodoContext();
	const activeTodos = todos.filter(todo => !todo.completed);

	const handleToggle = (id: string) => {
		const todo = todos.find(todo => todo.id === id);
		if (todo) {
			toggleTodo.mutate({ ...todo, completed: !todo.completed });
		}
	};

	const handleEdit = (id: string, newText: string) => {
		const todo = todos.find(todo => todo.id === id);
		if (todo) {
			editTodo.mutate({ ...todo, text: newText });
		}
	};

	const handleDeleteTodo = (id: string) => {
		deleteTodo.mutate(id);
	};

	const handleClearCompleted = () => {
		clearCompletedTodos.mutate(todos);
	};

	return (
		<div className="flex flex-col justify-end h-[376px] md:h-[446px] shadow-custom dark:shadow-dCustom bg-white dark:bg-dSecondBgColor rounded-md">
			{todos.length > 0 ? (
				<>
					<ul className="flex-1 overflow-y-auto custom-scrollbar rounded-md">
						{filteredTodos.map((todo, index) => (
							<TodoItem
								key={todo.id}
								todo={todo}
								onToggle={handleToggle}
								onDelete={handleDeleteTodo}
								onEdit={handleEdit}
							/>
						))}
					</ul>
					{/* mobile screen */}
					<div className="mobileScreen flex justify-between py-4 px-5">
						<p className="font-medium text-sm text-secondColor dark:text-dSecondColor">
							{activeTodos.length} <Translator>itemsLeft</Translator>
						</p>
						<button
							className="font-medium text-sm text-secondColor dark:text-dSecondColor focus:text-primeColor dark:focus:text-borderColor hover:text-primeColor dark:hover:text-borderColor cursor-pointer"
							onClick={handleClearCompleted}
						>
							<Translator>clearCompleted</Translator>
						</button>
					</div>

					{/* desktop screen */}
					<div className="desktopScreen flex justify-between py-4 px-5 md:px-6">
						<p className="font-normal text-sm text-secondColor dark:text-dSecondColor">
							{activeTodos.length} <Translator>itemsLeft</Translator>
						</p>
						<button
							className="font-normal text-sm text-secondColor dark:text-dSecondColor focus:text-primeColor dark:focus:text-borderColor hover:text-primeColor dark:hover:text-borderColor cursor-pointer"
							onClick={handleClearCompleted}
						>
							<Translator>clearCompleted</Translator>
						</button>
					</div>
				</>
			) : (
				<div className="flex flex-col items-center justify-center bg-white dark:bg-dSecondBgColor h-[376px] md:h-[446px]">
					<ClipboardIcon className="size-14 fill-primeColor dark:fill-dPrimeColor" />
					<div className="mt-4 text-center text-primeColor dark:text-dPrimeColor">
						<b>
							<Translator>dontHaveAnyTasks</Translator>
						</b>
						<p>
							<Translator>createTasks</Translator>
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default TodoList;
