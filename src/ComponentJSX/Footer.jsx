import React from 'react';
import '../ComponentCSS/Footer.css';
import { Link } from 'react-router-dom';
import { ImageCenter, parklyFooterData } from '../assets/assest';

const Footer = () => {
    return (
        <footer className="ProFooterWrapper">

            {/* Upper Foot Station: Brand + Navigation Matrix */}
            <div className="FooterCoreGrid">

                {/* Brand Showcase Block */}
                <div className="FooterBrandPanel">
                    <div className="WebLogoFooter">
                        <img src={ImageCenter.WebLogo} alt="Parkly Corporate Logo" />
                    </div>
                    <div className="FooterAppBadges">
                        <a href="#" className="BadgeLink"><img src={ImageCenter.IOS} alt="App Store" /></a>
                        <a href="#" className="BadgeLink"><img src={ImageCenter.GooglePlay} alt="Play Store" /></a>
                    </div>
                </div>

                {/* Data-Driven Link Columns */}
                <div className="FooterLinksContainer">

                    <div className="FooterLinkColumn">
                        <h3>{parklyFooterData.companyColumn.title}</h3>
                        <ul>
                            {parklyFooterData.companyColumn.links.map((link, idx) => (
                                <li key={idx}><a href={link.path}>{link.label}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div className="FooterLinkColumn">
                        <h3>{parklyFooterData.businessColumn.title}</h3>
                        <ul>
                            {parklyFooterData.businessColumn.links.map((link, idx) => (
                                <li key={idx}><a href={link.path}>{link.label}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div className="FooterLinkColumn">
                        <h3>{parklyFooterData.placesColumn.title}</h3>
                        <ul>
                            {parklyFooterData.placesColumn.links.map((link, idx) => (
                                <li key={idx}><a href={link.path}>{link.label}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div className="FooterLinkColumn">
                        <h3>{parklyFooterData.legalColumn.title}</h3>
                        <ul>
                            {parklyFooterData.legalColumn.links.map((link, idx) => (
                                <li key={idx}>
                                    {link.isRouter ? (
                                        <Link to={link.path}>{link.label}</Link>
                                    ) : (
                                        <a href={link.path}>{link.label}</a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Interaction Module */}
                    <div className="FooterLinkColumn NetworkColumn">
                        <h3>{parklyFooterData.socials.title}</h3>
                        <div className="SocialIconsRow">
                            {parklyFooterData.socials.links.map((soc, idx) => (
                                <a key={idx} href={soc.url} target={soc.url !== "#" ? "_blank" : ""} rel="noreferrer">
                                    <i className={soc.icon}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                </div>

            </div>

            <div className="FooterDividerLine"></div>

            {/* Bottom Foot Station: Legal Copy Disclaimer */}
            <div className="FooterBottomBar">
                <p className='BoxiBtn'>{parklyFooterData.disclaimer}</p>
            </div>

        </footer>
    );
};

export default Footer;