import React, { useState, useEffect, useId, ChangeEvent, FormEvent } from 'react'
import { useLocalStorage } from "@uidotdev/usehooks";
import { ITodoItem } from '../types';

export default function Todo() {
	const [storageList, setStorageList] = useLocalStorage<ITodoItem[]>('todo-app.list', []);
	const [list, setList] = useState<ITodoItem[]>(storageList);
	const [newTodoDescription, setNewTodoDescription] = useState<string>('');

	// todo FILTERED LIST

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
        id: (list.length + 1).toString(),
        description: newTodoDescription,
        completed: false
      };
      setList([...list, newList]);
      setNewTodoDescription(''); // Clear the input field after adding
    }
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
			
			<ul className='w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
				{list.map((item, index) => (
					<li className='flex gap-2 w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600' key={index}>
						<span>
							{item.description}
						</span>
						<input type="checkbox" checked={item.completed} onChange={e => onChangeItemState(e.target.checked, item.id)} />
					</li>
				))}
			</ul>
		</section>
	)
}
