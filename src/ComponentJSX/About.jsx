import React, { useState, useEffect } from "react";
import '../ComponentCSS/About.css';
import { Link } from 'react-router-dom';
import { ImageCenter, parklyAboutData } from "../assets/assest";

const About = () => {
    const [selectedMember, setSelectedMember] = useState(null);

    useEffect(() => {
        if (selectedMember) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [selectedMember]);

    const teamMembers = [
        {
            img: ImageCenter.AyushPhoto,
            name: "Golu Kumar",
            role: "Team Leader & FrontEnd Developer",
            bio: "Ayush leads MNF’s technical direction and system integration modules seamlessly.",
            skills: ["Leadership", "Product Strategy", "Team Management"],
            social: {
                instagram: "https://www.instagram.com/offical_ayush_100/",
                linkedin: "https://linkedin.com/in/ayush-here",
                email: "mailto:ayush.kbc.695@gmail.com"
            }
        },
        {
            img: ImageCenter.AnshPhoto,
            name: "Ansh Raj",
            role: "FrontEnd Developer",
            bio: "Ansh designs fluid, high-fidelity UI layout architecture interfaces with extreme precision.",
            skills: ["React.js", "UI/UX Layout", "CSS Engineering"],
            social: {
                instagram: "https://www.instagram.com/its_ansh_raj_874/",
                linkedin: "https://www.linkedin.com/in/golu-kumar-375992392/",
                email: "mailto:golu.kkpncc.99008@gmail.com"
            }
        },
        {
            img: ImageCenter.AdityaPhoto,
            name: "Aditya Raj",
            role: "BackEnd Developer",
            bio: "Aditya builds stable enterprise database architectures and core routing APIs.",
            skills: ["Node.js", "APIs Core", "Database Design"],
            social: {
                instagram: "https://www.instagram.com/adityathakur_911/",
                linkedin: "https://www.linkedin.com/in/aditya-raj-911-/",
                email: "mailto:adityaraj9112009@gmail.com"
            }
        }
    ];

    return (
        <div className="ProAboutLayoutContainer">

            {/* SECTION 1: ENTERPRISE BANNER BILLBOARD */}
            <section className="ProAboutBanner">
                <div className="BannerBlurOverlay"></div>
                <div className="BannerContentFrame">
                    <h1>{parklyAboutData.banner.title}</h1>
                    <p>{parklyAboutData.banner.description}</p>
                </div>
            </section>

            {/* SECTION 2: THE HISTORY SPLIT FRAME */}
            <section className="ProAboutJourney">
                <div className="JourneyInfoColumn">
                    <span className="ProTaglineText">{parklyAboutData.journey.tagline}</span>
                    <h2>{parklyAboutData.journey.title}</h2>
                    <p>The foundation of <strong>Parkly</strong> emerged from a real-life frustration shared by a close friend, <strong>Ranjit Maurya</strong>. While heading to a crucial career interview, Ranjit found himself trapped in a nightmare: despite arriving in the area on time, he spent over thirty minutes circling for parking. By the time he found a spot, he was significantly late for his interview. Seeing a friend suffer such a high-stakes setback due to a simple parking issue sparked a mission: <strong>no one should ever miss an opportunity because of a parking spot</strong>.</p>
                    <p>{parklyAboutData.journey.p2}</p>
                    <p>{parklyAboutData.journey.p3}</p>
                </div>
                <div className="JourneyGraphicColumn">
                    <div className="CorporateImageShield">
                        <img src={ImageCenter.OurJourneyImage} alt="Terminal Infrastructure" />
                    </div>
                </div>
            </section>

            {/* SECTION 3: SYSTEM VALUES MESH BENTO CARD LAYOUT */}
            <section className="ProAboutMission">
                <span className="ProTaglineText text-center">{parklyAboutData.mission.tagline}</span>
                <h2>{parklyAboutData.mission.title}</h2>
                <p className="MissionMainSubtitleText">{parklyAboutData.mission.description}</p>

                <div className="MissionBentoMatrix">
                    <div className="MissionValueCard">
                        <div className="ValueIconCap"><img src={ImageCenter.MapIcon} alt="" /></div>
                        <h3>{parklyAboutData.mission.cards[0].title}</h3>
                        <p>{parklyAboutData.mission.cards[0].text}</p>
                    </div>
                    <div className="MissionValueCard ValueCardFeatured">
                        <div className="ValueIconCap"><img src={ImageCenter.QR_Code} alt="" /></div>
                        <h3>{parklyAboutData.mission.cards[1].title}</h3>
                        <p>{parklyAboutData.mission.cards[1].text}</p>
                    </div>
                    <div className="MissionValueCard">
                        <div className="ValueIconCap"><img src={ImageCenter.Customer_Service} alt="" /></div>
                        <h3>{parklyAboutData.mission.cards[2].title}</h3>
                        <p>{parklyAboutData.mission.cards[2].text}</p>
                    </div>
                </div>
            </section>

            {/* SECTION 5: IMMERSIVE ACCENT CTA MODULE */}
            <section className="ProAboutCtaStation">
                <div className="AboutCtaBoxContainer">
                    <div className="BackgroundGraphicLeft"><img src={ImageCenter.BMW_Key} alt="" /></div>
                    <div className="BackgroundGraphicRight"><img src={ImageCenter.Hand_Mobile} alt="" /></div>

                    <div className="CtaTypographyHub">
                        <h2>{parklyAboutData.cta.title}</h2>
                        <p>{parklyAboutData.cta.description}</p>
                        <Link to="/" className="CtaTerminalRedirectBtn">
                            {parklyAboutData.cta.btnText} <i className='bx bx-right-arrow-alt'></i>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CYBER THEME POPUP PROFILE MODAL MODES */}
            {selectedMember && (
                <div className="TeamModalOverlay" onClick={() => setSelectedMember(null)}>
                    <div className="TeamModal" onClick={(e) => e.stopPropagation()}>
                        <button className="CloseModal" onClick={() => setSelectedMember(null)}>✕</button>
                        <img src={selectedMember.img} className="ModalImg" alt="" />
                        <h2>{selectedMember.name}</h2>
                        <p className="ModalRole">{selectedMember.role}</p>
                        <p className="ModalBio">{selectedMember.bio}</p>

                        <div className="ModalSkills">
                            {selectedMember.skills.map((skill, i) => (
                                <span key={i}>{skill}</span>
                            ))}
                        </div>

                        <div className="SocialLinks">
                            <a href={selectedMember.social.instagram} target="_blank" rel="noreferrer"><i className='bx bxl-instagram'></i></a>
                            <a href={selectedMember.social.linkedin} target="_blank" rel="noreferrer"><i className='bx bxl-linkedin'></i></a>
                            <a href={selectedMember.social.email}><i className='bx bx-envelope'></i></a>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default About;