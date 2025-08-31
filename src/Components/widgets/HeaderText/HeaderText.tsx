import React from 'react';
import * as styles from './HeaderText.module.css';

interface IHeaderTextProps {
    text: string;
}

const HeaderText = ({ text }: IHeaderTextProps) => {
    return <h1 className={styles.header}>{text}</h1>;
};

export default React.memo(HeaderText);
