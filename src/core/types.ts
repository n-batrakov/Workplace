import { RouteComponentProps } from 'react-router';

export type PageInfo = {
    title: string;
    icon: string;
    route: string;
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
};