import { Badge, Popover, Avatar, Menu, Icon } from 'antd';
import React from 'react';


export class AccountMenuButton extends React.Component {
    public render() {
        return (
            <span>
                <Badge count={2}>
                    <Popover placement="bottomRight" content={this.props.children} trigger="click">
                        <Avatar shape="circle" icon="user" />
                    </Popover>
                </Badge>
            </span>
        );
    }
}

export class AccountMenu extends React.Component {
    public render() {
        return (
            <Menu style={{ border: 'none' }}>
                <Menu.Item><Icon type="bell"/>Notifications</Menu.Item>
                <Menu.Item><Icon type="setting"/>Settings</Menu.Item>
                <Menu.Divider />
                <Menu.Item><Icon type="logout"/>Logout</Menu.Item>
            </Menu>
        );
    }
}