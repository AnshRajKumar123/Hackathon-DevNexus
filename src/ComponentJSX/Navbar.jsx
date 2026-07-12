import React, { useState, useEffect } from 'react';
import '../ComponentCSS/Navbar.css';
import { ImageCenter, parklyNavbarData } from '../assets/assest';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const [showNav, setShowNav] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false); // Tracks background density updates

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Background density activation shift
            if (currentScrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }

            // Scroll direction management logic
            if (currentScrollY < 50) {
                setShowNav(true);
            } else if (currentScrollY > lastScrollY) {
                setShowNav(false);
            } else {
                setShowNav(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <nav className={`ParklyNavContainer ${showNav ? 'nav-visible' : 'nav-hidden'} ${isScrolled ? 'nav-scrolled' : ''}`}>

            {/* Logo Hub */}
            <div className="FirstSide">
                <Link to='/' className='WebsiteLogo'>
                    <img src={ImageCenter.WebLogo} alt="Parkly Logo" />
                </Link>
            </div>

            {/* Menu Links Layer */}
            <div className="SecondSide">
                <ul>
                    {parklyNavbarData.links.map((item, idx) => (
                        <NavLink key={idx} to={item.path} className='SameKamKeLiye'>
                            {item.label}
                        </NavLink>
                    ))}

                    {/* Integrated Dropdown Menu Deck */}
                    <div className="DropDownBox">
                        <button className='SameKamKeLiye ForIcons'>
                            {parklyNavbarData.dropdown.triggerLabel} <i className='bx bx-chevron-down'></i>
                        </button>
                        <div className="ForSpaceBox">
                            <div className="DropListBox">
                                {parklyNavbarData.dropdown.items.map((dropItem, dIdx) => (
                                    dropItem.isSpan ? (
                                        <span key={dIdx}>{dropItem.label}</span>
                                    ) : (
                                        <Link key={dIdx} to={dropItem.path}>{dropItem.label}</Link>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Clerk Identity Systems Anchor */}
                    <div className="AuthWrapper">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="ClerkLoginBtn">Login</button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton
                                afterSignOutUrl="/"
                                appearance={{
                                    elements: {
                                        userButtonAvatarBox: {
                                            width: "38px",
                                            height: "38px",
                                            border: "2px solid #00F2FE",
                                            transition: "0.3s ease",
                                        }
                                    }
                                }}
                            />
                        </SignedIn>
                    </div>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;