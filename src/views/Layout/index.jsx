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
const {Item, SubMenu, Divider} = Menu;

const mapMenu = [
    { key: 'home', name: '首页' },
    { key: 'user', name: '用户列表', parentName: '用户管理', parentKey: 'user-menu' },
    { key: 'roles', name: '角色管理', parentName: '用户管理', parentKey: 'user-menu' },
    { key: 'articles', name: '文章列表', parentName: '文章管理', parentKey: 'article-menu' },
    { key: 'category', name: '文章分类', parentName: '文章管理', parentKey: 'article-menu' },
    { key: 'comments', name: '文章评论', parentName: '文章管理', parentKey: 'article-menu' },
    { key: 'message', name: '消息中心', parentName: '社区管理', parentKey: 'community' },
    { key: 'website-setting', name: '网站设置', parentName: '设置管理', parentKey: 'setting-menu' },
    { key: 'email-service', name: '邮件服务', parentName: '设置管理', parentKey: 'setting-menu' },
    { key: 'basic-info', name: '基本资料', parentName: '设置管理', parentKey: 'setting-menu' },
    { key: 'modify-password', name: '修改密码', parentName: '设置管理', parentKey: 'setting-menu' },
  ]

class _Layout extends React.Component {
    constructor(props){
        super(props);
        const currentPath = this.splitPath();
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || {};
        const openKeys = this.handleFindOpenMenu(currentPath);
        this.state = {
            title: '后台管理系统',
            collapsed: false,
            userInfo,
            breadcrumb: openKeys.breadcrumb,
            selectedKeys: [currentPath],
            defaultOpenKeys: [openKeys.menuKey]
        }
        
    }
    splitPath = () => {
        console.log(this.props);
        const { location } = this.props
        console.log(location);
        return location.pathname.substr(1)
      }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            title: this.state.collapsed ? '后台管理系统' : '',
        });
    }
    handleFindOpenMenu = (selectedKeys) => {
        const findMenu = mapMenu.find(subMenu => subMenu.key === selectedKeys)
        let breadcrumb = []
        breadcrumb.push(findMenu.parentName, findMenu.name)
        console.log(breadcrumb);
        breadcrumb = breadcrumb.filter(v => v)
        return {
          menuKey: findMenu && findMenu.parentKey,
          subMenu: findMenu && findMenu.key,
          breadcrumb
        }
    }
    handleRouter = (item) => {
        const { history } = this.props
        console.log(item);
        console.log(this.props);
        const findMenu = mapMenu.find(subMenu => subMenu.key === item.key)
        let breadcrumb = []
        breadcrumb.push(findMenu.parentName, findMenu.name)
        breadcrumb = breadcrumb.filter(v => v)
        this.setState({
          selectedKeys: [item.key],
          breadcrumb
        }, () => {
          history.push(item.key)
        })
      }
    render() {
        const { route } = this.props;
        console.log(route);
        const { collapsed,title, userInfo, breadcrumb, selectedKeys, defaultOpenKeys } = this.state;

        const userDropdownMenu = (
            <Menu>
                <Item>
                    基本资料
                </Item>
                <Item>
                    修改密码
                </Item>
                <Divider />
                <Item>
                    退出
                </Item>
            </Menu>
        )

        return (
            <BrowserRouter>
                <Layout className="layout-container">
                    <Sider trigger={null} collapsible collapsed={collapsed}>
                        <div className="logo">
                            <CodepenCircleOutlined className="icon"></CodepenCircleOutlined>
                            <span>{title}</span>
                        </div>
                        <Menu theme="dark" mode="inline"
                            selectedKeys={selectedKeys}
                            defaultOpenKeys={defaultOpenKeys}
                            onClick={this.handleRouter}>
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
                    <Layout className="site-layout">
                        <Header className="layout-header bg-white">
                            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: "trigger",
                                onClick: this.toggle,
                            })}
                            <div className="header-right">
                                <div className="info mr-20">
                                    <Avatar src={userInfo.avatar} />
                                    <Dropdown overlay={userDropdownMenu}
                                    trigger="['click']"
                                    getPopupContainer={() => document.getElementsByClassName('info')[0]}>
                                    <Button type="link" className='btn-user'>
                                        {userInfo.username}<DownOutlined />
                                    </Button>
                                    </Dropdown>
                                </div>
                            </div>
                        </Header>
                        <Content className='layout-content'>
                            <Breadcrumb className='layout-nav'>
                            {breadcrumb.map((item, index) => <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)}
                            </Breadcrumb>
                            <div className='layout-content--info'>
                            {renderRoutes(route.routes)}
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </BrowserRouter>
        )
    }
}

export default _Layout