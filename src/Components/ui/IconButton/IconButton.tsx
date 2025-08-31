import React from 'react';
import { IconProp } from '@/types';
import * as styles from './IconButton.module.css';

interface IconButtonProps {
    onClick: () => void;
    icon: IconProp;
    ariaLabel: string;
    size?: number;
    color?: string;
    iconStyles?: React.CSSProperties;
}

const IconButton = ({
    onClick,
    icon: Icon,
    ariaLabel,
    size = 24,
    color = '#000',
    iconStyles = {},
}: IconButtonProps) => (
    <button onClick={onClick} aria-label={ariaLabel} className={styles.btn}>
        <Icon width={size} height={size} fill={color} style={iconStyles} />
    </button>
);
export default IconButton;
