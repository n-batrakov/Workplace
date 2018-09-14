import React from "react";
import { Layout } from "antd";
const { Header, Sider, Content } = Layout;


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
                breakpoint="lg">
                
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
            <Content style={{ height: '100%' }}>
                {this.props.children}
            </Content>
        );
    }
}

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
            <Layout style={{ height: '100%' }}>

                <AppLayoutSider collapsed={this.state.sidebarCollapsed} 
                                onCollapse={this.onSidebarCollapse.bind(this)}>
                    {this.props.sider}
                </AppLayoutSider>
                <Layout>
                    <AppLayoutHeader>
                        {this.props.header}
                    </AppLayoutHeader>
                    <AppLayoutContent>
                        {this.props.content}
                    </AppLayoutContent>
                </Layout>
            </Layout>
        );
    }
}