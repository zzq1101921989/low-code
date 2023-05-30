import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from "@ant-design/icons/es/components/Icon";
import type { MenuProps } from "antd";
import { Layout, Menu, Space, theme } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { Link, Outlet, useLocation } from 'react-router-dom';
import { routerConfig } from '../../routers';
import styles from './index.module.less';

const PandaSvg = () => (
    <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
        <path
            d="M99.096 315.634s-82.58-64.032-82.58-132.13c0-66.064 33.032-165.162 148.646-148.646 83.37 11.91 99.096 165.162 99.096 165.162l-165.162 115.614zM924.906 315.634s82.58-64.032 82.58-132.13c0-66.064-33.032-165.162-148.646-148.646-83.37 11.91-99.096 165.162-99.096 165.162l165.162 115.614z"
            fill="#6B676E"
        />
        <path
            d="M1024 561.548c0 264.526-229.23 429.42-512.002 429.42S0 826.076 0 561.548 283.96 66.064 512.002 66.064 1024 297.022 1024 561.548z"
            fill="#FFEBD2"
        />
        <path
            d="M330.324 842.126c0 82.096 81.34 148.646 181.678 148.646s181.678-66.55 181.678-148.646H330.324z"
            fill="#E9D7C3"
        />
        <path
            d="M644.13 611.098C594.582 528.516 561.55 512 512.002 512c-49.548 0-82.58 16.516-132.13 99.096-42.488 70.814-78.73 211.264-49.548 247.742 66.064 82.58 165.162 33.032 181.678 33.032 16.516 0 115.614 49.548 181.678-33.032 29.18-36.476-7.064-176.93-49.55-247.74z"
            fill="#FFFFFF"
        />
        <path
            d="M611.098 495.484c0-45.608 36.974-82.58 82.58-82.58 49.548 0 198.194 99.098 198.194 165.162s-79.934 144.904-148.646 99.096c-49.548-33.032-132.128-148.646-132.128-181.678zM412.904 495.484c0-45.608-36.974-82.58-82.58-82.58-49.548 0-198.194 99.098-198.194 165.162s79.934 144.904 148.646 99.096c49.548-33.032 132.128-148.646 132.128-181.678z"
            fill="#6B676E"
        />
        <path
            d="M512.002 726.622c-30.06 0-115.614 5.668-115.614 33.032 0 49.638 105.484 85.24 115.614 82.58 10.128 2.66 115.614-32.944 115.614-82.58-0.002-27.366-85.556-33.032-115.614-33.032z"
            fill="#464655"
        />
        <path
            d="M330.324 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z"
            fill="#464655"
        />
        <path
            d="M693.678 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z"
            fill="#464655"
        />
    </svg>
);

const PandaIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={PandaSvg} {...props} />
);

export default function LayoutComponent() {

    const routerParams = useLocation();

    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const items: MenuProps["items"] = routerConfig.map((key, i) => ({
        key: key.path,
        type: 'group',
        label: <Link to={`/${key.path}`}>{key.name}</Link>,
    }));

    return (
        <Layout style={{minHeight: window.screen.height}}>
            <div className={styles['syd-header']}>
                <div className={styles.logo} >
                    <Space>
                        <PandaIcon style={{fontSize: '32px'}}/>
                        <div style={{fontWeight: "bold", fontSize: 18, color: '#6b6969'}}>随心搭</div>
                    </Space>
                </div>
                <Menu
                    style={{flex: 1}}
                    mode="horizontal"
                    defaultSelectedKeys={["0"]}
                    items={items}
                    onClick={(e) => {
                        console.log(e, 'e')
                    }}
                />
            </div>
            <Content style={{padding: 20}}>
                <Layout style={{padding: "24px 0", background: colorBgContainer}}>
                    <Content style={{padding: "0 24px", minHeight: 280}}>
                        <Outlet/>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{textAlign: "center"}}>穿搭没思路？不知道服装适不适合自己？那就上随心搭</Footer>
        </Layout>
    );
}
