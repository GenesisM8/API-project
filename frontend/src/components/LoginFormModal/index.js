import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    useEffect(()=>{
        const errors = [];
        if (password.length === 0 || password.length < 6) errors.password="";
        if (credential.length === 0 || credential.length < 4) errors.credential = "";
        setErrors(errors);
    },[password, credential])


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };

    return (
        <>
            <div className="logIn">
                <h1 className="h1">Log In</h1>
                {errors.credential && (
                    <p className="logerror">{errors.credential}</p>
                )}
                {errors.password && <p className="signError">{errors.password}</p>}

                <div className="formcss">
                    <form onSubmit={handleSubmit} className="formcss">
                        <label>
                            Username or Email
                            <input
                                type="text"
                                value={credential}
                                onChange={(e) => setCredential(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Password
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>

                        <button type="submit" className="buttonForm" disabled={Boolean(Object.values(errors).length)}>Log In</button>
                    </form>
                </div>


            </div>

        </>
    );
}

export default LoginFormModal;