import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder, detailsOrder, payOrder } from '../../actions/orderActions';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../../constants/orderConstants';
import './OrderScreen.css';


export default function OrderScreen(props) {

    const buttonPaypal = {
        position: 'relative',
        width: '100%',
        border: '0.1rem solid pink',
    };

    const orderPay = useSelector((state) => state.orderPay);
    const 
    {
        loading: loadingPay,
        error: errorPay,
        success: successPay,
    } = orderPay;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const 
    {
        loading: loadingDeliver,
        error: errorDeliver,
        success: successDeliver,
    } = orderDeliver;

    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch();
    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await Axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if (!order || successPay || successDeliver || (order && order._id !== orderId)) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(detailsOrder(orderId));
        } else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, order, orderId, sdkReady, successPay, successDeliver]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    };

    const deliverHandler = () => {
        dispatch(deliverOrder(order._id));
      };
        
return loading ? 
( <LoadingBox></LoadingBox>) : error ? 
(<MessageBox variant="danger">{error}</MessageBox>) : 
(
<div className="placeorder-box"> 

    <div className="placeorder-row-main">
        
        <div className="placeorder-row-left">
            <ul>
                {order.orderItems.map((item) => (
                    <li key={item.product}>
                        <div className="row-placeorder">

                            <div className="placeorder-image">
                                <img src={item.image} alt={item.name} />
                            </div>

                            <div className="placeorder-name">
                                <Link to={`/product/${item.product}`}>
                                    <h4> {item.name} </h4>
                                </Link>
                            </div>

                            <div className="placeorder-price">
                                <h4> {item.quantity} x {item.price}.000 ?? = {(item.quantity * item.price).toLocaleString('de-DE')}.000 ?? </h4>        
                            </div>

                        </div>
                    </li>
                ))}
            </ul>
        </div>

        <div className="placeorder-row-right">
            <div className="placeorder-row-right-one">
                <ul>
                    <li>
                        <h4> T??n ng?????i mua: </h4>
                        <h4> {order.shippingAddress.fullName} </h4>
                    </li>
                    <li>
                        <h4> S??? ??i???n tho???i: </h4>
                        <h4> {order.shippingAddress.phone} </h4>
                    </li>
                    <li>
                        <h4> ?????a ch???: </h4>
                        <h4>{order.shippingAddress.address}</h4>
                    </li>
                    <li>
                        <h4> M?? b??u ??i???n: </h4>
                        <h4> {order.shippingAddress.postalCode} </h4>
                    </li>
                </ul>
                {order.isDelivered ? (
                    <MessageBox variant="success">
                        C?? th??? giao {order.deliveredAt}
                    </MessageBox> ) : (
                    <MessageBox variant="danger">
                         Kh??ng th??? giao 
                    </MessageBox>
                    )
                }
            </div>

            <div className="placeorder-row-right-two">
                <ul>
                    <li>
                        <h4> Ph????ng th???c thanh to??n: </h4>
                        <h4> {order.paymentMethod} </h4>
                    </li>
                </ul>
                {order.isPaid ? (
                    <MessageBox variant="success">
                        Thanh to??n ???????c ch???p nh???n {order.paidAt}
                    </MessageBox>) : (
                    <MessageBox variant="danger"> 
                        Kh??ng th??? thanh to??n 
                    </MessageBox>
                    )
                }
            </div>

            <div className="placeorder-row-right-three">
                <ul>
                    <li>
                        <h4> T??m T???t: </h4>
                    </li>

                    <li>
                        <h4> ??i???m th?????ng t??ch l??y: </h4>
                        <h4> {order.point} ??i???m ( 1 ??i???m = 1.000 ??) </h4> 
                    </li>

                    <li>
                        <h4> T???ng chi ph??: </h4>
                        <h4> {(order.totalPrice).toLocaleString('de-DE')}.000 ?? </h4> 
                    </li>

                </ul>

                {!order.isPaid && (
                    <div className="button-paypal">
                        {!sdkReady ? 
                            (<LoadingBox></LoadingBox>) : 
                            (
                            <>
                            {errorPay && (<MessageBox variant="danger"> {errorPay} </MessageBox>)}
                            {loadingPay && <LoadingBox></LoadingBox>}

                            <PayPalButton
                                amount={order.totalPrice}
                                styles={buttonPaypal}
                                onSuccess={successPaymentHandler}>
                            </PayPalButton>
                            </>
                            )
                        }
                    </div>
                    )
                }

                {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                    <li>
                    {loadingDeliver && <LoadingBox></LoadingBox>}
                    {errorDeliver && (<MessageBox variant="danger"> {errorDeliver} </MessageBox>)}
                        <button type="button" className="primary block" onClick={deliverHandler}>
                            Giao h??ng
                        </button>
                    </li>
                    )
                }
            </div>
        </div>

    </div>
</div>
    );
}

