import React from 'react';
import {Link} from 'react-router-dom'
import './Product.css'

const getPlaceBidButton = (user, id) => {
        if(user) {
            if(user.isBuyer){
                return(
                    <Link to={`/product/${id}`}>
                    <button>Place Bid</button>
                    </Link>
                )
            }
        }
}


const Product = ({product, user}) => {
    return (
        <div className="col-md-4 col-xl-3 my-5">
            <div id="product__card" className="container">
            <div className="card">
            <div className="photo">
                <img
                    className="product__img"
                    src={`http://localhost:5000/api/product/image/${product.imageId}`}
                    />
            </div>
            <div className="description pl-4">
                <h2>{product.name}</h2>
                <h4>Total Bids Placed: {product.bidders.length}</h4>
                <h1>Base Price: &#8377; {product.basePrice}</h1>
                <p>
                   {product.description}
                </p>
                {getPlaceBidButton(user,product._id)}
                
            </div>
            </div>
            </div>
        </div>
    );
}

export default Product;
