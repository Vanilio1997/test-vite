import React from 'react';

import TasksListElement from '../TasksListElement';

import {
    ITask,
    handleStatusTaskChangeType,
    DeleteTaskType,
    ChangeTaskTextType,
} from '@/types';

import * as styles from './TasksList.module.css';

interface ITaskList {
    tasks: ITask[];
    onChangeStatus: handleStatusTaskChangeType;
    onChangeText: ChangeTaskTextType;
    onTaskDelete: DeleteTaskType;
}

const TasksList = ({
    tasks,
    onChangeStatus,
    onChangeText,
    onTaskDelete,
}: ITaskList) => {
    return (
        <ul className={styles.list}>
            {tasks.map((task, index) => (
                <TasksListElement
                    key={task.id}
                    task={task}
                    onChangeStatus={onChangeStatus}
                    index={index}
                    onChangeText={onChangeText}
                    onTaskDelete={onTaskDelete}
                />
            ))}
        </ul>
    );
};

export default React.memo(TasksList);
