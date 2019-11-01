import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, useParams, useHistory, useLocation } from 'react-router-dom';

const Home = () => <>
  <h1>Home</h1>
  <nav><ul>
    <li><Link to="/about">About</Link></li>
    <li><Link to="/about/23">About 23</Link></li>
  </ul></nav>
</>;

const About = () => {
  const { id } = useParams();
  const history = useHistory();
  return <>
    <h1>About {id}</h1>
    <nav><ul>
      <li><Link to="/">Home</Link></li>
    </ul></nav>
    <button type="button" onClick={() => history.push('/')}>Home</button>
  </>;
};

const App = () => {

  console.log(window.location.href);
  
  return <>
  <h1>The App</h1>
    <Switch>
      <Route path="/" exact><Home /></Route>
      <Route path="/about" exact><About /></Route>
      <Route path="/about/:id"><About /></Route>
    </Switch>

    {window.location.href.startsWith('http://localhost:3000/about') && <About />}
  </>;
}

ReactDOM.render(
  <Router><App /></Router>,
  document.querySelector('#root'),
);
