import React from 'react';
import { style } from 'typestyle';
import Todo from './Todo/todo';

interface TitleState {
    message: string;
}

class Title extends React.Component<TitleState> {
    private style = style({
        color: 'red',
    });

    public render() {
        return <h1 className={ this.style }>{ this.props.message }</h1>;
    }
}



export default () => {
    const timestamp = new Date();
    const getTimestamp = (n: number): Date => {
        const newDate = new Date(timestamp);
        newDate.setDate(timestamp.getDate() + n);
        return newDate;
    };
    const items = [{
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
