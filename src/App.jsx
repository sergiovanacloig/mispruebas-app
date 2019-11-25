import React, { Component } from 'react';
import './App.scss';
import ConexionHeader from './components/conexion-header/conexion-header';
import Header from './components/header/header';
import CharactersList from './pages/characters/components/characters-list/characters-list';
import CharactersDetail from './pages/characters/components/characters-detail/characters-detail';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOnline: navigator.onLine
    };
    this.checkOfflineMode();
  }

  checkOfflineMode() {
    const self = this;
    window.addEventListener('load', function() {
      function updateOnlineStatus(event) {
        const isOnline = navigator.onLine;
        self.setState({ isOnline });
      }
    
      window.addEventListener('online',  updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);
    });
  }

  render() {
    return (
      <div className="app">
        {!this.state.isOnline ? <ConexionHeader /> : null}
        <Header />
        <Router>
          <Switch>
            <Route exact path="/" component={CharactersList} />
            <Route exact path="/:id" component={CharactersDetail} />
            <Route exact path="*" render={() => (<Redirect to="/" />)} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
