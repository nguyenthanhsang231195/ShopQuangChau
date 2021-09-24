import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {withRouter} from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, updateProduct } from '../../actions/productActions';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import './ProductEditScreen.css';
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants';
import ControlAdmin from '../../components/ControlAdmin/ControlAdmin';

function ProductEditScreen(props) {

    const productId = props.match.params.id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    // Update
    const productUpdate = useSelector((state) => state.productUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = productUpdate;

    const dispatch = useDispatch();
    useEffect(() => {
        if (successUpdate) {
            props.history.push('/productlist');
        }
        if (!product || product._id !== productId || successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            dispatch(detailsProduct(productId));
        } else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setCategory(product.category);
            setAmount(product.amount);
            setBrand(product.brand);
            setDescription(product.description);
        }
    }, [product, dispatch, productId, successUpdate, props.history]);

    const submitHandler = (e) => {
        e.preventDefault();
            dispatch(updateProduct({
                    _id: productId,
                    name,
                    price,
                    image,
                    category,
                    brand,
                    amount,
                    description,
                }
            )
        );
    };

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
    try {
        const { data } = await Axios.post('/api/uploads', bodyFormData, {
            headers: {'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
        },
    });
        setImage(data);
        setLoadingUpload(false);
    } catch (error) {
        setErrorUpload(error.message);
        setLoadingUpload(false);
    }};

return (
<div className="producteditscreen">
    <div className="admin-right">
        <ControlAdmin></ControlAdmin>
    </div>

    <div className="admin-left">
        <form className="form-product-edit" onSubmit={submitHandler}>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && <MessageBox variant="danger"> {errorUpdate} </MessageBox>}
            {loading ? 
                (<LoadingBox></LoadingBox>) : error ?
                (<MessageBox variant="danger">{error}</MessageBox>) : (
            <>
            <div className="product-edit-left">
                <div className="product-edit-add">
                    <label htmlFor="name"> Tên sản phẩm: </label>
                    <input 
                        id="name"
                        type="text"
                        placeholder="Tên..."
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="product-edit-add">
                    <label htmlFor="price"> Giá tiền: </label>
                    <input
                        id="price"
                        type="text"
                        placeholder="Giá tiền..."
                        value={price}
                        onChange={(e) => setPrice(e.target.value)} />
                </div>

                <div className="product-edit-add">
                    <label htmlFor="image"> Đường dẫn hình sản phẩm: </label>
                    <input
                        id="image"
                        type="text"
                        placeholder="Đường dẫn..."
                        value={image}
                        onChange={(e) => setImage(e.target.value)} />
                </div>

                <div className="product-edit-add">
                    <label htmlFor="imageFile"> Chọn ảnh sản phẩm: </label>
                    <input
                        type="file"
                        id="imageFile"
                        label="Lựa ảnh sản phẩm"
                        onChange={uploadFileHandler}
                    ></input>
                    {loadingUpload && <LoadingBox></LoadingBox>}
                    {errorUpload && (<MessageBox variant="danger">{errorUpload}</MessageBox>)}
                </div>

                <div className="product-edit-add">
                    <label htmlFor="category"> Danh mục: </label>
                    <input
                        id="category"
                        type="text"
                        placeholder="Danh mục..."
                        value={category}
                        onChange={(e) => setCategory(e.target.value)} />
                </div>

                <div className="product-edit-add">
                    <label htmlFor="brand"> Nhãn hiệu: </label>
                    <input
                        id="brand"
                        type="text"
                        placeholder="Nhãn hiệu..."
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)} />
                </div>

                <div className="product-edit-add">
                    <label htmlFor="amount"> Số lượng: </label>
                    <input
                        id="amount"
                        type="text"
                        placeholder="Số lượng..."
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)} />
                </div>
            </div>

            <div className="product-edit-right">
                <div className="product-edit-description"> 
                    <label htmlFor="description"> Miêu tả: </label>
                    <textarea
                        id="description"
                        rows="3"
                        type="text"
                        placeholder="Miêu tả, Giới thiệu..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} />
                </div>
            
                <button className="create-product-button" type="submit">
                    Thêm sản phẩm
                </button>    
            </div>
            </>
            )}
        </form>
    </div>
</div>
    );
}

export default withRouter(ProductEditScreen);



   