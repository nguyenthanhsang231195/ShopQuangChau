import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productUpdateReducer } from './reducers/productReducers';
import { orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetailsReducer, orderListReducer, orderMineListReducer, orderPayReducer } from './reducers/orderReducers';
import { userDeleteReducer, userDetailsReducer, userListReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducers';

const initialState = {
    userSignin: 
    {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    },
    cart: 
    {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {},
        paymentMethod: 'PayPal',
    },
};

const reducer = combineReducers({
    cart:cartReducer,
    productList:productListReducer, productDetails:productDetailsReducer, productCreate:productCreateReducer, productUpdate:productUpdateReducer, productDelete:productDeleteReducer,
    orderCreate:orderCreateReducer, orderDetails:orderDetailsReducer, orderPay:orderPayReducer, orderMineList:orderMineListReducer, orderList:orderListReducer, orderDelete:orderDeleteReducer, orderDeliver:orderDeliverReducer,
    userSignin:userSigninReducer, userRegister:userRegisterReducer, userDetails:userDetailsReducer, userUpdateProfile:userUpdateProfileReducer, userList:userListReducer, userDelete:userDeleteReducer, userUpdate:userUpdateReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;