import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Todo } from '../../App';
import { addItem, deleteItem, fetchItem, updateItem } from '../../services/todo-api';

export const useTodos = () => {
	const queryClient = useQueryClient();

	// Getting todos
	const {
		data: todos = [],
		isLoading,
		error,
	} = useQuery<Todo[], Error>({
		queryKey: ['todos'], // Passing the query key in the object
		queryFn: () => fetchItem('todos'),
	});

	// Adding new todo
	const addTodo = useMutation({
		mutationFn: (newTodo: Omit<Todo, 'id'>) => addItem('todos', newTodo),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] });
		},
	});

	// Change of completion status todo
	const toggleTodo = useMutation({
		mutationFn: (updatedTodo: Todo) => updateItem('todos', updatedTodo.id, updatedTodo),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] });
		},
	});

	// Editing todo
	const editTodo = useMutation({
		mutationFn: (updatedTodo: Todo) => updateItem('todos', updatedTodo.id, updatedTodo),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] });
		},
	});

	// Deleting todo
	const deleteTodo = useMutation({
		mutationFn: (id: string) => deleteItem('todos', id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] });
		},
	});

	// Deleting completed todos
	const clearCompletedTodos = useMutation({
		mutationFn: async (todos: Todo[]) => {
			const completedTodos = todos.filter(todo => todo.completed);
			await Promise.all(completedTodos.map(todo => deleteItem('todos', todo.id)));
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] });
		},
	});

	return {
		todos,
		isLoading,
		error,
		addTodo,
		toggleTodo,
		editTodo,
		deleteTodo,
		clearCompletedTodos,
	};
};
