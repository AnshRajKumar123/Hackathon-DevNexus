import React from 'react';
import '../ComponentCSS/Features.css';
import { parklyFeaturesData } from '../assets/assest';

const Features = () => {
    return (
        <section className='ProFeaturesContainer'>
            {/* Header Track Panel Block */}
            <div className="FeaturesSectionHeader">
                <span className="FeatureTagline">{parklyFeaturesData.header.tagline}</span>
                <h2>{parklyFeaturesData.header.title}</h2>
            </div>

            {/* Premium Synchronized Bento Modular Row */}
            <div className="ProFeaturesGrid">
                {parklyFeaturesData.items.map((feature, idx) => (
                    <div key={idx} className="ProFeatureCard">
                        <div className="FeatureIconShield">
                            <i className={feature.icon}></i>
                        </div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                        
                        {/* High-end ambient visual tech outline trace layer */}
                        <div className="CardCyberGlowBorder"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;