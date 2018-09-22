import React from 'react';
import { Skeleton } from 'antd';
import ContentContainer from '../../components/ContentContainer';

export default class HomePage extends React.Component {
    public render() {

        return (
            <div>
                <h1>Home</h1>
                <ContentContainer>
                    <Skeleton active title={false} />
                    <Skeleton active title={false} />
                    <Skeleton active title={false} />
                </ContentContainer>
                <ContentContainer>
                    <Skeleton active title={false} />
                    <Skeleton active title={false} />
                    <Skeleton active title={false} />
                    <Skeleton active title={false} />
                    <Skeleton active title={false} />
                    <Skeleton active title={false} />
                    <Skeleton active title={false} />
                </ContentContainer>
            </div>
        );
    }
}