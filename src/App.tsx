import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Icon } from 'antd';

import Layout from './components/Layout';
import Menu from './components/Menu';
import Logo from './components/ThemeLogo';
import { Toolbox, ToolboxItem } from './components/Toolbox';
import { AccountMenuButton, AccountMenu } from './components/ToolboxAccountButton';
import Content from './components/Content';

import { NotFoundPage } from './pages';
import HomePage from './pages/Home';
import LeavesPage from './pages/Leaves';


export default class App extends React.Component {
    public render() {
        const header = (
            <Toolbox>
                <ToolboxItem>
                    <Icon type="search" />
                </ToolboxItem>
                <ToolboxItem>
                    <AccountMenuButton>
                        <AccountMenu/>
                    </AccountMenuButton>
                </ToolboxItem>
            </Toolbox>
        );

        const sider = (
            <div>
                <Logo />
                <div style={{ marginTop: '15px' }}>
                    <Menu />
                </div>
                
            </div>
        );

        const content = (
            <Content>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/leave" component={LeavesPage}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </Content>
        );

        return (
            <Router>
                <Layout header={header} sider={sider} content={content} />
            </Router>
        );
    }
}