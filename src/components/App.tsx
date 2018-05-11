import React from 'react';
import { style } from 'typestyle';

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
    return <Title message="hello"/>;
};
