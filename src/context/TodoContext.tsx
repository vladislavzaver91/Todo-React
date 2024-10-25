import { createContext, ReactNode } from 'react';
import { Todo } from '../App';
import { useTodos } from '../helpers/hooks/useTodos';

interface ITodoContext {
	todos: Todo[];
	isLoading: boolean;
	error: Error | null;
	addTodo: ReturnType<typeof useTodos>['addTodo'];
	toggleTodo: ReturnType<typeof useTodos>['toggleTodo'];
	editTodo: ReturnType<typeof useTodos>['editTodo'];
	deleteTodo: ReturnType<typeof useTodos>['deleteTodo'];
	clearCompletedTodos: ReturnType<typeof useTodos>['clearCompletedTodos'];
}

export const TodoContext = createContext<ITodoContext | null>(null);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
	const todoState = useTodos();

	return <TodoContext.Provider value={todoState}>{children}</TodoContext.Provider>;
};
