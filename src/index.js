import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'antd'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from "react-router-config"
import routes from '@/routes'
import './index.less';

ReactDOM.render(
  <React.StrictMode>
      <HashRouter>
        {renderRoutes(routes)}
      </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
