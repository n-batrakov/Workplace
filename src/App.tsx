import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { Skeleton, Menu, Icon, Avatar, Badge, Popover } from 'antd';
import { style } from 'typestyle';
import { HomePage, LeavesPage, NotFoundPage } from './pages';
import AppLayout from './components/Layout';

import * as Theme from './theme';

class ThemeLogo extends React.PureComponent<{text: string}> {
    style: string = style({
        color: Theme.logoColor,
        font: Theme.logoFont,

        margin: '10px',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        $nest: {
            '&:hover': { 
                color: Theme.logoColorActive,
            },
        },
    });

    public render() {
        return <div className={this.style}>{Theme.logoText}</div>;
    }
}

class AppMenu extends React.Component {
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
                </Menu>
            </div>
        );
    }
}

class AppContent extends React.Component {

    style: string = style({
        padding: '10px',
        height: '100%',
    });

    public render() {
        return (
            <div className={this.style}>
                {this.props.children}
            </div>
        );
    }
}

class AppToolbox extends React.Component {
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

class AppToolboxItem extends React.Component {
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

class AccountMenuButton extends React.Component {
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
class AccountMenu extends React.Component {
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

class App extends React.Component {
    public render() {
        const header = (
            <AppToolbox>
                <AppToolboxItem>
                    <Icon type="search" />
                </AppToolboxItem>
                <AppToolboxItem>
                    <AccountMenuButton>
                        <AccountMenu/>
                    </AccountMenuButton>
                </AppToolboxItem>
            </AppToolbox>
        );

        const sider = (
            <div>
                <ThemeLogo text="> workplace" />
                <div className={style({ marginTop: '15px' })}>
                    <AppMenu />
                </div>
                
            </div>
        );

        const conentItem = (
            <div style={{ 
                backgroundColor: '#ffffff', 
                padding: '20px',
                marginBottom: '10px',
                boxShadow: '#AAAAAA 0.1em 0.1em 5px' }}>

                <Skeleton title={false} />
                <Skeleton title={false} />
            </div>
        );
        const content = (
            <AppContent>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/leave" component={LeavesPage}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </AppContent>
        );

        return (
            <BrowserRouter>
                <AppLayout header={header} sider={sider} content={content} />
            </BrowserRouter>
        );
    }
}

export default App;
