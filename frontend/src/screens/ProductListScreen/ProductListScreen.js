import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, deleteProduct, listProducts } from '../../actions/productActions';
import ControlAdmin from '../../components/ControlAdmin/ControlAdmin';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../../constants/productConstants';
import './ProductListScreen.css';

export default function ProductListScreen(props) {

    const sellerMode = props.match.path.indexOf('/seller') >= 0;
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    // Create
    const productCreate = useSelector((state) => state.productCreate);
    const 
    {
        loading: loadingCreate, 
        error: errorCreate, 
        success: successCreate, 
        product: createdProduct
    } = productCreate;
    // Delete
    const productDelete = useSelector((state) => state.productDelete);
    const 
    {
        loading: loadingDelete, 
        error: errorDelete, 
        success: successDelete,
    } = productDelete;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch();
    useEffect(() => {
        if (successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET });
            props.history.push(`/product/${createdProduct._id}/edit`);
        }
        if (successDelete) {
            dispatch({ type: PRODUCT_DELETE_RESET });
        }
        dispatch(listProducts({ seller: sellerMode ? userInfo._id : '' }));
    }, [
        createdProduct,
        dispatch,
        props.history,
        sellerMode,
        successCreate,
        successDelete,
        userInfo._id,
    ]);

    const deleteHandler = (product) => {
        if (window.confirm('Bạn có muốn xóa?')) {
            dispatch(deleteProduct(product._id));
        }
    };

    const createHandler = () => {
        dispatch(createProduct());
    };

return (
<div className="productlistscreen">
    <div className="admin-right">
        <ControlAdmin></ControlAdmin>
    </div>

    <div className="admin-left"> 
        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {loadingCreate && <LoadingBox></LoadingBox>}
        {errorCreate && <MessageBox variant="danger"> {errorCreate} </MessageBox>}
        {loading ? 
        (<LoadingBox></LoadingBox>) : error ? 
        (<MessageBox variant="danger"> {error} </MessageBox>) : 
        (
        <table className="table-product-list">
            <thead>
                <tr>
                    <th> ID </th>
                    <th> TÊN SẢN PHẨM </th>
                    <th> GIÁ </th>
                    <th> DANH MỤC </th>
                    <th> NHÃN HIỆU </th>
                    <th> THAO TÁC </th>
                </tr>
            </thead>

            <tbody>
                {products.map((product) => (
                <tr key={product._id}>
                    <td> {product._id} </td>
                    <td> {product.name} </td>
                    <td> {product.price} </td>
                    <td> {product.category }</td>
                    <td> {product.brand} </td>
                    <td> 
                        <button type="button" className="button-edit"
                                onClick={() => props.history.push(`/product/${product._id}/edit`)}>
                            Chỉnh sửa
                        </button>

                        <button type="button" className="button-delete"
                                onClick={() => deleteHandler(product)}>
                            Xóa
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        )}
        <button type="button" className="create-product-button" onClick={createHandler}>
            Thêm sản phẩm
        </button>
    </div>
</div>
    );
}

