import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProducts } from '../../actions/productActions';
import { detailsUser } from '../../actions/userActions';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';

export default function SellerScreen(props) {
    const sellerId = props.match.params.id;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
  
    const productList = useSelector((state) => state.productList);
    const {
        loading: loadingProducts,
        error: errorProducts,
        products,
    } = productList;
  
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailsUser(sellerId));
        dispatch(listProducts({ seller: sellerId }));
    }, [dispatch, sellerId]);
return (
    <div className="row top">
    <div className="col-1">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <ul className="card card-body">
          <li>
            <div className="row start">
              <div className="p-1">
                <img
                  className="small"
                  src={user.seller.logo}
                  alt={user.seller.name}
                ></img>
              </div>
              <div className="p-1">
                <h1>{user.seller.name}</h1>
              </div>
            </div>
          </li>
          <li>
            <a href={`mailto:${user.email}`}>Contact Seller</a>
          </li>
          <li>{user.seller.description}</li>
        </ul>
      )}
    </div>
    <div className="col-3">
      {loadingProducts ? (
        <LoadingBox></LoadingBox>
      ) : errorProducts ? (
        <MessageBox variant="danger">{errorProducts}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row center">
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
                            </div>
                        </li>
                        )
                    )
                }
          </div>
        </>
      )}
    </div>
  </div>
    );
}