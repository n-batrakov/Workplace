import { style } from 'typestyle';
import React from 'react';

export default class ContentContainer extends React.Component {
    style = style({
        backgroundColor: '#ffffff', 
        padding: '20px',
        marginBottom: '10px',
        boxShadow: '#AAAAAA 0.1em 0.1em 5px',
    });

    public render() {
        return (
            <div className={this.style}>
                {this.props.children}
            </div>
        );
    }
}