import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../../actions/cartActions';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';
import './PaymentMethodScreen.css';

export default function PaymentMethodScreen(props) {

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress.address) {
        props.history.push('/vận-chuyển');
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
            dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/tình-trạng');
    };

return (
<div className="payment-box">
    <CheckoutSteps step1 step2 step3></CheckoutSteps>

    <form className="form-payment-box" onSubmit={submitHandler}>
        <div className="payment-box-name">
            <h1> Phương thức thanh toán: </h1>
        </div>

        <div className="wallet">
            <div className="choose-pay-box">
                <img className="image-choose-pay" src="images/paypal.png" alt="wallet" />
                <input
                    type="radio"
                    id="paypal"
                    value="PayPal"
                    name="paymentMethod"
                    required
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}>
                </input> 
            </div>
            
            <div className="choose-pay-box">
                <img className="image-choose-pay" src="images/techcombank.png" alt="bank" />
                <input
                    type="radio"
                    id="techcom"
                    value="techcom"
                    name="paymentMethod"
                    required
                    onChange={(e) => setPaymentMethod(e.target.value)}>
                </input>

            </div>

            <div className="choose-pay-box">
                <img className="image-choose-pay" src="images/vietcombank.jpg" alt="bank" />
                <input
                    type="radio"
                    id="vietcom"
                    value="vietcom"
                    name="paymentMethod"
                    required
                    onChange={(e) => setPaymentMethod(e.target.value)}>
                </input>
            </div>

        </div>

        <span className="change-signin-box">
            <button className="button-signin-box" type="submit">
                Thanh toán
            </button>
        </span>
    </form>
</div>
    );
}
// Tạm thời chỉ có 1 cổng thanh toán