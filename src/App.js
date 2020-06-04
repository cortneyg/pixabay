import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Search from './components/search/Search';
import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Search />
          <button>Search</button>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

