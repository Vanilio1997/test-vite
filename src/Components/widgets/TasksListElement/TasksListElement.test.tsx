import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import TasksListElement from './TasksListElement'

// Простые моки
vi.mock('@/icons/delete.svg?react', () => ({
	default: () => <span data-testid='delete-icon'>🗑️</span>,
}))

vi.mock('@/icons/edit.svg?react', () => ({
	default: () => <span data-testid='edit-icon'>✏️</span>,
}))

vi.mock('@/Components/ui/Checkbox', () => ({
	default: ({
		checked,
		onChange,
	}: {
		checked: boolean
		onChange: () => void
	}) => (
		<input
			type='checkbox'
			checked={checked}
			onChange={onChange}
			data-testid='checkbox'
		/>
	),
}))

vi.mock('@/Components/ui/IconButton', () => ({
	default: ({
		onClick,
		ariaLabel,
	}: {
		ariaLabel: string
		onClick: () => void
	}) => (
		<button onClick={onClick} aria-label={ariaLabel}>
			{ariaLabel}
		</button>
	),
}))

describe('TasksListElement', () => {
	const mockOnChangeStatus = vi.fn()
	const mockOnChangeText = vi.fn()
	const mockOnTaskDelete = vi.fn()

	const defaultTask = {
		id: 1,
		text: 'Test task',
		isCompleted: false,
	}

	const defaultProps = {
		task: defaultTask,
		onChangeStatus: mockOnChangeStatus,
		index: 0,
		onChangeText: mockOnChangeText,
		onTaskDelete: mockOnTaskDelete,
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	test('renders task text and interactive elements', () => {
		render(<TasksListElement {...defaultProps} />)

		expect(screen.getByText('Test task')).toBeInTheDocument()
		expect(screen.getByTestId('checkbox')).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'delete' })).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'edit' })).toBeInTheDocument()
	})

	test('toggles task status when checkbox is clicked', async () => {
		const user = userEvent.setup()
		render(<TasksListElement {...defaultProps} />)

		const checkbox = screen.getByTestId('checkbox')
		await user.click(checkbox)

		expect(mockOnChangeStatus).toHaveBeenCalledWith(0)
	})

	test('deletes task when delete button is clicked', async () => {
		const user = userEvent.setup()
		render(<TasksListElement {...defaultProps} />)

		const deleteButton = screen.getByRole('button', { name: 'delete' })
		await user.click(deleteButton)

		expect(mockOnTaskDelete).toHaveBeenCalledWith(defaultTask)
	})

	test('enters and exits edit mode correctly', async () => {
		const user = userEvent.setup()
		render(<TasksListElement {...defaultProps} />)

		// Входим в режим редактирования
		const editButton = screen.getByRole('button', { name: 'edit' })
		await user.click(editButton)

		const textElement = screen.getByText('Test task')
		expect(textElement).toHaveAttribute('contenteditable', 'true')

		await user.clear(textElement)
		await user.type(textElement, 'Updated task')
		await user.click(document.body)

		expect(mockOnChangeText).toHaveBeenCalledWith(0, 'Updated task')
	})
})
