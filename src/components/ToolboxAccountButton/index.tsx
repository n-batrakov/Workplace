import { Badge, Popover, Avatar, Menu, Icon } from 'antd';
import React from 'react';


export class AccountMenuButton extends React.Component {
    public render() {
        return (
            <Popover placement="bottomRight" content={this.props.children}>
                <span>
                    <Badge count={2}>
                        <Avatar shape="circle" icon="user" />
                    </Badge>
                </span>
            </Popover>
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