import Tabs from '@/Components/ui/Tabs/Tabs'
import { FilterType } from '@/types'
import * as styles from './TasksListFooter.module.css'

interface ITasksListFooter {
	itemsLeft: number
	activeTab: FilterType
	changeFilterType: (type: FilterType) => void
	clearCompleted: () => void
}

const tabsValues: FilterType[] = ['all', 'active', 'completed']

const TasksListFooter = ({
	activeTab,
	changeFilterType,
	clearCompleted,
	itemsLeft,
}: ITasksListFooter) => {
	return (
		<div className={styles.footer}>
			<div className={styles.itemsLeft}>{itemsLeft} items left</div>
			<Tabs
				tabs={tabsValues}
				activeTab={activeTab}
				changeActiveTab={changeFilterType}
			/>
			<button className={styles.clearButton} onClick={clearCompleted}>
				Clear completed
			</button>
		</div>
	)
}

export default TasksListFooter
