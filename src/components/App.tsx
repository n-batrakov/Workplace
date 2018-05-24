import React from 'react';
import { style } from 'typestyle';
import { Todo, TodoItemValue } from './Todo';


export default () => {
    const getTimestamp = (n: number): Date => {
        const date = new Date();
        date.setDate(date.getDate() + n);
        return date;
    };
    const items: TodoItemValue[] = [{
        id: '1',
        text: 'First', 
        timestamp: getTimestamp(1),
        isCompleted: true,
    }, {
        id: '2',
        text: 'Second',
        timestamp: getTimestamp(2),
        isCompleted: false,
    }, {
        id: '3',
        text: 'Third',
        timestamp: getTimestamp(3),
        isCompleted: true,
    }, {
        id: '4',
        text: 'Fourth',
        timestamp: getTimestamp(4),
        isCompleted: false,
    }];

    return <Todo items={items} showCompleted={true} />;
};
