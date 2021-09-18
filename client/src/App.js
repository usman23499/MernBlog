import {BrowserRouter as Router, Route , Switch} from 'react-router-dom'
import './main.scss';
import Home from './components/home'
import Registration from './components/auth/registration'
import Login from './components/auth/login';
import Dashbord from './components/Dashbord';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import  Store  from './Store';
function App() {

  return (
    <Provider store={Store}>
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/registration"  component={Registration} />
        <Route path="/login"  component={Login} />
        <Route path="/dashbord"  component={Dashbord} />

      </Switch>
    </Router>
    </Provider>
  );
}

export default App;
