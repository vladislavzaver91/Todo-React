import Translator from '../Translator/Translator';

interface TodoStagesProps {
	activeTodoStage: 'all' | 'completed' | 'active';
	setTodoStage: (todoStage: 'all' | 'completed' | 'active') => void;
}

const TodoStages = ({ activeTodoStage, setTodoStage }: TodoStagesProps) => {
	return (
		<>
			{/* mobile screen */}
			<div className="mobile mt-4 h-12 flex justify-center shadow-custom dark:shadow-dCustom bg-white dark:bg-dSecondBgColor rounded-md">
				<div className="w-[166px] flex items-center justify-between">
					<button
						className={`filter-btn ${activeTodoStage === 'all' ? 'active' : ''}`}
						onClick={() => setTodoStage('all')}
					>
						<Translator>all</Translator>
					</button>
					<button
						className={`filter-btn ${activeTodoStage === 'active' ? 'active' : ''}`}
						onClick={() => setTodoStage('active')}
					>
						<Translator>active</Translator>
					</button>
					<button
						className={`filter-btn ${activeTodoStage === 'completed' ? 'active' : ''}`}
						onClick={() => setTodoStage('completed')}
					>
						<Translator>completed</Translator>
					</button>
				</div>
			</div>

			{/* desktop screen */}
			<div className="desktop -mt-[35px] flex justify-center shadow-custom bg-white dark:bg-dSecondBgColor rounded-md">
				<div className="w-[166px] flex items-center justify-around">
					<button
						className={`filter-btn ${activeTodoStage === 'all' ? 'active' : ''}`}
						onClick={() => setTodoStage('all')}
					>
						<Translator>all</Translator>
					</button>
					<button
						className={`filter-btn ${activeTodoStage === 'active' ? 'active' : ''}`}
						onClick={() => setTodoStage('active')}
					>
						<Translator>active</Translator>
					</button>
					<button
						className={`filter-btn ${activeTodoStage === 'completed' ? 'active' : ''}`}
						onClick={() => setTodoStage('completed')}
					>
						<Translator>completed</Translator>
					</button>
				</div>
			</div>
		</>
	);
};

export default TodoStages;
