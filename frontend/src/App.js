import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

// Components
import FastHeader from './components/FastHeader/FastHeader.js';
import Navbar from './components/Navbar/Navbar.js';
import HighLight from './components/ContainerHighlight/HighLight.js';
import Category from './components/ContainerCategory/Category.js';
import Padding from './components/ContainerPadding/Padding.js';

// Screens
import HomeScreen from './screens/HomeScreen/New.js';
import ProductScreen from './screens/ProductScreen/ProductScreen.js';
import CartScreen from './screens/CartScreen/CartScreen.js';
import PaddingScreen from './screens/PaddingScreen.js';
import SigninScreen from './screens/SigninScreen/SigninScreen.js';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen.js';
import ShippingAddressScreen from './screens/ShippingAddressScreen/ShippingAddressScreen.js';
import PaymentMethodScreen from './screens/PaymentMethodScreen/PaymentMethodScreen.js';
import PlaceOrderScreen from './screens/PlaceOrderScreen/PlaceOrderScreen.js';
import OrderScreen from './screens/OrderScreen/OrderScreen.js';
import OrderHistoryScreen from './screens/OrderHistoryScreen/OrderHistoryScreen.js';

//Route
import PrivateRoute from './components/PrivateRoute/PrivateRoute.js';
import AdminRoute from './components/AminRoute/AdminRoute.js';
import SellerRoute from './components/SellerRoute/SellerRoute.js';

// Admin
import ProfileScreen from './screens/ProfileScreen/ProfileScreen.js';
import ProductEditScreen from './screens/ProductEditScreen/ProductEditScreen.js';
import ProductListScreen from './screens/ProductListScreen/ProductListScreen.js';
import OrderListScreen from './screens/OrderListScreen/OrderListScreen.js';
import UserListScreen from './screens/UserListScreen/UserListScreen.js';
import UserEditScreen from './screens/UserEditScreen/UserEditScreen.js';
// import SellerScreen from './screens/SellerScreen/SellerScreen.js';

function App() {
    return (
<BrowserRouter>
    <div className="grid-container">
        <header className="header-web">
            <FastHeader />
            <Navbar />
        </header>

        <main className="main-web">
            <Route path="/giỏ-hàng/:id?" component={CartScreen} />
            <Route path="/product/:id" component={ProductScreen} exact />
            <Route path="/danh-mục" component={PaddingScreen} />
            <Route path="/đăng-nhập" component={SigninScreen} />
            <Route path="/đăng-ký" component={RegisterScreen} />
            <Route path="/vận-chuyển" component={ShippingAddressScreen} />
            <Route path="/thanh-toán" component={PaymentMethodScreen} />
            <Route path="/tình-trạng" component={PlaceOrderScreen} />
            <Route path="/orderhistory" component={OrderHistoryScreen} />
            <PrivateRoute path="/profile" component={ProfileScreen} />

            {/* Admin */}
            <AdminRoute path="/productlist" component={ProductListScreen} exact/> 
            <Route path="/product/:id/edit" component={ProductEditScreen} exact />
            <AdminRoute path="/orderlist" component={OrderListScreen} exact/>
            <Route path="/order/:id" component={OrderScreen} />
            <AdminRoute path="/userlist" component={UserListScreen} />
            <AdminRoute path="/user/:id/edit" component={UserEditScreen} />
            {/* User */}
            <SellerRoute path="/productlist/seller" component={ProductListScreen} />
            <SellerRoute path="/orderlist/seller" component={OrderListScreen} />
            {/* <Route path="/seller/:id" component={SellerScreen} /> */}
            
            <Route path="/" component={HighLight} exact />
            <Route path="/" component={Category} exact />
            <Route path="/" component={Padding} exact />
            <Route path="/" component={HomeScreen} exact />
        </main>

        <footer className="footer-web">
            Designed by Sang 2021
        </footer>
    </div>
</BrowserRouter>
    );
}

export default App;
