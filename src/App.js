import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import listContact from './pages/listContact';
import postContact from './pages/postContact';
import editContact from './pages/editContact';
import configureStore from './redux/configureStore'
const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={listContact} />
          <Route path="/add" component={postContact} />
          <Route path="/edit/:id?" component={editContact} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
