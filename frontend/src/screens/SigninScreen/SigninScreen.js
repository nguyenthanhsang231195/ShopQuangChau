import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../../actions/userActions';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import './SigninScreen.css';

export default function SigninScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    };

    useEffect(() => {
        if (userInfo) {
          props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    
    return(
<div className="signin-box">

    <div className="signin-box-name">
        <h2> Đăng Nhập </h2>
    </div>

    {loading && <LoadingBox></LoadingBox>}
    {error && <MessageBox variant="danger"> {error} </MessageBox>}

    <form className="signin-box-form" onSubmit={submitHandler}>

        <div className="email-box">
            <label className="box-signin" htmlFor="email"> Email/Gmail: </label>
            <input className="box-signin-input"
                type="email"
                id="email"
                placeholder="Nhập Email/Gmail..."
                required
                onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="password-box">
            <label className="box-signin" htmlFor="password"> Password: </label>
            <input className="box-signin-input"
                type="password"
                id="password"
                placeholder="Nhập mật khẩu..."
                required
                onChange={(e) => setPassword(e.target.value)} />
        </div>

        <span className="change-signin-box">
            <button className="button-signin-box" type="submit">
                Đăng Nhập
            </button>
        </span>
        
        <span className="change-signup-box">
            <p> Bạn chưa có tài khoản:...
                <Link to={`/đăng-ký?redirect=${redirect}`}>
                    <button className="button-signup-box"> Đăng Ký </button>
                </Link> 
            </p>
        </span>

    </form>
</div>
    );
}