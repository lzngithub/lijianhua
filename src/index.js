import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd'
import { HashRouter,BrowserRouter } from 'react-router-dom'
import { renderRoutes } from "react-router-config"
import { Switch } from 'react-router-dom'
import routes from '@/routes'
import http from '@/utils/http'
import './index.less';
import '@/style/index.scss'

React.$http = http;

ReactDOM.render(
  <ConfigProvider>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </ConfigProvider>,
  document.getElementById('root')
);
