import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../Layout/MetaData';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearErrors } from '../../Actions/userActions';

const ForgotPassword = () => {

    const [email, setEmail] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, loading, message } = useSelector(state => state.forgotPassword)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            alert.success(message);
        }

    }, [dispatch, alert, error, message])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('email', email);

        dispatch(forgotPassword(formData))
    }


    return (
        <Fragment>

            <MetaData title={"Forgot Password"} />

            <div class="row wrapper">
                <div class="col-10 col-lg-5">
                    <form class="shadow-lg" onSubmit={submitHandler}>
                        <h1 class="mb-3">Forgot Password</h1>
                        <div class="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                class="form-control"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            class="btn btn-block py-3"
                            disabled={loading ? true : false}>
                            Send Email
                    </button>

                    </form>
                </div>
            </div>
            
        </Fragment>
    )
}

export default ForgotPassword
