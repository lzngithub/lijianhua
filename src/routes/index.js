import React from 'react'
import { Redirect } from 'react-router-dom'

import RouteComponents from './components'

function getToken() {
  return sessionStorage.getItem('token')
}

const routes = [
    {
      path: '/login',
      requiredAuth: false,
      // component: AsyncComponent(() => import('@/views/Login'))
      component: RouteComponents.Login
    },
    {
      render: (props) => {
        const token = getToken()
        if (!token) {
          return <Redirect to="/login" />
        }
  
        return <RouteComponents.Layout {...props} />
      },
      requiredAuth: true,
      routes: [
        {
          path: '/',
          exact: true,
          render: () => <Redirect to="/home" />
        },
        {
          path: '/home',
          requiredAuth: true,
          // component: AsyncComponent(() => import('@/views/Home'))
          // component: Loadable({ loader: () => import('@/views/Home'), loading() { return <Spin /> }})
          component: RouteComponents.Home
        }
      ]
    }
  ]
  
  export default routes