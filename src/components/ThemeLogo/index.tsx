import { style } from 'typestyle';
import * as Theme from '../../theme';
import React from 'react';


export default class ThemeLogo extends React.PureComponent {
    style: string = style({
        color: Theme.logoColor,
        font: Theme.logoFont,

        margin: '10px 20px',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        $nest: {
            '&:hover': { 
                color: Theme.logoColorActive,
            },
        },
    });

    public render() {
        const hasImage = Theme.logoImage === undefined || 
                         Theme.logoImage === null || 
                         Theme.logoImage === '';
        const image = hasImage
            ? null 
            : <img src={Theme.logoImage} 
                   style={{ width: '35px', marginRight: '15px' }} />;

        return <div className={this.style}>
            {image}
            {Theme.logoText}
        </div>;
    }
}