import React from 'react'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'


import './index.scss'

class Layout extends React.Component {
    constructor(){
        super();
    }

    render() {
        const { route } = this.props
        return (
            <div>
                layout
                <div>
                {renderRoutes(route.routes)}
                </div>
            </div>
        )
    }
}

export default Layout