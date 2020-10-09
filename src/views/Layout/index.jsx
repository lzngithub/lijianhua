import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import { Layout, Menu, Breadcrumb, Avatar, Dropdown, Button } from 'antd'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    HomeOutlined,
    SettingOutlined,
    CodepenCircleOutlined,
    DownOutlined,
    ReadOutlined,
    FileTextOutlined
  } from '@ant-design/icons';


import './index.scss'
const { Header, Sider, Content } = Layout;
const {Item, SubMenu} = Menu;

class _Layout extends React.Component {
    constructor(props){
        super();
        this.state = {
            title: '后台管理系统',
        }
        
    }

    render() {
        const { route } = this.props;
        const { title } = this.state;
        return (
            <BrowserRouter>
                <Layout className="layout-container">
                    <Sider>
                        <div className="logo">
                            <CodepenCircleOutlined className="icon"></CodepenCircleOutlined>
                            <span>{title}</span>
                        </div>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                            <Item key="home" icon={<HomeOutlined />}>
                                首页
                            </Item>
                            <SubMenu key="user-menu" icon={<UserOutlined />} title="用户管理">
                                <Item key="user">用户列表</Item>
                                <Item key="roles">角色管理</Item>
                            </SubMenu>
                            <SubMenu key="article-menu" title={
                                <span>
                                    <FileTextOutlined />
                                    <span>文章管理</span>
                                </span>
                            }>
                                <Menu.Item key="articles">文章列表</Menu.Item>
                                <Menu.Item key="category">文章分类</Menu.Item>
                                <Menu.Item key="comments">文章评论</Menu.Item>
                            </SubMenu>
                            <Menu.SubMenu
                                key="community"
                                title={
                                    <span>
                                    <ReadOutlined />
                                    <span>社区管理</span>
                                    </span>
                                }
                                >
                                <Menu.Item key="message">消息中心</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu
                                key="setting-menu"
                                title={
                                    <span>
                                    <SettingOutlined />
                                    <span>设置管理</span>
                                    </span>
                                }
                            >
                                <Menu.ItemGroup key="system-setting" title="系统设置">
                                    <Menu.Item key="website-setting">网站设置</Menu.Item>
                                    <Menu.Item key="email-service">邮件服务</Menu.Item>
                                </Menu.ItemGroup>
                                <Menu.ItemGroup key="user-setting" title="我的设置">
                                    <Menu.Item key="basic-info">基本资料</Menu.Item>
                                    <Menu.Item key="modify-password">修改密码</Menu.Item>
                                </Menu.ItemGroup>
                            </Menu.SubMenu>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header>
                            
                        </Header>
                    </Layout>
                </Layout>
            </BrowserRouter>
        )
    }
}

export default _Layout