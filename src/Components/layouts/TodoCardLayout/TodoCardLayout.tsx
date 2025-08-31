import * as styles from './TodoCardLayout.module.css';
import { LayoutProps } from '@/types';

const TodoCardLayout = ({ children }: LayoutProps) => {
    return <div className={styles.TodoCardWrapper}>{children}</div>;
};

export default TodoCardLayout;
