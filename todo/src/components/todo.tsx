import React, { useState, useEffect, useMemo , ChangeEvent, FormEvent } from 'react'
import { useLocalStorage } from "@uidotdev/usehooks";
import { ITodoItem, TodoStatus } from './../types';
import Filter from './filter';

export default function Todo() {
	const [storageList, setStorageList] = useLocalStorage<ITodoItem[]>('todo-app.list', []);
	const [list, setList] = useState<ITodoItem[]>(storageList);
	const [newTodoDescription, setNewTodoDescription] = useState<string>('');
	const [filterType, setFilterType] = useState<TodoStatus>(TodoStatus.ALL);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodoDescription(e.target.value);
  };
	
	useEffect(() => {
		setStorageList(list);
	},[list]);

	const onChangeItemState = (completed: boolean, id: string) => {
		const index = list.findIndex((item) => item.id == id);
		const newList = [...list];
		newList[index].completed = completed;
		setList(newList);
	};

	const add = (e: FormEvent) => {
		e.preventDefault();
    if (newTodoDescription.trim()) {
      const newList: ITodoItem = {
        id: crypto.randomUUID(),
        description: newTodoDescription,
        completed: false
      };
      setList([...list, newList]);
      setNewTodoDescription(''); // Clear the input field after adding
    }
  };

	const visibleTodos = useMemo(
    () => {
			switch (filterType) {
				case TodoStatus.ALL:
					return list
				case TodoStatus.ACTIVE:
					return list.filter(item => !item.completed)
				case TodoStatus.COMPLETED:
					return list.filter(item => item.completed)
				default:
					return list
			}
		},
    [filterType, list]
  );

	const filter = (type: TodoStatus) => {
		setFilterType(type);
	}

	const deleteItem = (id: string) => {
		setList(list.filter(item => item.id !== id));
  };

	return (
		<section>
			<form className='mb-3'>
				<input
					type="text"
					className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					value={newTodoDescription}
					onChange={handleInputChange}
					placeholder="Enter todo description"
				/>
				<button className='mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={(e) => add(e)}>Add Item</button>
			</form>
			
			<Filter onChange={filter} />

			<ul className='w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
				{visibleTodos.map((item, index) => (
					<li className='flex justify-between gap-2 w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600' key={index}>
						<span className='self-center'>
							{item.description}
						</span>
						<span className='actions flex self-start'>
							<input type="checkbox" data-testid={`checkbox-${index}`} checked={item.completed} onChange={e => onChangeItemState(e.target.checked, item.id)} />
							<span role="button"data-testid={`delete-btn-${index}`} tabIndex={0} onClick={() => deleteItem(item.id)} className='ml-5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center'>&#215;</span>
						</span>
					</li>
				))}
			</ul>
		</section>
	)
}
