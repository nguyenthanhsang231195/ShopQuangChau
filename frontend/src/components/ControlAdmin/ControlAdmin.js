import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './ControlAdmin.css';

export default function ControlAdmin() {

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    return (
<div className="admin-box">

    <div className="control-main-admin"> 
        <div className="control-admin">
            <h2> Admin </h2>
            <div className="dashboard">
                {
                    userInfo && userInfo.isAdmin && (
                        <ul>    
                            <li>
                                <Link to="/dashboard">
                                    <h3> Bảng điều khiển </h3>                   
                                </Link>
                            </li>
                            <li>
                                <Link to="/productlist">
                                    <h3> Danh sách sản phẩm </h3>                   
                                </Link>
                            </li>
                            <li>
                                <Link to="/orderlist">
                                    <h3> Đơn đặt hàng </h3>                   
                                </Link>
                            </li>
                            <li>
                                <Link to="/userlist">
                                    <h3> Khách hàng </h3>                   
                                </Link>
                            </li>
                        </ul>
                    )
                }
                {
                    userInfo && userInfo.isSeller && (
                        <ul>    
                            <li>
                                <Link to="/productlist/seller">
                                    <h3> Danh sách sản phẩm </h3>                   
                                </Link>
                            </li>
                            <li>
                                <Link to="/orderlist/seller">
                                    <h3> Đơn đặt hàng </h3>                   
                                </Link>
                            </li>
                        </ul>
                    )
                }            
            </div>
        </div>
    </div>
</div>
    )
}
