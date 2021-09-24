import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../actions/userActions';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import './RegisterScreen.css';

export default function RegisterScreen (props) {
   
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Mật khẩu và mật khẩu xác nhận không trùng khớp');
        } else {
            dispatch(register(name, email, password));
        }
    };

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);


    return(
<div className="signin-box">

    <div className="signin-box-name">
        <h2> Đăng Ký </h2>
    </div>

    {loading && <LoadingBox></LoadingBox>}
    {error && <MessageBox variant="danger"> {error} </MessageBox>}

    <form className="signin-box-form" onSubmit={submitHandler}>
        <div className="name-box">
            <label className="box-signin" htmlFor="name"> Tên đăng ký: </label>
            <input className="box-signin-input"
                type="text"
                id="name"
                placeholder="Tên..."
                required
                onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="email-box">
            <label className="box-signin" htmlFor="email"> Email/Gmail: </label>
            <input className="box-signin-input"
                type="email"
                id="email"
                placeholder="example@gmail.com"
                required
                onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="password-box">
            <label className="box-signin" htmlFor="password"> Mật khẩu: </label>
            <input className="box-signin-input"
                type="password"
                id="password"
                placeholder="Nhập mật khẩu..."
                required
                onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="password-box">
            <label className="box-signin" htmlFor="confirmPassword"> Nhập lại mật khẩu: </label>
            <input className="box-signin-input"
                type="password"
                id="confirmPassword"
                placeholder="Nhập lại mật khẩu..."
                required
                onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
 
        <span className="change-signin-box">
            <button className="button-signin-box" type="submit">
                Đăng Ký
            </button>
        </span>
        
        <span className="change-signup-box">
            <p> Bạn đã có tài khoản:...
                <Link to={`/đăng-nhập?redirect=${redirect}`}>
                    <button className="button-signup-box"> Đăng Nhập </button>
                </Link> 
            </p>
        </span>   
    </form>
</div>
    );
}
