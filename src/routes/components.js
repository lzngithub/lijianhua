
import React from 'react'
import Loadable from 'react-loadable' //路由按需加载
import { Spin } from 'antd'

const Login = Loadable({
    loader: () => import('@/views/Login'),
    loading() { return <Spin /> }
})

const Home = Loadable({
    loader: () => import('@/views/Home'),
    loading() { return <Spin /> }
});

const User = Loadable({
    loader: () => import('@/views/User'),
    loading() { return <Spin /> }
});

const Layout = Loadable({
    loader: () => import('@/views/Layout'),
    loading() { return <Spin /> }
});

export default {
    Login,
    Home,
    Layout,
    User
  }