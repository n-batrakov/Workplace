import React from 'react';
import { Calendar } from 'antd';

export default class LeavesPage extends React.Component {
    public render() {
        return (
            <div>
                <h1>Leaves</h1>
                <div style={{ 
                        backgroundColor: '#ffffff', 
                        padding: '20px',
                        marginBottom: '10px',
                        boxShadow: '#AAAAAA 0.1em 0.1em 5px' }}>
    
                        <Calendar />
                    </div>
            </div>
        );
    }
}