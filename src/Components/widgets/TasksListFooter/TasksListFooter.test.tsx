import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TasksListFooter from './TasksListFooter';
import { FilterType } from '@/types';

const mockProps = {
    itemsLeft: 3,
    activeTab: 'all' as FilterType,
    changeFilterType: jest.fn(),
    clearCompleted: jest.fn(),
};

describe('TasksListFooter Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders correct items left count', () => {
        render(<TasksListFooter {...mockProps} />);
        expect(screen.getByText('3 items left')).toBeInTheDocument();
    });

    test('renders all filter tabs', () => {
        render(<TasksListFooter {...mockProps} />);
        expect(screen.getByRole('tab', { name: 'all' })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: 'active' })).toBeInTheDocument();
        expect(
            screen.getByRole('tab', { name: 'completed' }),
        ).toBeInTheDocument();
    });

    test('highlights active tab', () => {
        render(<TasksListFooter {...mockProps} activeTab="active" />);
        const activeTab = screen.getByRole('tab', { name: 'active' });
        expect(activeTab).toHaveAttribute('aria-selected', 'true');
    });

    test('calls changeFilterType when tab clicked', () => {
        render(<TasksListFooter {...mockProps} />);
        const completedTab = screen.getByRole('tab', { name: 'completed' });
        fireEvent.click(completedTab);
        expect(mockProps.changeFilterType).toHaveBeenCalledWith('completed');
    });

    test('renders clear completed button', () => {
        render(<TasksListFooter {...mockProps} />);
        expect(
            screen.getByRole('button', { name: 'Clear completed' }),
        ).toBeInTheDocument();
    });

    test('calls clearCompleted when button clicked', () => {
        render(<TasksListFooter {...mockProps} />);
        const clearButton = screen.getByRole('button', {
            name: 'Clear completed',
        });
        fireEvent.click(clearButton);
        expect(mockProps.clearCompleted).toHaveBeenCalled();
    });

    test('does not render clear button when no completed tasks', () => {
        render(<TasksListFooter {...mockProps} itemsLeft={0} />);
        expect(
            screen.queryByRole('button', { name: 'Clear completed' }),
        ).toBeInTheDocument();
    });

    test('matches snapshot', () => {
        const { container } = render(<TasksListFooter {...mockProps} />);
        expect(container).toMatchSnapshot();
    });
});
