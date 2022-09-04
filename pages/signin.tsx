import React, {useState} from "react";
import Head from 'next/head';

import { PasswordHideIcon } from '../src/icons/password-hide'
import { PasswordShowIcon } from '../src/icons/password-show'

import styles from '../styles/auth.module.scss';

function SigninPage() {
    const [isPasswordVisible, setPasswordVisibility] = useState(false);
    return (
        <div>
            <Head>
                <title>PU Meet Login</title>
            </Head>
            <div className={styles.__page_auth}>
                <div className={styles.content_wrapper}>
                    <div className={styles._box}>
                        <div className={styles.header}>
                            <h2>Sign In</h2>
                        </div>
                        <form className={styles.form} autoComplete="off">
                            <div className="my-2">
                                <label for="email">Your email</label>
                                <div className={styles.input}>
                                    <input type="email" name="email" id="email" placeholder="e.g. kashish@gmail.com" />
                                </div>
                            </div>
                            <div className="my-2">
                                <label for="email">Your password</label>
                                <div className={styles.input + " d-flex"}>
                                    <input type={isPasswordVisible ? "text" : "password"} name="password" id="password" placeholder="e.g. 2$F04Hr@6RMr" />
                                    <div className="d-flex justify-content-center align-items-center">
                                        <span className={styles.toggle} onClick={() => setPasswordVisibility(!isPasswordVisible)}>
                                            {isPasswordVisible ? <PasswordShowIcon /> : <PasswordHideIcon />}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="my-2 d-flex justify-content-end">
                                <span style={{ fontSize: "14px", color: "#0d6efd" }}>Forgot password?</span>
                            </div>
                            <div className="my-4">
                                <button className="theme-btn">Sign In</button>
                            </div>
                            <div className="text-center">
                                <p>Don't have an account? <a href="/signup">Sign Up</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SigninPage;
