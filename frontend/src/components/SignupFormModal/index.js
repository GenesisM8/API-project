import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    useEffect(() => {
        const errors = [];
        if(username.length === 0) errors.username="";
        if (email.length === 0) errors.email = "";
        if(firstName.length === 0) errors.firstName ="";
        if (lastName.length === 0) errors.lastName = "";
        if (password.length === 0 || password.length < 6) errors.password = "";
        if (confirmPassword.length === 0 || confirmPassword.length < 6) errors.confirmPassword = "";
        if (username.length < 4 && username.length > 0) errors.username='username needs to be at least 4 characters.';
        if (password.length < 6 && password.length > 0) errors.password='password needs to be at least 6 characters.';
        
        setErrors(errors);
    }, [email, firstName, lastName, username, password, confirmPassword])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors({});
            return dispatch(
                sessionActions.signup({
                    email,
                    username,
                    firstName,
                    lastName,
                    password,
                })
            )
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors);
                    }
                });
        }
        return setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field"
        });
    };
  
    return (
        <>
            <div className="signup">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
{errors.firstName && <p className="errors">{errors.firstName}</p>}
 {errors.lastName && <p className="signError">{errors.lastName}</p>}
 {errors.email && <p className="signError">{errors.email}</p>}
 {errors.password && <p className="signError">{errors.password}</p>}
{errors.username && <p className="signError">{errors.username}</p>}

                    <div>
                        <label>
                            First Name
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                pattern="[A-Za-z]+"
                                title="Please enter a valid name"
                                required
                            />
                        </label>
                        
                        <label>
                            Last Name
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                pattern="[A-Za-z]+"
                                title="Please enter a valid last name"
                                required
                            />
                        </label>
                       

                    </div>
                    <div className="labesSpace">
                        <label>
                            Email
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                       
                        <label>
                            Username
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </label>
                        
                    </div>


                    <div>
                        <label>
                            Password
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                        
                        <label>
                            Confirm Password
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </label>
                        {errors.confirmPassword && (
                            <p className="signError">{errors.confirmPassword}</p>
                        )}

                    </div>



                    <button type="submit" className="signButton" disabled={Boolean(Object.values(errors).length)}>Sign Up</button>
                </form>

            </div>

        </>
    );
}

export default SignupFormModal;