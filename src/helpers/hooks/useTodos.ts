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
		queryKey: ['todos'],
		queryFn: () => fetchItem('todos'),
	});

	const addTodo = useMutation({
		mutationFn: (newTodo: Omit<Todo, 'id'>) => addItem('todos', newTodo),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
		onError: error => console.error('Error adding todo:', error),
	});

	const toggleTodo = useMutation({
		mutationFn: (updatedTodo: Todo) => updateItem('todos', updatedTodo.id, updatedTodo),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
		onError: error => console.error('Error toggling todo:', error),
	});

	const editTodo = useMutation({
		mutationFn: (updatedTodo: Todo) => updateItem('todos', updatedTodo.id, updatedTodo),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
		onError: error => console.error('Error editing todo:', error),
	});

	const deleteTodo = useMutation({
		mutationFn: (id: string) => deleteItem('todos', id),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
		onError: error => console.error('Error deleting todo:', error),
	});

	const clearCompletedTodos = useMutation({
		mutationFn: async (todos: Todo[]) => {
			const completedTodos = todos.filter(todo => todo.completed);
			await Promise.all(completedTodos.map(todo => deleteItem('todos', todo.id)));
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
		onError: error => console.error('Error clearing completed todos:', error),
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
