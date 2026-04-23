import React from 'react'
import '../ComponentCSS/Features.css'
import { ImageCenter } from '../assets/assest'

const Features = () => {
    return (
        <>
            <section className='FeatureSection'>
                <div className="FeatureForBorder">
                    <div className="FeatThr">
                        <div className="ImageBoxSet">
                            <img src={ImageCenter.MoneySign} />
                        </div>
                        <h3>Save Money</h3>
                        <p>Find the most competitive rates in the city. Compare prices instantly and enjoy exclusive discounts when you book in advance.</p>
                    </div>
                    <div className="FeatThr">
                        <div className="ImageBoxSet">
                            <img src={ImageCenter.Watch} />
                        </div>
                        <h3>Save Time</h3>
                        <p>Stop circling the block. Pinpoint your perfect spot in seconds and navigate directly to your reserved space without any delays.</p>
                    </div>
                    <div className="FeatThr">
                        <div className="ImageBoxSet">
                            <img src={ImageCenter.ManStress} />
                        </div>
                        <h3>Save Stress</h3>
                        <p>Experience total peace of mind. Secure your parking before you leave home and arrive knowing a spot is waiting for you.</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Features