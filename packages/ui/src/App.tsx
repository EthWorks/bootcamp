import React from 'react'
import { Form } from '../learning/Form'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Home } from './pages/Home'

export function App() {
  return (
    <Switch>
      <Route exact path="/home" component={Home} />
      <Redirect exact path="/" to="/home" />
    </Switch>
  )
}
