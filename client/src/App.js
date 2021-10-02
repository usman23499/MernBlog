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
import Edit from './components/Edit';
import EditImage from './components/EditImage';
import UpdateName from './components/UpdateName';
import ChangePassword from './components/ChangePassword';
import Details from './components/Details';
function App() {

  return (
    <Provider store={Store}>
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} /> 
        {/* sab home ko acess karsaket hain not login and login wale */}
				<Route path='/home/:page' exact component={Home} />
        {/* ye us ke lae when paginagtion in home 2 ect like ek page pe sarif 6 post dipaly hai */}
					<Route path='/details/:id' exact component={Details} />

        <RouteLinks path="/registration" exact  component={Registration} />
        <RouteLinks path="/login" exact component={Login} />
        <PrivateRoute path="/dashbord/:page?" exact component={Dashbord} />
        <PrivateRoute path='/edit/:id' exact component={Edit} />
					<PrivateRoute path='/updateImage/:id' exact component={EditImage} />

        <PrivateRoute path="/create" exact component={Create} />

        <PrivateRoute path='/updateName' exact component={UpdateName} />

        <PrivateRoute
						path='/updatePassword'
						exact
						component={ChangePassword}
					/>

        <Route component={NotFound} /> 
        {/* end main is lea take jab koe route not match tu ye chale */}
      </Switch>
    </Router>
    </Provider>
  );
}

export default App;
