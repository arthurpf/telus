import React from 'react'
import { TodoStatus } from "./../types";

export default function filter({ onChange  = (t: TodoStatus) => {} }) {
	return (
		<div className='mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
			<select className="w-full" onChange={(e) => { onChange(parseInt(e.target.value) as unknown as TodoStatus) }}>
				<option value={TodoStatus.ALL}>All</option>
				<option value={TodoStatus.ACTIVE}>Active</option>
				<option value={TodoStatus.COMPLETED}>Completed</option>
			</select>
		</div>
	)
}