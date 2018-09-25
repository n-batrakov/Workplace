import React from 'react';
import { Layout, Icon } from 'antd';
import { style } from 'typestyle';
const { Header, Sider, Content } = Layout;
import * as Theme from '../../theme';


export type AppLayoutProps = {
    sider: JSX.Element;
    header: JSX.Element;
    content: JSX.Element;
};

export default class AppLayout extends React.Component<AppLayoutProps> {
    state = {
        sidebarCollapsed: false,
    };

    onSidebarCollapse = (collapsed: boolean) => {
        this.setState({ sidebarCollapsed: collapsed });
    }

    public render() {
        return (
            <Layout style={{ height: '100%', overflow: 'hidden' }}>
                <AppLayoutHeader>
                    <AppLayoutCollapseButton 
                        onClick={() => this.onSidebarCollapse(!this.state.sidebarCollapsed)} />
                    {this.props.header}
                </AppLayoutHeader>
                <Layout>
                    <AppLayoutSider collapsed={this.state.sidebarCollapsed} 
                                    onCollapse={this.onSidebarCollapse.bind(this)}>
                        {this.props.sider}
                    </AppLayoutSider>
                    
                    <AppLayoutContent>
                        {this.props.content}
                    </AppLayoutContent>
                </Layout>
            </Layout>
        );
    }
}

type AppLayoutSiderProps = {
    collapsed: boolean;
    onCollapse: (collapsed: boolean) => void;
};
class AppLayoutSider extends React.Component<AppLayoutSiderProps> {
    public render() {
        return (
                <Sider
                    collapsible
                    collapsed={this.props.collapsed}
                    onCollapse={this.props.onCollapse}
                    collapsedWidth={0}
                    trigger={null}
                    breakpoint="sm">
                    
                    {this.props.children}
                </Sider>
        );
    }
}

class AppLayoutHeader extends React.Component {
    public render() {
        return (
            <Header style={{ padding: '0px' }}>
                {this.props.children}
            </Header>
        );
    }
}

class AppLayoutContent extends React.Component {
    public render() {
        return (
            <Content style={{ overflow: 'auto' }}>
                {this.props.children}
            </Content>
        );
    }
}

class AppLayoutCollapseButton extends React.Component<{onClick: () => void}> {

    styles = style({
        position: 'absolute',
        background: 'none',
        color: Theme.brandColorFont,
        border: 'none',
        fontSize: 30,
        outline: 'none',
        cursor: 'pointer',
        margin: '0 15px',
        $nest: {
            '&:hover': {
                color: Theme.brandColorFontAccent,
            },
        },
    });

    public render() {
        return (
            <button className={this.styles} onClick={this.props.onClick}>
                <Icon type="bars" />
            </button>
        );
    }
}