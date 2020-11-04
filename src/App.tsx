import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Link,
  Switch,
  Redirect,
  useLocation

} from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';

import Admin from './pages/admin'
import Mobile from './pages/mobile'
import NotFound from './pages/notFound'
function App() {
  
  return (
    <Router>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/mobile" component={Mobile}/>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React GGG
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
