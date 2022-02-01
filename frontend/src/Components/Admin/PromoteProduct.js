import React, { Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import MetaData from '../Layout/MetaData';
import Sidebar from './Sidebar';

//? I will edit the product model, product routes, product controllers

const PromoteProduct = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const [promoCode, setPromoCode] = useState('');
    const [productId, setProductId] = useState('');

    //I might need to add a promo code to the product model and set a default for it
    //Then i pass it the products ID and the promocode to the backend 

    //! What i could do it let admins update the product and added a promoCode then destructure the prmomCode and chekc if their is a promo code

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch(createPromoCode(productId, promoCode));
    }

    return (
        <Fragment>
            <MetaData title={'All Reviews'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>

                    <div className="row justify-content-center mt-5">
                        <div className="col-5">
                                        <form onSubmit={submitHandler}>
                                            <div className="form-group">
                                                <label htmlFor="productId_field">Enter Promotional Code</label>
                                                <input
                                                    type="text"
                                                    id="productId_field"
                                                    className="form-control"
                                                    value={promoCode}
                                                    onChange={e => setPromoCode(e.target.value)}
                                                />
                                                
                                                <label htmlFor="productId_field">Enter Product ID</label>
                                                <input
                                                    type="text"
                                                    id="productId_field"
                                                    className="form-control"
                                                    value={productId}
                                                    onChange={e => setProductId(e.target.value)}
                                                />
                                            </div>

                                            <button
                                                id="search_button"
                                                type="submit"
                                                className="btn btn-primary btn-block py-2"
                                            >
                                                CREATE
                                            </button>
                                        </ form>
                                    </div>
                        </div>

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default PromoteProduct

