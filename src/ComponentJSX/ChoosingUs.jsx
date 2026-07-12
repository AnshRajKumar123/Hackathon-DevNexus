import React from 'react';
import '../ComponentCSS/ChoosingUs.css';
import { ImageCenter, parklyChoosingData } from '../assets/assest';

const ChoosingUs = () => {
    return (
        <section className='ProChoosingSection'>
            
            {/* Left Console Split Frame */}
            <div className="ChoosingLeftSider">
                <span className="ChoosingTagline">{parklyChoosingData.tagline}</span>
                <h1>{parklyChoosingData.title}</h1>
                <p>{parklyChoosingData.description}</p>
                <button className='ProEnterpriseBtn'>
                    {parklyChoosingData.cta} <i className='bx bx-right-arrow-alt'></i>
                </button>
            </div>

            {/* Right Quad Visual Matrix Frame */}
            <div className="ChoosingRightSider">
                <div className="MatrixQuadRow">
                    <div className="MatrixImageWrapper">
                        <img src={ImageCenter.Photo1} alt="Terminal System 1" />
                    </div>
                    <div className="MatrixImageWrapper SpacerDown">
                        <img src={ImageCenter.Photo2} alt="Terminal System 2" />
                    </div>
                </div>
                <div className="MatrixQuadRow">
                    <div className="MatrixImageWrapper SpacerUp">
                        <img src={ImageCenter.Photo3} alt="Terminal System 3" />
                    </div>
                    <div className="MatrixImageWrapper">
                        <img src={ImageCenter.Photo4} alt="Terminal System 4" />
                    </div>
                </div>
            </div>

        </section>
    );
};

export default ChoosingUs;