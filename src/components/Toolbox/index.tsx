import React from 'react';
import * as Theme from '../../theme';
import { style } from 'typestyle';


export class Toolbox extends React.Component {
    style: string = style({
        float: 'right',
        height: '100%',
        overflow: 'hidden',
        padding: '0px 5px',
        display: 'flex',
    });

    public render() {
        return (
            <div>
                <div className={this.style}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export class ToolboxItem extends React.Component {
    style: string = style({
        padding: '0px 20px',
        color: Theme.brandColorFont,
        $nest: {
            '&:hover': {
                color: Theme.brandColorFontAccent,
                backgroundColor: Theme.brandColorAccent,
            },
        },
    });

    public render() {
        return (
            <div className={this.style}>
                {this.props.children}
            </div>
        );
    }
}