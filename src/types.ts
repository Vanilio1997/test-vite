import * as React from 'react';

export interface LayoutProps {
    children: React.ReactNode;
}

export type IconProp = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export interface ISVGIcon {
    icon: IconProp;
    style?: React.CSSProperties;
    color?: string;
}

export interface ITask {
    isCompleted: boolean;
    text: string;
    id: number;
}

export type handleStatusTaskChangeType = (index: number) => void;

export type DeleteTaskType = (type: ITask) => void;

export type ChangeTaskTextType = (index: number, newText: string) => void;

export type FilterType = 'all' | 'active' | 'completed';
