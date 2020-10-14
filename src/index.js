import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'antd'
import { HashRouter,BrowserRouter } from 'react-router-dom'
import { renderRoutes } from "react-router-config"
import routes from '@/routes'
import http from '@/utils/http'
import './index.less';
import '@/style/index.scss'

React.$http = http;

ReactDOM.render(
  // <React.StrictMode>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById('root')
);
