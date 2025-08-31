import Checkbox from '@/Components/ui/Checkbox'
import IconButton from '@/Components/ui/IconButton'
import deleteIcon from '@/icons/delete.svg?react'
import edeteIcon from '@/icons/edit.svg?react'
import {
	ChangeTaskTextType,
	DeleteTaskType,
	ITask,
	handleStatusTaskChangeType,
} from '@/types'
import React, {
	FocusEvent,
	KeyboardEvent,
	useEffect,
	useRef,
	useState,
} from 'react'

import * as styles from './TasksListElement.module.css'

interface ITasksListElement {
	task: ITask
	onChangeStatus: handleStatusTaskChangeType
	index: number
	onChangeText: ChangeTaskTextType
	onTaskDelete: DeleteTaskType
}

const TasksListElement = ({
	task,
	onChangeStatus,
	index,
	onChangeText,
	onTaskDelete,
}: ITasksListElement) => {
	const [value, setValue] = useState(task.text)
	const [isEditMode, setIsEditMode] = useState(false)
	const ref = useRef(null)

	const handleOnChangeStatus = () => {
		onChangeStatus(index)
	}

	const handleTaskDelete = () => {
		onTaskDelete(task)
	}

	function handleEdit() {
		setIsEditMode(true)
	}

	function handleFocus(event: FocusEvent<HTMLParagraphElement, Element>) {
		setValue(event.target.textContent!)
	}

	function handleBlur(event: FocusEvent<HTMLParagraphElement, Element>) {
		setValue(event.target.textContent!)
		setIsEditMode(false)
	}

	function handleKeyDown(event: KeyboardEvent<HTMLParagraphElement>) {
		if (event.key === 'Enter' || event.key === 'Escape') {
			const element = ref.current! as HTMLElement
			element.blur()
		}
	}

	useEffect(() => {
		if (value !== task.text) {
			onChangeText(index, value)
		}
	}, [value, task, index])

	return (
		<li tabIndex={task.id} className={styles.taskItem}>
			<Checkbox
				checked={task.isCompleted}
				onChange={handleOnChangeStatus}
				id={String(task.id)}
				index={index}
			/>
			<p
				contentEditable={isEditMode}
				ref={ref}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onKeyDown={handleKeyDown}
				className={task.isCompleted ? styles.completed : ''}
			>
				{task.text}
			</p>
			{!isEditMode && (
				<div className={styles.actions}>
					<IconButton
						icon={deleteIcon}
						color='red'
						onClick={handleTaskDelete}
						ariaLabel='delete'
					/>
					<IconButton
						icon={edeteIcon}
						color='blue'
						onClick={handleEdit}
						ariaLabel='edit'
					/>
				</div>
			)}
		</li>
	)
}

export default React.memo(TasksListElement)
