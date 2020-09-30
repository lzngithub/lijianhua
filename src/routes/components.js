
import React from 'react'
import Loadable from 'react-loadable' //路由按需加载
import { Spin } from 'antd'

const Login = Loadable({
    loader: () => import('@/views/Login'),
    loading() { return <Spin /> }
})


export default {
    Login,
  }