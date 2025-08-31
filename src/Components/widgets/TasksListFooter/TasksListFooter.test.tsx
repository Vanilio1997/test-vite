// src/Components/widgets/TasksListFooter/TasksListFooter.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import TasksListFooter from './TasksListFooter'
import { FilterType } from '@/types'

vi.mock('@/Components/ui/Tabs/Tabs', () => ({
	default: ({
		changeActiveTab,
	}: {
		changeActiveTab: (type: FilterType) => void
	}) => (
		<div>
			<button onClick={() => changeActiveTab('all')}>all</button>
			<button onClick={() => changeActiveTab('active')}>active</button>
			<button onClick={() => changeActiveTab('completed')}>completed</button>
		</div>
	),
}))

describe('TasksListFooter', () => {
	const mockChangeFilterType = vi.fn()
	const mockClearCompleted = vi.fn()

	const defaultProps = {
		itemsLeft: 5,
		activeTab: 'all' as const,
		changeFilterType: mockChangeFilterType,
		clearCompleted: mockClearCompleted,
	}

	beforeEach(() => vi.clearAllMocks())

	test('renders core elements correctly', () => {
		render(<TasksListFooter {...defaultProps} />)

		expect(screen.getByText('5 items left')).toBeInTheDocument()
		expect(screen.getByText('all')).toBeInTheDocument()
		expect(screen.getByText('Clear completed')).toBeInTheDocument()
	})

	test('clears completed tasks', async () => {
		const user = userEvent.setup()
		render(<TasksListFooter {...defaultProps} />)

		await user.click(screen.getByText('Clear completed'))
		expect(mockClearCompleted).toHaveBeenCalledTimes(1)
	})

	test('changes filter type', async () => {
		const user = userEvent.setup()
		render(<TasksListFooter {...defaultProps} />)

		await user.click(screen.getByText('active'))
		expect(mockChangeFilterType).toHaveBeenCalledWith('active')
	})
})
