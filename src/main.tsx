import *as React from 'react'
import *as ReactDOM from 'react-dom'

import './test.css'

import {
  HashRouter,
  Route,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { configStore } from './store'

import { App } from './app'

const MOUNT_ROOT = document.getElementById('app')

ReactDOM.render(
  <Provider store={configStore}>
    <HashRouter>
      <div>
        <Route exact component={App} />
      </div>
    </HashRouter>
  </Provider>,
  MOUNT_ROOT
)