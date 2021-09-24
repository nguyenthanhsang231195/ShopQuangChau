import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../../actions/userActions';
import ControlAdmin from '../../components/ControlAdmin/ControlAdmin';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import { USER_DETAILS_RESET } from '../../constants/userConstants';
import './UserListScreen.css';

export default function UserListScreen(props) {

    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    const userDelete = useSelector((state) => state.userDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = userDelete;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listUsers());
        dispatch({
            type: USER_DETAILS_RESET,
        });
    }, [dispatch, successDelete] );

    const deleteHandler = (user) => {
        if (window.confirm('Bạn có muốn xóa?')) {
            dispatch(deleteUser(user._id));
        }
    };

return (
<div className="userlistscreen">

    <div className="admin-right">
        <ControlAdmin></ControlAdmin>
    </div>

    <div className="admin-left">
        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {successDelete && (<MessageBox variant="success"> User Deleted Successfully </MessageBox>)}
        {loading ? 
        (<LoadingBox></LoadingBox>) : error ? 
        (<MessageBox variant="danger"> {error} </MessageBox>) : (

        <table className="table-user-list">
            <thead>
                <tr>
                    <th> ID </th>
                    <th> NAME </th>
                    <th> EMAIL </th>
                    <th> IS SELLER </th>
                    <th> IS ADMIN </th>
                    <th> ACTIONS </th>
                </tr>
            </thead>

            <tbody>
            {users.map((user) => (
                <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isSeller ? 'YES' : ' NO'}</td>
                    <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                    <td>
                        <button type="button" className="button-edit" onClick={() => props.history.push(`/user/${user._id}/edit`)}>
                            Chỉnh sửa
                        </button>

                        <button type="button" className="button-delete" onClick={() => deleteHandler(user)}>
                            Xóa
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        )}
    </div>
</div>
    );
}