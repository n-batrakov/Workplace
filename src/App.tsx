import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { Skeleton, Menu, Icon, Avatar, Badge, Popover } from 'antd';
import 'antd/dist/antd.css';
import { style } from 'typestyle';
import { HomePage, LeavesPage, NotFoundPage } from './pages';
import AppLayout from './components/Layout';


class MonospaceLogo extends React.PureComponent<{text: string}> {
    style: string = style({
        color: '#336699',
        fontSize: '25px',
        fontFamily: 'monospace',
        margin: '10px',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        $nest: {
            '&:hover': { 
                color: '#4488cc', 
            },
        },
    });

    public render() {
        return <div className={this.style}>{this.props.text}</div>;
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
                      defaultSelectedKeys={[this.getSelectedKey()]}>
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
        color: '#ffffff',
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
        padding: '0px 10px',
        minWidth: '50px',
        $nest: {
            '&:hover': {
                backgroundColor: '#11263a',
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
            <span style={{ marginRight: 24 }}>
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
                    <AccountMenuButton>
                        <AccountMenu/>
                    </AccountMenuButton>
                </AppToolboxItem>
            </AppToolbox>
        );

        const sider = (
            <div>
                <MonospaceLogo text="> workplace" />
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
