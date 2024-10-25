import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import AddTodoModal from './components/AddTodoModal/AddTodoModal';
import FilterForm from './components/FilterForm/FilterForm';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';
import TodoStages from './components/TodoStages/TodoStages';
import Translator from './components/Translator/Translator';
import { useTheme } from './helpers/hooks/useTheme';
import { useTodoContext } from './helpers/hooks/useTodoContext';
import './index.css';

export interface Todo {
	id: string;
	text: string;
	completed: boolean;
}

const App = () => {
	const [todoStage, setTodoStage] = useState<'all' | 'completed' | 'active'>('all');
	const [filter, setFilter] = useState('');
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const { theme } = useTheme();
	const { todos, isLoading, error, addTodo } = useTodoContext();

	// Filtering tasks by state and search
	const getFilteredTodos = () => {
		const normalizedFilter = filter.toLowerCase();
		const filteredTodos = todos.filter(todo => todo.text.toLowerCase().includes(normalizedFilter));

		switch (todoStage) {
			case 'completed':
				return filteredTodos.filter(todo => todo.completed);
			case 'active':
				return filteredTodos.filter(todo => !todo.completed);
			default:
				return filteredTodos;
		}
	};

	const handleAddTodo = async (text: string) => {
		await addTodo.mutateAsync({ text, completed: false });
		setIsModalOpen(false); // Closing the modal after adding a task
	};

	return (
		<div className={`container ${theme === 'dark' ? 'bg-image__dark' : 'bg-image'}`}>
			<div className="wrapper">
				<div className="pt-11 md:pt-16">
					{isLoading ? (
						<div className="text-3xl font-bold tracking-tighter text-white dark:text-dPrimeColor">
							<Translator>loading</Translator>
						</div>
					) : error ? (
						// Display an error message if an error occurs
						<div className="text-red-600 dark:text-red-400 text-lg font-bold">
							<Translator>errorOccurred</Translator>: {error.message}
						</div>
					) : (
						<Header isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
					)}

					{isLoading ? (
						<Skeleton width="100%" height={64} className="custom-skeleton" />
					) : (
						<FilterForm value={filter} onChange={evt => setFilter(evt.currentTarget.value)} />
					)}
				</div>

				{isLoading ? (
					<Skeleton width="100%" height={446} className="custom-skeleton" />
				) : (
					<>
						<TodoList filteredTodos={getFilteredTodos()} />
						<TodoStages activeTodoStage={todoStage} setTodoStage={setTodoStage} />
					</>
				)}

				<AddTodoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddTodo={handleAddTodo} />
			</div>
		</div>
	);
};

export default App;
