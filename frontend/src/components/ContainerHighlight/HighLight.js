import React, {Component} from 'react';
import './HighLight.css';

class HighLight extends Component{
    render() {
        return(
<div className="container-highlight">
    <div className="row-highlight">
        <h3> | giảm 10% cho hóa đơn trên 400K | </h3>
    </div>

    <div className="row-highlight">
        <h3> | thanh toán khi nhận hàng | </h3>
    </div>

    <div className="row-highlight">
        <h3> | free ship | </h3>
    </div>
</div>
        )
    }
}

export default HighLight;