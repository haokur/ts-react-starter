import *as React from 'react'

import {
  Route
} from 'react-router-dom'

import { configs } from './configs'

export class AppRoute extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        {
          configs.map((route, i) => (
            route.exact
              ? <Route exact path={route.path} key={i} component={route.component}></Route>
              : <Route path={route.path} key={i} component={route.component}></Route>
          ))
        }
      </div>
    )
  }
}

