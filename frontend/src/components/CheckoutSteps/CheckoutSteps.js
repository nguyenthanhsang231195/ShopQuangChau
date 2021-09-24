import React from 'react';
import './CheckoutSteps.css';

export default function CheckoutSteps(props) {
  return (
<div className="box-checkout-steps">
    <div className={props.step1 ? 'active' : ''}> Đăng Nhập </div>
    <div className={props.step2 ? 'active' : ''}> Vận Chuyển </div>
    <div className={props.step3 ? 'active' : ''}> Thanh Toán </div>
    <div className={props.step4 ? 'active' : ''}> Tình Trạng Đơn Hàng </div>
</div>
    );
}