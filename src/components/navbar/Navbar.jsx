import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css'; // Import the CSS file  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeart,
    faShoppingCart,
    faBars,
    faTimes,
    faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import logo from '../../static/logo.png'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState({ products: false, profile: false });
    const dropdownRef = useRef(null);

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const toggleDropdown = (name) => {
        setDropdownOpen((prevState) => ({
            ...prevState,
            [name]: !prevState[name],
        }));
    };

    // Close dropdown when clicking outside  
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen({ products: false, profile: false });
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="Coffee Logo" />
            </div>
            <ul className={`navbar-links ${menuOpen ? 'active' : ''}`} ref={dropdownRef}>
                <li><a href="#home">Home Page</a></li>
                <li className="dropdown">
                    <a href="#products" onClick={() => toggleDropdown('products')} aria-haspopup="true" aria-expanded={dropdownOpen.products}>
                        Products <FontAwesomeIcon icon={faChevronDown} />
                    </a>
                    {dropdownOpen.products && (
                        <ul className="dropdown-menu show">
                            <li><a href="#coffee">See all categories</a></li>
                        </ul>
                    )}
                </li>
                <li className="dropdown">
                    <a href="#profile" onClick={() => toggleDropdown('profile')} aria-haspopup="true" aria-expanded={dropdownOpen.profile}>
                        Profile <FontAwesomeIcon icon={faChevronDown} />
                    </a>
                    {dropdownOpen.profile && (
                        <ul className="dropdown-menu show">
                            <li><a href="#account">Company Overviews</a></li>
                            <li><a href="#orders">Rating and Reviews</a></li>
                        </ul>
                    )}
                </li>
                <li><a href="#people">People</a></li>
            </ul>
            <div className="navbar-icons">
                <div className="icon-wrapper">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>Sevimlilar</span>
                </div>
                <div className="icon-wrapper">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span>Savatcha</span>
                </div>
            </div>
            <div className="navbar-menu-icon" onClick={toggleMenu}>
                <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
            </div>
        </nav>

    );
};

export default Navbar;
