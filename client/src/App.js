import {BrowserRouter as Router, Route , Switch} from 'react-router-dom'
import './main.scss';
import Home from './components/home'
import Registration from './components/auth/registration'
import Login from './components/auth/login'
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/registration"  component={Registration} />
        <Route path="/login"  component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
