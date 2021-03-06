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
                    <label htmlFor="name"> T??n s???n ph???m: </label>
                    <input 
                        id="name"
                        type="text"
                        placeholder="T??n..."
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="product-edit-add">
                    <label htmlFor="price"> Gi?? ti???n: </label>
                    <input
                        id="price"
                        type="text"
                        placeholder="Gi?? ti???n..."
                        value={price}
                        onChange={(e) => setPrice(e.target.value)} />
                </div>

                <div className="product-edit-add">
                    <label htmlFor="image"> ???????ng d???n h??nh s???n ph???m: </label>
                    <input
                        id="image"
                        type="text"
                        placeholder="???????ng d???n..."
                        value={image}
                        onChange={(e) => setImage(e.target.value)} />
                </div>

                <div className="product-edit-add">
                    <label htmlFor="imageFile"> Ch???n ???nh s???n ph???m: </label>
                    <input
                        type="file"
                        id="imageFile"
                        label="L???a ???nh s???n ph???m"
                        onChange={uploadFileHandler}
                    ></input>
                    {loadingUpload && <LoadingBox></LoadingBox>}
                    {errorUpload && (<MessageBox variant="danger">{errorUpload}</MessageBox>)}
                </div>

                <div className="product-edit-add">
                    <label htmlFor="category"> Danh m???c: </label>
                    <input
                        id="category"
                        type="text"
                        placeholder="Danh m???c..."
                        value={category}
                        onChange={(e) => setCategory(e.target.value)} />
                </div>

                <div className="product-edit-add">
                    <label htmlFor="brand"> Nh??n hi???u: </label>
                    <input
                        id="brand"
                        type="text"
                        placeholder="Nh??n hi???u..."
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)} />
                </div>

                <div className="product-edit-add">
                    <label htmlFor="amount"> S??? l?????ng: </label>
                    <input
                        id="amount"
                        type="text"
                        placeholder="S??? l?????ng..."
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)} />
                </div>
            </div>

            <div className="product-edit-right">
                <div className="product-edit-description"> 
                    <label htmlFor="description"> Mi??u t???: </label>
                    <textarea
                        id="description"
                        rows="3"
                        type="text"
                        placeholder="Mi??u t???, Gi???i thi???u..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} />
                </div>
            
                <button className="create-product-button" type="submit">
                    Th??m s???n ph???m
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



   