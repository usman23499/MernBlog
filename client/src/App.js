import {BrowserRouter as Router, Route , Switch} from 'react-router-dom'
import './main.scss';
import Home from './components/home'
import Registration from './components/auth/registration'
import Login from './components/auth/login';
import Dashbord from './components/Dashbord';
import PrivateRoute from './components/private/PrivateRoutes';
import RouteLinks from './components/private/RouteLinks';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import  Store  from './Store';
function App() {

  return (
    <Provider store={Store}>
    <Router>
      <Navbar />
      <Switch>
        <RouteLinks path="/" exact component={Home} />
        <RouteLinks path="/registration" exact  component={Registration} />
        <RouteLinks path="/login" exact component={Login} />
        <PrivateRoute path="/dashbord" exact component={Dashbord} />

      </Switch>
    </Router>
    </Provider>
  );
}

export default App;
