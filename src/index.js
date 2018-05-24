import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import Home from './components/Home';
import TopFive from './components/TopFive';
import Cart from './components/Cart';
import createHistory from 'history/createBrowserHistory';
import finalCreateStore from './stores/store';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';

const store = finalCreateStore();
const history = createHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/top_five" component={TopFive} />
        <Route exact path="/cart" component={Cart} />
      </div>
    </Router>
  </Provider>, 
  document.getElementById('root')
);
registerServiceWorker();
