import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import CreateElementsInput from './CreateElementsInput'

vi.mock('@/icons/down.svg?react', () => ({
	default: (props: any) => (
		<svg data-testid='down-icon' {...props}>
			▼
		</svg>
	),
}))

vi.mock('@/icons/up.svg?react', () => ({
	default: (props: any) => (
		<svg data-testid='up-icon' {...props}>
			▲
		</svg>
	),
}))

vi.mock('@/icons/create.svg?react', () => ({
	default: (props: any) => (
		<svg data-testid='create-icon' {...props}>
			+
		</svg>
	),
}))

vi.mock('@/Components/ui/ToggleIcon', () => ({
	default: ({
		isHidedElements,
		toggleFunc,
	}: {
		isHidedElements: boolean
		toggleFunc: () => void
	}) => (
		<button
			onClick={toggleFunc}
			aria-label='toggle'
			data-testid='toggle-icon'
			data-ishidden={isHidedElements}
		>
			{isHidedElements ? 'Show' : 'Hide'}
		</button>
	),
}))

vi.mock('@/Components/ui/IconButton', () => ({
	default: ({ onClick, ariaLabel, icon: Icon, color, size }: any) => (
		<button
			onClick={onClick}
			aria-label={ariaLabel}
			data-testid='icon-button'
			data-color={color}
			data-size={size}
		>
			<Icon />
			<span>{ariaLabel}</span>
		</button>
	),
}))

describe('CreateElementsInput', () => {
	const mockOnCreate = vi.fn()
	const mockToggleTasksVisible = vi.fn()

	const defaultProps = {
		isTasksVisible: true,
		toggleTasksVisible: mockToggleTasksVisible,
		onCreate: mockOnCreate,
		buttonLabel: 'Add',
		placeholder: 'What needs to be done?',
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	test('renders input and toggle button correctly', () => {
		render(<CreateElementsInput {...defaultProps} />)

		const input = screen.getByPlaceholderText('What needs to be done?')
		expect(input).toBeInTheDocument()

		const toggleButton = screen.getByTestId('toggle-icon')
		expect(toggleButton).toBeInTheDocument()
	})

	test('calls toggleTasksVisible when toggle button is clicked', async () => {
		const user = userEvent.setup()
		render(<CreateElementsInput {...defaultProps} />)

		const toggleButton = screen.getByTestId('toggle-icon')
		await user.click(toggleButton)

		expect(mockToggleTasksVisible).toHaveBeenCalledTimes(1)
	})

	test('adds new task when text button is clicked', async () => {
		const user = userEvent.setup()
		render(<CreateElementsInput {...defaultProps} />)

		const input = screen.getByPlaceholderText('What needs to be done?')
		await user.type(input, 'New task')

		const addButton = screen.getByRole('button', { name: 'Add' })
		await user.click(addButton)

		expect(mockOnCreate).toHaveBeenCalledWith('New task')
		expect(input).toHaveValue('')
	})

	test('adds new task when icon button is clicked with buttonType="icon"', async () => {
		const user = userEvent.setup()
		render(<CreateElementsInput {...defaultProps} buttonType='icon' />)

		const input = screen.getByPlaceholderText('What needs to be done?')
		await user.type(input, 'Icon task')

		const iconButtons = screen.getAllByTestId('icon-button')
		const addButton = iconButtons.find((button) =>
			button.textContent?.includes('create')
		)

		expect(addButton).toBeDefined()
		if (addButton) {
			await user.click(addButton)
			expect(mockOnCreate).toHaveBeenCalledWith('Icon task')
		}
	})

	test('shows text add button when input has text', async () => {
		const user = userEvent.setup()
		render(<CreateElementsInput {...defaultProps} />)

		expect(
			screen.queryByRole('button', { name: 'Add' })
		).not.toBeInTheDocument()

		const input = screen.getByPlaceholderText('What needs to be done?')
		await user.type(input, 'Test task')

		expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
	})

	test('does not add empty task', async () => {
		const user = userEvent.setup()
		render(<CreateElementsInput {...defaultProps} />)

		const input = screen.getByPlaceholderText('What needs to be done?')

		await user.type(input, '   ')

		const addButton = screen.queryByRole('button', { name: 'Add' })

		if (addButton) {
			await user.click(addButton)
		}

		expect(mockOnCreate).not.toHaveBeenCalled()
	})

	test('adds task when Enter key is pressed', async () => {
		const user = userEvent.setup()
		render(<CreateElementsInput {...defaultProps} />)

		const input = screen.getByPlaceholderText('What needs to be done?')
		await user.type(input, 'Enter task{enter}')

		expect(mockOnCreate).toHaveBeenCalledWith('Enter task')
		expect(input).toHaveValue('')
	})

	test('maintains focus on input after adding task', async () => {
		const user = userEvent.setup()
		render(<CreateElementsInput {...defaultProps} />)

		const input = screen.getByPlaceholderText('What needs to be done?')
		await user.click(input)
		expect(input).toHaveFocus()

		await user.type(input, 'Focused task')
		const addButton = screen.getByRole('button', { name: 'Add' })
		await user.click(addButton)

		expect(input).toHaveFocus()
	})
})
