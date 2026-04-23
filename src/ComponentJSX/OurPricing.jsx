import React from 'react'
import '../ComponentCSS/OurPricing.css'

const OurPricing = () => {
    return (
        <>
            <div className="PricingSection">
                <div className='Heading_Of_Pricing'>
                    <h1>Our Pricing</h1>
                </div>
                <div className="PricingCards">
                    <div className="PricingCard DownBoxSet">
                        <div className="CircleBox">
                            <span>₹ 35</span>
                        </div>

                        <h3>Basic</h3>
                        <p>The Basic Plan (₹35) offers an affordable, budget-friendly parking solution. It provides essential,
                            reliable spots for short-term stays, ensuring a seamless and cost-effective urban parking experience.</p>
                    </div>
                    <div className="PricingCard">
                        <div className="CircleBox">
                            <span>₹ 75</span>
                        </div>

                        <h3>Premium</h3>
                        <p>The Premium Plan (₹75) delivers the ultimate parking experience, offering prime, high-security spots
                            and priority access. It ensures maximum convenience and peace of mind for drivers.</p>
                    </div>
                    <div className="PricingCard DownBoxSet">
                        <div className="CircleBox">
                            <span>₹ 50</span>
                        </div>

                        <h3>Standard</h3>
                        <p>The Standard Plan (₹45) strikes the perfect balance between affordability and convenience. It offers
                            a reliable, mid-tier parking solution for everyday drivers seeking quality and value.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OurPricing