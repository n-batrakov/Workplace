import React from 'react';
import { style } from 'typestyle';

export default class AppContent extends React.Component {

    style: string = style({
        padding: '10px',
        height: '100%',
        overflow: 'auto',
    });

    public render() {
        return (
            <div className={this.style}>
                {this.props.children}
            </div>
        );
    }
}