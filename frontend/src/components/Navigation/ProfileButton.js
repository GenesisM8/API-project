import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/')
        closeMenu();
    };

    const spotsClick = (e) => {
        e.preventDefault();
        history.push('/spots/current')
        closeMenu();
    }

    // const reviewClick = (e)=>{
    //     e.preventDefault();
    //     history.push('/reviews/current')
    //     closeMenu()
    // }
    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <button className="userbutton" onClick={openMenu}>
                <div className="userFa">
                    <i className="fa-solid fa-bars fa-lg"></i>
                    <i className="fas fa-user-circle fa-2xl" />
                </div>

            </button>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <div className="userInfo"> 
                            <div className="userInfo">
                            <li>Hello, {user.username}</li>
                            <li>{user.email}</li>
                            </div>
                            <div>
                            <button onClick={spotsClick} className="clickCss">Manage Spots</button>
                            {/* <button onClick={reviewClick} className="clickCss">Manage Reviews</button> */}
                            </div>
                           <div className="logOut">
                             <button className="logOutButton" onClick={logout}>Log Out</button>
                           </div>

                        </div>

                    </>
                ) : (
                    <>
                        <OpenModalMenuItem
                            itemText="Log In"
                            onItemClick={closeMenu}
                            modalComponent={<LoginFormModal />}
                        />
                        <OpenModalMenuItem
                            itemText="Sign Up"
                            onItemClick={closeMenu}
                            modalComponent={<SignupFormModal />}
                        />
                    </>
                )}
            </ul>
        </>
    );
}

export default ProfileButton;
