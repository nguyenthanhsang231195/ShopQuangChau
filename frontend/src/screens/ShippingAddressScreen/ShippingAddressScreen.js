import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../actions/cartActions';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';
import './ShippingAddressScreen.css';


export default function ShippingAddressScreen(props) {

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    if (!userInfo) {
        props.history.push('/đăng-ký');
    }

    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [phone, setPhone] = useState(shippingAddress.phone);
    const [address, setAddress] = useState(shippingAddress.address);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            saveShippingAddress({ fullName, phone, address,  postalCode })
        );
        props.history.push('/thanh-toán');
    };

    return (
<div className="shipping-box">
    <CheckoutSteps step1 step2></CheckoutSteps>

    <div className="shipping-box-name">
        <h2> Vận Chuyển </h2>
    </div>

    <form className="signin-box-form" onSubmit={submitHandler}>
       
        <div className="name-box">
            <label className="box-signin" htmlFor="fullName"> Họ và Tên: </label>
            <input className="box-signin-input"
                type="text"
                id="fullName"
                placeholder="Họ và tên đầy đủ..."
                value={fullName}
                required
                onChange={(e) => setFullName(e.target.value)}>
            </input>
        </div>

        <div className="phone-box"> 
            <label className="box-signin" htmlFor="phone"> Số điện thoại: </label>
            <input className="box-signin-input"
                type="text"
                id="phone"
                placeholder="Nhập số điện thoại..."
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}>
            </input>
        </div>

        <div className="address-box">
            <label className="box-signin" htmlFor="address"> Địa chỉ: </label>
            <input className="box-signin-input"
                type="text"
                id="address"
                placeholder="Nhập địa chỉ..."
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}>
            </input>
        </div>

        <div className="postalCode-box">
            <label className="box-signin" htmlFor="postalCode"> Postal Code/ Mã bưu chính: </label>
            <input className="box-signin-input"
                type="text"
                id="postalCode"
                placeholder="Enter postal code"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}>
            </input>
        </div>

        <span className="change-signin-box">
            <button className="button-signin-box" type="submit">
                Bước tiếp theo
            </button>
        </span>
    </form>
</div>
    );
}