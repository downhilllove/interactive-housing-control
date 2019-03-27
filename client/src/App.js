import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

import Home from './pages/Home'
import About from './pages/About'
import Overview from './pages/Overview'

const App = () => (
  <>
    <Header />
    <main>
      <Switch>
        <Route path="/uebersicht" component={Overview} />
        <Route path="/ueber-uns" component={About} />
        <Route path="/" component={Home} />
      </Switch>
    </main>
    <Footer />
  </>
)

export default App
