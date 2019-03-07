import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

import Home from './pages/Home'
import About from './pages/About'

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/ueber-uns" component={About} />
        </Switch>
      </main>
      <Footer />
    </>
  )
}

export default App
