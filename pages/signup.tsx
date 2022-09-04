import React, {useState} from "react";
import Head from 'next/head';

import { PasswordHideIcon } from '../src/icons/password-hide';
import { PasswordShowIcon } from '../src/icons/password-show';
import { AuthRegistration, AuthLogin } from '../src/services/authentication.js';

import styles from '../styles/auth.module.scss';

function SignupPage() {
    const [isPasswordVisible, setPasswordVisibility] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        let params = {
            email: e.target.email.value,
            password1: e.target.password1.value,
            password2: e.target.password2.value
        }
        let response = AuthRegistration(params);
        if (response) {
            console.log("qeeeeeeee" + response)
        }
    }

    return (
        <div>
            <Head>
                <title>PU Meet SignUp</title>
            </Head>
            <div className={styles.__page_auth}>
                <div className={styles.content_wrapper}>
                    <div className={styles._box}>
                        <div className={styles.header}>
                            <h2>Sign Up</h2>
                        </div>
                        <form className={styles.form} autoComplete="off" onSubmit={handleSubmit}>
                            <div className="my-2">
                                <label for="email">Email</label>
                                <div className={styles.input}>
                                    <input type="email" name="email" id="email" placeholder="e.g. kashish@gmail.com" />
                                </div>
                            </div>
                            <div className="my-2">
                                <label for="email">Password</label>
                                <div className={styles.input + " d-flex mb-2"}>
                                    <input type={isPasswordVisible ? "text" : "password"} name="password1" id="password1" placeholder="e.g. 2$F04Hr@6RMr" />
                                    <div className="d-flex justify-content-center align-items-center">
                                        <span className={styles.toggle} onClick={() => setPasswordVisibility(!isPasswordVisible)}>
                                            {isPasswordVisible ? <PasswordShowIcon /> : <PasswordHideIcon />}
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.input}>
                                    <input type={isPasswordVisible ? "text" : "password"} name="password2" id="password2" placeholder="Confirm password" />
                                </div>
                            </div>
                            <div className="my-2 d-flex justify-content-end">
                                <span style={{ fontSize: "14px", color: "#0d6efd" }}>Forgot password?</span>
                            </div>
                            <div className="mt-4">
                                <button className="theme-btn mb-2">Sign Up</button>
                                <p className="text-center mb-1" style={{color: "rgba(0, 0, 0, 0.45)"}}>By signing up you agree to our <a href="#">Terms & Conditions.</a></p>
                            </div>
                            <div className="text-center">
                                <p>Already have an account? <a href="/signin">Sign In</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupPage;
