import React from 'react';
import { Table, Row, Col, Card, Icon, Tabs, Radio, Spin, Avatar } from 'antd';
import ContentContainer from '../../components/ContentContainer';
import { RadioChangeEvent } from 'antd/lib/radio';
import { ErrorPage } from '../../components/Pages';


type Employee = {
    key: string,
    name: string,
    position: string,
    birthdate: string,
    avatar?: string,
};

class EmployeeTable extends React.Component<{ data: Employee[] }> {
    metadata = [{
        dataIndex: 'avatar',
        key: 'avatar',
        render: (x:string) => <Avatar src={x} />,
    },{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },{
        title: 'Position',
        dataIndex: 'position',
        key: 'position',
    },{
        title: 'Birthdate',
        dataIndex: 'birthdate',
        key: 'birthdate',
    }];

    public render() {
        return <Table columns={this.metadata} dataSource={this.props.data} />;
    }
}

class EmployeeCards extends React.Component<{ data: Employee[] }> {
    public render() {
        const grid = this.breakIntoGropusOf(this.props.data, 3)
            .map((row, ri) => (
                <Row gutter={8} key={ri}>
                    {
                        row.map((x, ci) => (
                            <Col span={8} key={ci}>
                                {this.getCard(x)}
                            </Col>
                        ))
                    }
                </Row>
            ));

        return grid;
    }

    private getCard(employee: Employee) {
        return (
            <Card
                hoverable
                style={{  marginTop: 16 }}
                cover={<img src={employee.avatar} />}
                actions={[
                    <Icon type="setting" />, 
                    <Icon type="edit" />, 
                    <Icon type="ellipsis" />]}>
                <Card.Meta 
                    title={employee.name}
                    description={`${employee.position} | ${employee.birthdate}`} />
            </Card>
        );
    }

    private breakIntoGropusOf<T>(data: T[], n: number): T[][] {
        return data
            .filter((_, i) => i % n === 0)
            .map((_, i) => {
                const idx = i * n;
                return data.slice(idx, idx + n)
            });
    }
}

class EmpployeesTab extends React.Component {
    state = {
        view: 'table',
        isLoading: true,
        isError: false,
        data: [],
    };

    public componentDidMount() {
        setTimeout(
            () => {
                this.setState({
                    isLoading: false,
                    data: Array(50).fill(null).map((_, i) => ({
                        key: i.toString(),
                        name: `User#${i}`,
                        birthdate: '1993-03-12',
                        position: 'Software Engenier',
                        avatar: '/images/avatar.png',
                    })),
                });
            },
            2e3);
    }

    public render() {
        if (this.state.isLoading) {
            return <Spin size="large" />;
        }

        if (this.state.isError) {
            return <ErrorPage />;
        }

        return (
            <div>
                <Radio.Group value={this.state.view} onChange={this.onViewChange.bind(this)}>
                    <Radio.Button value="cards">Cards</Radio.Button>
                    <Radio.Button value="table">Table</Radio.Button>
                </Radio.Group>
                {this.getView()}
            </div>
        );
    }

    private getView() {        
        switch (this.state.view) {
            case 'table':
                return <EmployeeTable data={this.state.data} />;
            case 'cards':
                return <EmployeeCards data={this.state.data} />;
            default:
                console.error(`Team.Employee: Unkown view '${this.state.view}'`);
                return <EmployeeCards data={this.state.data} />;
        }
    }

    private onViewChange(e: RadioChangeEvent) {
        this.setState({ view: e.target.value });
    }
}

class TeamsTab extends React.Component {
    public render() {
        return <h2>Teams tab content</h2>;
    }
}

export default class TeamPage extends React.Component {
    public render() {
        return (
            <div>
                <h1>Team</h1>
                <Tabs defaultActiveKey="employees">
                    <Tabs.TabPane tab="Employees" key="employees">
                        <ContentContainer>
                            <EmpployeesTab />
                        </ContentContainer>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Teams" key="teams">
                        <ContentContainer>
                            <TeamsTab />
                        </ContentContainer>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        );
    }
}