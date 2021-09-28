import {BrowserRouter as Router, Route , Switch} from 'react-router-dom'
import './main.scss';
import Home from './components/home'
import Registration from './components/auth/registration'
import Login from './components/auth/login';
import Dashbord from './components/Dashbord';
import NotFound from './components/NotFound';
import PrivateRoute from './components/private/PrivateRoutes';
import RouteLinks from './components/private/RouteLinks';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import  Store  from './Store';
import Create from './components/create';
function App() {

  return (
    <Provider store={Store}>
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} /> 
        {/* sab home ko acess karsaket hain not login and login wale */}
        
        <RouteLinks path="/registration" exact  component={Registration} />
        <RouteLinks path="/login" exact component={Login} />
        <PrivateRoute path="/dashbord/:page?" exact component={Dashbord} />
        <PrivateRoute path="/create" exact component={Create} />
        <Route component={NotFound} /> 
        {/* end main is lea take jab koe route not match tu ye chale */}
      </Switch>
    </Router>
    </Provider>
  );
}

export default App;
