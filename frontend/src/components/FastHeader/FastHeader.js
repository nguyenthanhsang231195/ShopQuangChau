import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { signout } from '../../actions/userActions';
import './FastHeader.css';

export default function FastHeader() {

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout());
    };

    return(
<div className="fast-header">
    <div className="fast-header-left">
        <ul>
            <li> 
                <Link to="/"> 
                    <i className="fas fa-home"></i> Trang chủ
                </Link> 
            </li>
            <li> 
                <Link to="/đăng-ký"> 
                    <i className="fas fa-user"></i> Đăng ký
                </Link> 
            </li>
            <li> 
                {userInfo ? 
                    (
                        <div className="dropdown">
                            <Link to="#">
                                {userInfo.name} <i className="fa fa-caret-down"></i>
                            </Link>
                            <ul className="dropdown-content">
                                <li>
                                    <Link to="/orderhistory"> Order History </Link>
                                </li>
                                <li>
                                    <Link to="/profile"> Update Profile </Link>
                                </li>
                                <li>
                                    <Link to="#signout" onClick={signoutHandler}> Đăng xuất </Link>
                                </li>
                            </ul>
                        </div>
                    ) : 
                    (
                        <Link to="/đăng-nhập"> 
                            <i className="fas fa-users"></i> Đăng nhập
                        </Link> 
                    )
                }
                {userInfo && userInfo.isSeller && (
                    <div className="dropdown">
                        <Link to="/productlist/seller" id="seller">
                            Seller <i className="fa fa-bell"></i>
                        </Link>
                    </div>
                    )}
                {userInfo && userInfo.isAdmin && (
                    <div className="dropdown">
                        <Link to="/productlist" id="admin">
                            Admin <i className="fa fa-star"></i>
                        </Link>
                    </div>
                    )
                }
            </li>
            <li> 
                <Link to="/question"> 
                    <i className="fas fa-question"></i> Câu hỏi thường gặp
                </Link> 
            </li>
            <li> 
                <Link to="/giỏ-hàng"> 
                    <i className="fas fa-cart-plus"></i> Giỏ hàng
                    {cartItems.length > 0 && (
                        <span className="badge"> {cartItems.length} </span>
                    )}
                </Link> 
            </li>
        </ul>
    </div>

    <div className="fast-header-right">
        <form className="input-group">
            <input type="text" className="form-control" placeholder="Tìm kiếm..." />
            <button type="submit"> <i className="fas fa-search"></i> </button>
        </form>
    </div>
</div>
    )
}