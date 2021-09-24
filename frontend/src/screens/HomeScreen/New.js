import React, { useEffect} from 'react';
import './New.css';
import LoadingBox from '../../components/LoadingBox/LoadingBox.js';
import MessageBox from '../../components/MessageBox/MessageBox.js';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import {Link} from 'react-router-dom';

export default function HomeScreen() {

    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts({}));
    }, [dispatch]);

    return(
<div className="container-new">
    <div className="product-new-text">
        <h1> sản phẩm mới </h1>
    </div>
    
    {loading ? 
    (<LoadingBox />) : error ? 
    (<MessageBox variant="danger"> {error} </MessageBox>) : 
    (
        <div className="product-new-box">
            <ul>
                {
                    products && products.map((product) => 
                        (
                        <li key={product._id}>
                            <div className="box-product">
                                <Link to={`/product/${product._id}`}>
                                    <img className="product-image" src={product.image} alt={product.name} />
                                </Link>

                                <Link to={`/product/${product._id}`}>
                                    <h2 className="product-name"> {product.name} </h2>
                                </Link>
                                
                                <h3 className="product-price"> {product.price}.000 Đ </h3>

                                {/* Tại sao lại không chạy hoặc lỗi? */}
                                {/* <Link to={`/seller/${product.seller._id}`}>
                                    <h2>
                                        {product.seller.seller.name}
                                    </h2>         
                                </Link> */}
                            </div>
                        </li>
                        )
                    )
                }
            </ul>
        </div>
        )
    }
</div>
    )
}


