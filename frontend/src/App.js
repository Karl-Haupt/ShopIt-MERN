import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { useSelector } from 'react-redux';

//Payment
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './App.css';

import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer';

import Home from './Components/Home';
import ProductDetails from './Components/Product/ProductDetails';

//Auth imports
import Login from './Components/User/Login';
import Register from './Components/User/Register';
import Profile from './Components/User/Profile';
import UpdateProfile from './Components/User/UpdateProfile';
import UpdatePassword from './Components/User/UpdatePassword';
import ForgotPassword from './Components/User/ForgotPassword';
import NewPassword from './Components/User/NewPassword';

//Cart imports
import Cart from './Components/Cart/Cart';
import Shipping from './Components/Cart/Shipping';
import ConfirmOrder from './Components/Cart/ConfirmOrder';
import Payment from './Components/Cart/Payment';
import OrderSuccess from './Components/Cart/OrderSuccess';

//Order imports
import ListOrders from './Components/Order/ListOrders';
import OrderDetails from './Components/Order/OrderDetails';

//Admin imports
import Dashboard from './Components/Admin/Dashboard';
import ProductList from './Components/Admin/ProductList';
import NewProduct from './Components/Admin/NewProduct';
import UpdateProduct from './Components/Admin/UpdateProduct';
import OrdersList from './Components/Admin/OrdersList';
import ProcessOrder from './Components/Admin/ProcessOrder';
import UsersList from './Components/Admin/UsersList';
import UpdateUser from './Components/Admin/UpdateUser';
import ProductReviews from './Components/Admin/ProductReviews';
import PromoteProduct from './Components/Admin/PromoteProduct';

//Analytics
import AdminAnalytics from './Components/Analytics/AdminAnalytics';

import ProtectedRoute from './Components/route/ProtectedRoute';
import { loadUser } from './Actions/userActions';
import store from './store';
import axios from 'axios';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser())

    async function getStripeApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');

      setStripeApiKey(data.stripeApiKey)
    }

    getStripeApiKey();

  }, [])

  const { user, isAuthenticated, loading } = useSelector(state => state.auth);

  return (
    <Router>
      <div className="App">
        <Header />

        <div className="container container-fluid">

          <Route path = "/" component={Home} exact/>
          <Route path = "/search/:keyword" component={Home} />
          <Route path = "/product/:id" component={ProductDetails} />
          
          <Route path = "/login" component={Login} />
          <Route path = "/register" component={Register} />
          <Route path = "/password/forgot" component={ForgotPassword} exact/>
          <Route path = "/password/reset/:token" component={NewPassword} exact/>
          <ProtectedRoute path = "/me" component={Profile} exact/>
          <ProtectedRoute path = "/me/update" component={UpdateProfile} exact/>
          <ProtectedRoute path = "/password/update" component={UpdatePassword} exact/>

          <Route path="/cart" component={Cart} exact />
          <ProtectedRoute path="/shipping" component={Shipping} exact />
          <ProtectedRoute path="/confirm" component={ConfirmOrder} exact />
          <ProtectedRoute path="/success" component={OrderSuccess} />
          {stripeApiKey &&
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" component={Payment} />
            </Elements>
          }

        <ProtectedRoute path="/orders/me" component={ListOrders} exact />
        <ProtectedRoute path="/order/:id" component={OrderDetails} exact />

        </div>
        
        <ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard} exact />
        <ProtectedRoute path="/admin/products" isAdmin={true} component={ProductList} exact />
        <ProtectedRoute path="/admin/product" isAdmin={true} component={NewProduct} exact />
        <ProtectedRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct} exact />
        <ProtectedRoute path="/admin/orders" isAdmin={true} component={OrdersList} exact />
        <ProtectedRoute path="/admin/order/:id" isAdmin={true} component={ProcessOrder} exact />
        <ProtectedRoute path="/admin/users" isAdmin={true} component={UsersList} exact />
        <ProtectedRoute path="/admin/user/:id" isAdmin={true} component={UpdateUser} exact />
        <ProtectedRoute path="/admin/reviews" isAdmin={true} component={ProductReviews} exact />
        
        <ProtectedRoute path="/admin/analytics" isAdmin={true} component={AdminAnalytics} exact />
        <ProtectedRoute path="/admin/promo" isAdmin={true} component={PromoteProduct} exact />

        {/* {!loading && user.role !== 'admin' && (
          <Footer />
        )} */}
        {!loading && (!isAuthenticated || user.role !== 'admin') && (
          <Footer />
        )}
      
      </div>
    </Router>
  );
}

export default App;
