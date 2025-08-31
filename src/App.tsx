import '@/fonts/fonts.css'
import { useCallback, useEffect, useState } from 'react'

import TodoCardLayout from './Components/layouts/TodoCardLayout'
import CreateElementsInput from './Components/widgets/CreateElementsInput'
import HeaderText from './Components/widgets/HeaderText'
import TasksList from './Components/widgets/TasksList'
import TasksListFooter from './Components/widgets/TasksListFooter'

import * as styles from './App.module.css'

import type {
	ChangeTaskTextType,
	DeleteTaskType,
	FilterType,
	ITask,
} from './types'

export const App = () => {
	const [tasks, setTasks] = useState<ITask[]>([])
	const [filtredTask, setFiltredTask] = useState<ITask[]>([])
	const [currentFilter, setCurrentFilter] = useState<FilterType>('all')
	const [isTasksVisible, setIsTasksVisible] = useState<boolean>(true)
	const [itemsLeft, setItemsLeft] = useState<number>(0)
	const [maxIndex, setMaxIndex] = useState<number>(0)
	const toggleTasksVisible = () => setIsTasksVisible(!isTasksVisible)
	const onCreate = (value: string): void => {
		const newTaskId = maxIndex === tasks.length ? maxIndex : maxIndex + 1
		setMaxIndex((prev) => prev + 1)
		setTasks([...tasks, { text: value, isCompleted: false, id: newTaskId }])
	}

	console.log(tasks)

	const handleStatusTaskChange = useCallback(
		(index: number): void => {
			const newItems = [...tasks]
			newItems[index] = {
				...newItems[index],
				isCompleted: !newItems[index].isCompleted,
			}
			setTasks(newItems)
		},
		[tasks]
	)

	const handleTaskDelete = useCallback<DeleteTaskType>(
		(task) => {
			const newItems = [...tasks]
			const elementIndex = tasks.findIndex((item) => item.id === task.id)
			newItems.splice(elementIndex, 1)
			setTasks(newItems)
		},
		[tasks]
	)

	const handleChangeTaskText = useCallback<ChangeTaskTextType>(
		(index, newText) => {
			const newItems = [...tasks]
			newItems[index] = {
				...newItems[index],
				text: newText,
			}
			setTasks(newItems)
		},
		[tasks]
	)

	const handleChangeCurrentFilterType = (newFilterValue: FilterType) =>
		setCurrentFilter(newFilterValue)

	const handleClearCompleted = (): void => {
		const newItems = tasks.map((task) => {
			if (task.isCompleted) {
				return { ...task, isCompleted: false }
			}
			return task
		})

		setTasks(newItems)
	}

	useEffect(() => {
		const tasksLeft = tasks.reduce((acc, cur) => {
			if (!cur.isCompleted) {
				acc++
			}

			return acc
		}, 0)

		setItemsLeft(tasksLeft)
	}, [tasks])

	useEffect(() => {
		let filtredTasks
		switch (currentFilter) {
			case 'all':
				setFiltredTask(tasks)
				break
			case 'active':
				filtredTasks = tasks.filter((task) => !task.isCompleted)
				setFiltredTask(filtredTasks)
				break
			case 'completed':
				filtredTasks = tasks.filter((task) => task.isCompleted)
				setFiltredTask(filtredTasks)
				break
			default:
				setFiltredTask(tasks)
		}
	}, [tasks, currentFilter])

	return (
		<div className={styles.container}>
			<HeaderText text='todos' />
			<TodoCardLayout>
				<div>
					<CreateElementsInput
						onCreate={onCreate}
						isTasksVisible={isTasksVisible}
						toggleTasksVisible={toggleTasksVisible}
					/>
				</div>
				{isTasksVisible && (
					<TasksList
						tasks={filtredTask}
						onTaskDelete={handleTaskDelete}
						onChangeText={handleChangeTaskText}
						onChangeStatus={handleStatusTaskChange}
					/>
				)}
				<TasksListFooter
					activeTab={currentFilter}
					changeFilterType={handleChangeCurrentFilterType}
					itemsLeft={itemsLeft}
					clearCompleted={handleClearCompleted}
				/>
			</TodoCardLayout>
		</div>
	)
}
