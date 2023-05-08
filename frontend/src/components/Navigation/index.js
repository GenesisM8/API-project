import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className='nav'>
            <div className='navLeft'>
                <NavLink exact to="/" className="logotext">
                    <img className='logoimg' src='https://www.shareicon.net/data/128x128/2017/05/24/886221_media_512x512.png' 
                    alt='logo img'></img>
                    Skybnb</NavLink>
            </div>
            <div className='navRight'>
                {isLoaded && (<ProfileButton user={sessionUser} />)}
            </div>

        </div>




    );
}

export default Navigation;