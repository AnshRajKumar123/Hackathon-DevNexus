import React from 'react';
import '../ComponentCSS/OurPricing.css';
import { parklyPricingData } from '../assets/assest';

const OurPricing = () => {
    return (
        <section className="ProPricingSection">
            {/* Upper Global Section Header */}
            <div className="PricingHeaderDeck">
                <span className="PricingTagline">{parklyPricingData.tagline}</span>
                <h1>{parklyPricingData.title}</h1>
            </div>

            {/* Premium Immersive Tier Container Mesh */}
            <div className="ProPricingCardsGrid">
                {parklyPricingData.plans.map((plan, idx) => (
                    <div
                        key={idx}
                        className={`ProPricingCard ${plan.isFeatured ? 'TierFeatured' : ''}`}
                        style={{ '--card-bg-img': `url(${plan.bgImage})` }}
                    >
                        {/* Immersive Structural Image Layer + Glass Overlay */}
                        <div className="CardImageBackground"></div>
                        <div className="CardGlassOverlay"></div>

                        {/* Text Metadata Console Content */}
                        <div className="CardPricingContent">
                            <span className="PlanTierTitle">{plan.title}</span>

                            <div className="PlanRateMatrix">
                                <span className="PlanPriceText">{plan.price}</span>
                                <span className="PlanPeriodText">{plan.period}</span>
                            </div>

                            <p className="PlanDescriptionText">{plan.description}</p>

                            <button className="PlanSelectionCTA">
                                Select Plan <i className='bx bx-right-arrow-alt'></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OurPricing;