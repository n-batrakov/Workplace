import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';


export default class AppMenu extends React.Component {
    private getSelectedKey(): string {
        return window.location.pathname;
    }

    public render() {
        return (
            <div>
                <Menu theme="dark"
                      mode="inline" 
                      defaultSelectedKeys={[this.getSelectedKey()]}
                      style={{ border: 'none' }}>
                    <Menu.Item key="/">
                        <Link to="/">
                            <Icon type="home" />
                            <span className="nav-text">Home</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/leave">
                        <Link to="/leave">
                            <Icon type="calendar" />
                            <span className="nav-text">Leaves</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/team">
                        <Link to="/team">
                            <Icon type="team" />
                            <span className="nav-text">Team</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}