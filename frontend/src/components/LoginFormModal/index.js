import React, { useState } from "react";
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
                <div className="formcss">
                    <form onSubmit={handleSubmit} className="formcss">
                        <label>
                            Username or Email
                            <input className="formcss"
                                type="text"
                                value={credential}
                                onChange={(e) => setCredential(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Password
                            <input className="formcss"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                        {errors.credential && (
                            <p>{errors.credential}</p>
                        )}
                        
                    </form>
                </div>
<button type="submit">Log In</button>

            </div>

        </>
    );
}

export default LoginFormModal;