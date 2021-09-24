import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../../actions/orderActions';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import { ORDER_CREATE_RESET } from '../../constants/orderConstants';
import './PlaceOrderScreen.css';

export default function PlaceOrderScreen(props) {
    
    const cart = useSelector((state) => state.cart);
    if (!cart.paymentMethod) {
        props.history.push('/thanh-toán');
    }

    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;

    const toPrice = (num) => Number(num.toFixed()); // Làm tròn () số sau dấu ,
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0));
    // Thông tin khách hàng xem
    cart.total = cart.cartItems.reduce((a, c) => a + c.quantity, 0);
    cart.total_value = cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
    cart.total_value_string = cart.total_value.toLocaleString('de-DE');
    // Thông tin cần lưu trữ
    cart.point = Math.round(cart.cartItems.reduce((a,c) => a + (c.price * c.quantity * 0.024) , 0));
    cart.shippingPrice = cart.itemsPrice > 400 ? toPrice(0) : toPrice(39); // Nếu tổng tiền lớn hơn 400 thì phí ship là 0
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice;

    const dispatch = useDispatch();
    const placeOrderHandler = () => {
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    };
    useEffect(() => {
        if (success) {
            props.history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, order, props.history, success]);

return (
<div className="placeorder-box"> 
    <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

    <div className="placeorder-row-main">
        
        <div className="placeorder-row-left">
            <ul>
                {cart.cartItems.map((item) => (
                    <li key={item.product}>
                        <div className="row-placeorder">

                            <div className="placeorder-image">
                                <img src={item.image} alt={item.name} />
                            </div>

                            <div className="placeorder-name">
                                <Link to={`/sản-phẩm/${item.product}`}>
                                    <h4> {item.name} </h4>
                                </Link>
                            </div>

                            <div className="placeorder-price">
                                <h4> {item.quantity} x {item.price}.000 Đ = {(item.quantity * item.price).toLocaleString('de-DE')}.000 Đ </h4>        
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
                        <h4> Tên người mua: </h4>
                        <h4> {cart.shippingAddress.fullName} </h4>
                    </li>
                    <li>
                        <h4> Số điện thoại: </h4>
                        <h4> {cart.shippingAddress.phone} </h4>
                    </li>
                    <li>
                        <h4> Địa chỉ: </h4>
                        <h4>{cart.shippingAddress.address}</h4>
                    </li>
                    <li>
                        <h4> Mã bưu điện: </h4>
                        <h4> {cart.shippingAddress.postalCode} </h4>
                    </li>
                </ul>
            </div>

            <div className="placeorder-row-right-two">
                <ul>
                    <li>
                        <h4> Phương thức thanh toán: </h4>
                        <h4> {cart.paymentMethod} </h4>
                    </li>
                </ul>
            </div>

            <div className="placeorder-row-right-three">
                <ul>
                    <li>
                        <h4> Đơn Hàng: </h4>
                    </li>

                    <li>
                        <h4> Tổng số lượng: </h4>
                        <h4> {cart.total} Sản phẩm </h4>
                    </li>

                    <li>
                        <h4> Giá trị đơn hàng: </h4>
                        <h4> {cart.total_value_string}.000 Đ </h4>
                    </li>

                    <li>
                        <h4> Phí giao hàng: </h4>
                        <h4> {cart.shippingPrice}.000 Đ </h4> 
                    </li>

                    <li>
                        <h4> Điểm thưởng tích lũy: </h4>
                        <h4> {cart.point} Điểm ( 1 Điểm = 1.000 Đ) </h4> 
                    </li>

                    <li>
                        <h4> Tổng chi phí: </h4>
                        <h4> {(cart.totalPrice).toLocaleString('de-DE')}.000 Đ </h4> 
                    </li>

                    <li className="button-placeorder">
                        <button
                            type="button"
                            onClick={placeOrderHandler}
                            disabled={cart.cartItems.length === 0}
                        >
                            Duyệt ngay
                        </button>
                    </li>
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                </ul>
            </div>
        </div>

    </div>
</div>
    );
}

