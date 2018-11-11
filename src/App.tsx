import React from 'react';
import { 
    BrowserRouter as Router, 
    Route, 
    Switch, 
    Link } from 'react-router-dom';
import { Icon, Menu } from 'antd';

import Layout from './components/Layout';
import { Toolbox, ToolboxItem } from './components/Toolbox';
import { AccountMenuButton, AccountMenu } from './components/ToolboxAccountButton';
import Content from './components/Content';

import { NotFoundPage } from './components/Pages';
import { PagesProvider } from './pagesProvider';
import { PageInfo } from './core/types';






class PageMenu extends React.Component<{pages: PageInfo[]}> {
    public render() {
        const items = this.props.pages.map(x => (
            <Menu.Item key={x.route}>
                <Link to={x.route}>
                    <Icon type={x.icon} />
                    <span className="nav-text">{x.title}</span>
                </Link>
            </Menu.Item>
        ));

        return (
            <Menu theme="dark"
                  mode="inline" 
                  defaultSelectedKeys={[this.getActiveMenuItemKey()]}
                  style={{ border: 'none' }}>
                {items}
            </Menu>
        );
    }

    private getActiveMenuItemKey(): string {
        return window.location.pathname;
    }
}

class PageConent extends React.Component<{pages: PageInfo[]}> {
    public render() {
        const routes = this.props.pages
            .map((x, i) => (
                <Route 
                    key={i} 
                    path={x.route} 
                    exact={x.route === '/'} 
                    component={x.component} />
            ))
            .concat([
                <Route key={404} component={NotFoundPage}/>,
            ]);

        return (<Content><Switch>{routes}</Switch></Content>);
    }
}

export default class App extends React.Component {
    public render() {
        const pagesProvider = new PagesProvider();
        const pages = pagesProvider.getPages();
        
        const header = this.renderHeader();
        const sider = <PageMenu pages={pages} />;
        const content = <PageConent pages={pages} />;

        return (
            <Router>
                <Layout header={header} sider={sider} content={content} />
            </Router>
        );
    }

    private renderHeader() {
        return (
            <Toolbox>
                <ToolboxItem>
                    <Icon type="search" />
                </ToolboxItem>
                <ToolboxItem>
                    <AccountMenuButton>
                        <AccountMenu/>
                    </AccountMenuButton>
                </ToolboxItem>
            </Toolbox>);
    }
}