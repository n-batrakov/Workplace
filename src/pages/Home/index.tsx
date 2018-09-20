import React from 'react';
import { Skeleton } from 'antd';

export default class HomePage extends React.Component {
    public render() {
        return (
            <div>
                <h1>Home</h1>
                <div style={{ 
                        backgroundColor: '#ffffff', 
                        padding: '20px',
                        marginBottom: '10px',
                        boxShadow: '#AAAAAA 0.1em 0.1em 5px' }}>

                        <Skeleton title={false} />
                        <Skeleton title={false} />
                </div>
            </div>
        );
    }
}