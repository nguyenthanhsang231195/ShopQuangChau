import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import { detailsProduct } from '../../actions/productActions';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import Color from '../../components/ProductColor/Color';
import Size from '../../components/ProductSize/Size';
import './ProductScreen.css';
import './ProductA.css';
import './ProductB.css';
import './ProductC.css';

function ProductScreen(props) {

    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    const addToCartHandler = () => {
        props.history.push(`/giỏ-hàng/${productId}/?số-lượng=${quantity}`);
    };

    const [ShowspanS, HidespanS] = useState(false);
    const [ShowspanM, HidespanM] = useState(false);
    const [ShowspanL, HidespanL] = useState(false);
    const [ShowspanXL, HidespanXL] = useState(false);

    return (
    <div>
    {loading ? (
        <LoadingBox></LoadingBox>
        ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
        ) : (
<div className="product-cart">
    <div className="row-A"> 
        {/* <div className="support-image">
            <ul>
                <li>
                    <img src={product.imageone} alt={product.name} className="mini-image" />
                </li>
                <li>
                    <img src={product.imagetwo} alt={product.name} className="mini-image" />
                </li>
            </ul>
        </div> */}

        <div className="important-image">
            <img src={product.image} alt={product.name} className="big-image" />
        </div>

        {/* <div className="support-image-hide"> 
            <ul>
                <li>
                    <img src={product.imageone} alt={product.name} className="mini-image-hide" />
                </li>
                <li>
                    <img src={product.imagetwo} alt={product.name} className="mini-image-hide" />
                </li>
            </ul>
        </div> */}
    </div>

    <div className="row-B">
        <ul>
            <li>
                <div className="product-name-cart">
                    <h2> {product.name} </h2>
                </div>
            </li>

            <li>
                <div className="product-price-cart">
                    <h4> {product.price}.000 Đ </h4>
                </div>
            </li>

            <li>
                <div className="product-status-cart"><strong> Tình trạng: </strong>
                    <h4>
                        {product.amount > 0 ? (
                        <span className="success"> Còn Hàng </span>
                        ) : (
                        <span className="error"> Hết Hàng </span>
                        )}
                    </h4>
                </div>
            </li>

            <li className="size">
                <h4> Kích thước: </h4>
                <Size></Size>
            </li>

            <li>
                <div className="show-size-product">
                    <ul>
                        <li>
                            <span className="span-normal"
                                onMouseEnter={() => HidespanS(true)}
                                onMouseLeave={() => HidespanS(false)}>  
                                S 
                            </span>
                        </li>
                        <li>
                            <span className="span-normal"
                                onMouseEnter={() => HidespanM(true)}
                                onMouseLeave={() => HidespanM(false)}>
                                M 
                            </span>
                        </li>
                        <li>
                            <span className="span-normal"
                                onMouseEnter={() => HidespanL(true)}
                                onMouseLeave={() => HidespanL(false)}>
                                L 
                            </span>
                        </li>
                        <li>
                            <span className="span-special"
                                onMouseEnter={() => HidespanXL(true)}
                                onMouseLeave={() => HidespanXL(false)}>
                                XL 
                            </span>
                        </li>
                    </ul>

                    {ShowspanS && (
                    <div>
                        <p> 
                            Chiều cao: 150-155 Cm;
                            Cân nặng: 40-45 Kg;
                            Ngực: 78-82 Cm;
                            Eo: 64-68 Cm;
                            Mông: 86-90 Cm
                        </p>
                    </div>
                    )}

                    {ShowspanM && (
                        <div>
                            <p> 
                                Chiều cao: 156-160 Cm;
                                Cân nặng: 43-46 Kg;
                                Ngực: 84-88 Cm;
                                Eo: 68-72 Cm;
                                Mông: 90-94 Cm
                            </p> 
                        </div>
                    )}

                    {ShowspanL && (
                        <div>
                            <p> 
                                Chiều cao: 160-164 Cm;
                                Cân nặng: 46-53 Kg;
                                Ngực: 88-92 Cm;
                                Eo: 72-76 Cm;
                                Mông: 94-98 Cm
                            </p> 
                        </div>
                    )}

                    {ShowspanXL && (
                        <div> 
                            <p> 
                                Chiều cao: 165-170 Cm;
                                Cân nặng: 53-57 Kg;
                                Ngực: 92-96 Cm;
                                Eo: 76-80 Cm;
                                Mông: 98-102 Cm
                            </p>
                        </div>
                    )}
                </div>
            </li>

            <li className="color">
                <h4> Màu sắc: </h4>
                <Color></Color>
            </li>

            <li>
                <div className="product-description-cart">
                    <h4> Giới thiệu: </h4>
                    <p> {product.description} </p> 
                </div>
            </li>

            {product.amount > 0 && (
            <li>
                <div className="product-cart">
                    <h4> Số lượng: </h4>

                    <select className="input-quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        >
                        {[...Array(product.amount).keys()].map((x) => 
                            (<option key={x + 1} value={x + 1}> {x + 1} </option>)
                        )}
                    </select>
                </div>

                <div className="containerB row-xGrid-yMiddle">
                    <div className="row-xGrid iso-standard">
                        <button onClick={addToCartHandler} className="ctrl-standard typ-subhed fx-bubbleDown"> Mua sắm thỏa thích </button>
                    </div>
                </div>
            </li>
                )
            }                 
        </ul>
    </div>

    <div className="row-C">
        <div className="support">
            <div className="text-sup">
                <h3> Hỗ trợ trực tuyến </h3>
            </div>

            <div className="padding-sup">
                <h3> Zalo/Hotline: 0797080378 </h3>

                <div className="padding-policies">
                    <h4> Chính sách bán hàng </h4>
                </div> 

                <div className="sales-law">
                    <ul>
                        <li>
                            <span className="span-sale"> 1 </span>
                            <p> <strong> Giao hàng toàn quốc </strong> </p>
                        </li>

                        <li>
                            <span className="span-sale"> 2 </span>
                            <p> Thanh toán khi nhận hàng </p>
                        </li>

                        <li>
                            <span className="span-sale"> 3 </span>
                            <p> Đổi trả trong vòng <strong> 7 ngày </strong> </p>
                        </li>

                        <li>
                            <span className="span-sale"> 4 </span>
                            <p> Hoàn tiền <strong> nhanh chóng </strong> </p>
                        </li>

                        <li>
                            <span className="span-sale"> 5 </span>
                            <p> <strong> Chất lượng </strong> đảm bảo </p>
                        </li>

                        <li>
                            <span className="span-sale"> 6 </span>
                            <p> <strong> Miễn phí </strong>  vận chuyển </p>
                        </li>
                        
                        <li>    
                            <span className="span-sale"> 7 </span>
                            <p> Hàng <strong> chính hãng </strong>  </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
        )}
    </div>
    );
}

export default withRouter(ProductScreen);