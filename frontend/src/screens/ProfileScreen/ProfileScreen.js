import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../../actions/userActions';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import './ProfileScreen.css';

export default function ProfileScreen () {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [sellerName, setSellerName] = useState('');
    const [sellerLogo, setSellerLogo] = useState('');
    const [sellerDescription, setSellerDescription] = useState('');
   
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const {
        success: successUpdate,
        error: errorUpdate,
        loading: loadingUpdate,
    } = userUpdateProfile;

    const dispatch = useDispatch();
    useEffect(() => {
        if (!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            dispatch(detailsUser(userInfo._id));
        } else {
            setName(user.name);
            setEmail(user.email);
            if (user.seller) {
                setSellerName(user.seller.name);
                setSellerLogo(user.seller.logo);
                setSellerDescription(user.seller.description);
              }
        }
    }, [dispatch, userInfo._id, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Mật khẩu và mật khẩu xác nhận không trùng khớp');
        } else {
            dispatch(
                updateUserProfile({
                    userId: user._id,
                    name,
                    email,
                    password,
                    sellerName,
                    sellerLogo,
                    sellerDescription,
                    }
                )
            );
        }
    };

    return(
<div className="update-box">

    <div className="update-box-name">
        <h2> Chỉnh sửa thông tin: </h2>
    </div>

    {loading ? 
        (<LoadingBox></LoadingBox>) : error ? 
        (<MessageBox variant="danger">{error}</MessageBox>) : 
        (
        <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (<MessageBox variant="danger"> {errorUpdate} </MessageBox>)}
            {successUpdate && (<MessageBox variant="success"> Hoàn thành cập nhật thông tin </MessageBox>)}


    <form className="update-box-form" onSubmit={submitHandler}>
        <div className="name-box">
            <label className="box-update" htmlFor="name"> Tên đăng ký: </label>
            <input className="box-update-input"
                type="text"
                id="name"
                placeholder="Tên..."
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>

        <div className="email-box">
            <label className="box-update" htmlFor="email"> Email/Gmail: </label>
            <input className="box-update-input"
                type="email"
                id="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>

        <div className="password-box">
            <label className="box-update" htmlFor="password"> Mật khẩu: </label>
            <input className="box-update-input"
                type="password"
                id="password"
                placeholder="Nhập mật khẩu..." 
                onChange={(e) => setPassword(e.target.value)} 
            />
        </div>

        <div className="password-box">
            <label className="box-update" htmlFor="confirmPassword"> Nhập lại mật khẩu: </label>
            <input className="box-update-input"
                type="password"
                id="confirmPassword"
                placeholder="Nhập lại mật khẩu..." 
                onChange={(e) => setConfirmPassword(e.target.value)} 
            />
        </div>
        {user.isSeller && (
            <>
                <div className="password-box">
                    <label className="box-update" htmlFor="sellerName"> Seller Name </label>
                    <input className="box-update-input"
                        id="sellerName"
                        type="text"
                        placeholder="Enter Seller Name"
                        value={sellerName}
                        onChange={(e) => setSellerName(e.target.value)}
                    ></input>
                </div>

                <div className="password-box">
                    <label className="box-update" htmlFor="sellerLogo"> Seller Logo </label>
                    <input className="box-update-input"
                        id="sellerLogo"
                        type="text"
                        placeholder="Enter Seller Logo"
                        value={sellerLogo}
                        onChange={(e) => setSellerLogo(e.target.value)}
                    ></input>
                </div>

                <div className="password-box">
                    <label className="box-update" htmlFor="sellerDescription"> Seller Description </label>
                    <input className="box-update-input"
                        id="sellerDescription"
                        type="text"
                        placeholder="Enter Seller Description"
                        value={sellerDescription}
                        onChange={(e) => setSellerDescription(e.target.value)}
                    ></input>
                </div>
            </>
            )}
 
        <span className="change-update-box">
            <button className="button-update-box" type="submit">
                Update
            </button>
        </span>

    </form>
        </>
        )
    }
    
</div>
    );
}
