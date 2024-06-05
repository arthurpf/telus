export interface ITodoItem {
	id: string,
	description: string,
	completed: boolean
}

export enum TodoStatus{
	ALL,
	ACTIVE,
	COMPLETED
}