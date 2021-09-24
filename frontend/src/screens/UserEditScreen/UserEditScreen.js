import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser } from '../../actions/userActions';
import ControlAdmin from '../../components/ControlAdmin/ControlAdmin';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import { USER_UPDATE_RESET } from '../../constants/userConstants';
import './UserEditScreen.css';

export default function UserEditScreen(props) {

    const userId = props.match.params.id;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSeller, setIsSeller] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate;

    const dispatch = useDispatch();
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            props.history.push('/userlist');
        }
        if (!user) {
            dispatch(detailsUser(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setIsSeller(user.isSeller);
            setIsAdmin(user.isAdmin);
        }
    }, [dispatch, props.history, successUpdate, user, userId]);

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch update user
        dispatch(updateUser({ _id: userId, name, email, isSeller, isAdmin }));
    };
return (
<div className="usereditscreen">

    <div className="admin-right">
        <ControlAdmin></ControlAdmin>
    </div>

    <div className="admin-left">
        <form className="form-user-edit" onSubmit={submitHandler}>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)}
        {loading ? 
        (<LoadingBox></LoadingBox>) : error ? 
        (<MessageBox variant="danger">{error}</MessageBox>) : (
        <div className="user-edit-left">
            <div className="user-edit-add">
                <label htmlFor="name"> Name: </label>
                <input
                    id="name"
                    type="text"
                    placeholder="Tên..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></input>
            </div>

            <div className="user-edit-add">
                <label htmlFor="email"> Gmail/Email: </label>
                <input
                    id="email"
                    type="email"
                    placeholder="Gmail/Email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
            </div>

            <div className="user-edit-add">
                <label htmlFor="isSeller"> Is Seller: </label>
                <input
                    id="isSeller"
                    type="checkbox"
                    checked={isSeller}
                    className="check-user"
                    onChange={(e) => setIsSeller(e.target.checked)}
                ></input>
            </div>

            <div className="user-edit-add">
                <label htmlFor="isAdmin"> Is Admin: </label>
                <input
                    id="isAdmin"
                    type="checkbox"
                    checked={isAdmin}
                    className="check-user"
                    onChange={(e) => setIsAdmin(e.target.checked)}
                ></input>
            </div>

            <div>
                <button type="submit" className="create-user-button">
                    Update
                </button>
            </div>
        </div>
        )}
        </form>
    </div>
</div>
  );
}