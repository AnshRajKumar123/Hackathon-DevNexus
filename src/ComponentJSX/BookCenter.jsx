import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../ComponentCSS/BookCenter.css';
import { ImageCenter, parklyBookData } from '../assets/assest';

const BookCenter = () => {
    const location = useLocation();

    const savedDestination = JSON.parse(localStorage.getItem('selectedParkingDestination')) || {};
    const selectedAddress = location.state?.selectedAddress || savedDestination.selectedAddress;

    const [activeSection, setActiveSection] = useState("A1");
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [currentTimeObj, setCurrentTimeObj] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTimeObj(new Date()), 30000);
        return () => clearInterval(timer);
    }, []);

    const [parkingHistory, setParkingHistory] = useState(() => {
        const savedHistory = localStorage.getItem('parkingHistory');
        return savedHistory ? JSON.parse(savedHistory) : [];
    });

    const [showModal, setShowModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showTicketModal, setShowTicketModal] = useState(false);
    const [currentTicket, setCurrentTicket] = useState(null);

    const [formData, setFormData] = useState(() => {
        const savedProfile = localStorage.getItem('userParkingProfile');
        const profile = savedProfile ? JSON.parse(savedProfile) : {};
        return {
            name: profile.name || '',
            phone: profile.phone || '',
            carModel: profile.carModel || '',
            plateNumber: profile.plateNumber || '',
            bookingDate: '',
            inTime: '',
            outTime: ''
        };
    });

    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (showModal || showPaymentModal || showTicketModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [showModal, showPaymentModal, showTicketModal]);

    const minDate = currentTimeObj.toISOString().split('T')[0];
    const maxDateObj = new Date(currentTimeObj);
    maxDateObj.setDate(currentTimeObj.getDate() + 7);
    const maxDate = maxDateObj.toISOString().split('T')[0];

    const sections = [
        { id: "A1", total: 60 }, { id: "A2", total: 50 }, { id: "A3", total: 65 },
        { id: "B1", total: 70 }, { id: "B2", total: 50 }, { id: "B3", total: 45 },
        { id: "C1", total: 30 }, { id: "C2", total: 40 }, { id: "C3", total: 60 },
    ];

    const currentSectionData = sections.find(sec => sec.id === activeSection);
    const totalSlotsForActiveSection = currentSectionData ? currentSectionData.total : 60;

    const slots = Array.from({ length: totalSlotsForActiveSection }, (_, i) => {
        const slotNumber = i + 1;
        const formattedNumber = slotNumber < 10 ? `0${slotNumber}` : slotNumber;
        let category = "Basic";
        let price = 35;
        if (slotNumber <= Math.ceil(totalSlotsForActiveSection * 0.15)) {
            category = "Premium";
            price = 70;
        } else if (slotNumber <= Math.ceil(totalSlotsForActiveSection * 0.45)) {
            category = "Standard";
            price = 50;
        }
        return {
            id: `${activeSection}-${formattedNumber}`,
            label: `${activeSection}-${formattedNumber}`,
            category: category,
            price: price
        };
    });

    const columns = [];
    const slotsPerColumn = Math.ceil(totalSlotsForActiveSection / 5);
    for (let i = 0; i < 5; i++) {
        columns.push(slots.slice(i * slotsPerColumn, (i + 1) * slotsPerColumn));
    }

    const yyyy = currentTimeObj.getFullYear();
    const mm = String(currentTimeObj.getMonth() + 1).padStart(2, '0');
    const dd = String(currentTimeObj.getDate()).padStart(2, '0');
    const currentDate = `${yyyy}-${mm}-${dd}`;
    const currentTime = currentTimeObj.toTimeString().substring(0, 5);

    const activeBookedSlots = [];
    const bookedSlotDetails = {};

    parkingHistory.forEach(ticket => {
        if (ticket.date > currentDate || (ticket.date === currentDate && ticket.outTime > currentTime)) {
            ticket.slots.forEach(slotId => {
                activeBookedSlots.push(slotId);
                bookedSlotDetails[slotId] = { date: ticket.date, outTime: ticket.outTime };
            });
        }
    });

    const handleSectionChange = (secId) => {
        setActiveSection(secId);
        setSelectedSlots([]);
    };

    const handleSlotClick = (slotId) => {
        if (activeBookedSlots.includes(slotId)) return;
        setSelectedSlots((prev) => prev.includes(slotId) ? prev.filter(id => id !== slotId) : [...prev, slotId]);
    };

    const totalPrice = selectedSlots.reduce((sum, slotId) => {
        const slot = slots.find(s => s.id === slotId);
        return sum + (slot ? slot.price : 0);
    }, 0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            setFormData({ ...formData, [name]: value.replace(/\D/g, '').slice(0, 10) });
        } else if (name === 'plateNumber') {
            setFormData({ ...formData, [name]: value.toUpperCase() });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        setFormErrors({ ...formErrors, [name]: '' });
    };

    const validateForm = () => {
        let errors = {};
        if (!formData.name.trim()) errors.name = "Required";
        if (formData.phone.length !== 10) errors.phone = "10 digits required";
        if (!formData.carModel.trim()) errors.carModel = "Required";
        const plateRegex = /^[A-Z]{2}[ -]?[0-9]{1,2}[ -]?[A-Z]{1,3}[ -]?[0-9]{4}$/;
        if (!plateRegex.test(formData.plateNumber)) errors.plateNumber = "Invalid format";
        if (!formData.bookingDate) errors.bookingDate = "Required";
        if (!formData.inTime) errors.inTime = "Required";
        if (!formData.outTime) errors.outTime = "Required";
        if (formData.inTime && formData.outTime && formData.inTime >= formData.outTime) errors.outTime = "Must be after In-time";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const generateBookingID = () => {
        return 'PRK-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    };

    const handleProceedToPayment = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setShowModal(false);
            setShowPaymentModal(true);
        }
    };

    const handleFinalBooking = () => {
        localStorage.setItem('userParkingProfile', JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            carModel: formData.carModel,
            plateNumber: formData.plateNumber
        }));

        const ticketData = {
            bookingId: generateBookingID(),
            name: formData.name,
            date: formData.bookingDate,
            inTime: formData.inTime,
            outTime: formData.outTime,
            slots: selectedSlots,
            plateNumber: formData.plateNumber,
            amount: totalPrice,
            timestamp: new Date().toISOString()
        };

        const existingHistory = JSON.parse(localStorage.getItem('parkingHistory')) || [];
        const updatedHistory = [...existingHistory, ticketData];
        localStorage.setItem('parkingHistory', JSON.stringify(updatedHistory));
        setParkingHistory(updatedHistory);

        const existingBooked = JSON.parse(localStorage.getItem('bookedParkingSlots')) || [];
        localStorage.setItem('bookedParkingSlots', JSON.stringify([...new Set([...existingBooked, ...selectedSlots])]));

        setCurrentTicket(ticketData);
        setShowPaymentModal(false);
        setShowTicketModal(true);

        setSelectedSlots([]);
        setFormData(prev => ({ ...prev, bookingDate: '', inTime: '', outTime: '' }));
    };

    const filledInActiveSection = activeBookedSlots.filter(id => id.startsWith(activeSection)).length;

    const formatReleaseTime = (dateStr, timeStr) => {
        if (!dateStr || !timeStr) return "";
        const [, month, day] = dateStr.split('-');
        return `${month}/${day} ${timeStr}`;
    };

    return (
        <div className='ProBookCenterWrapper'>
            <div className="TerminalHeadlineBlock">
                <h1>{parklyBookData.title}</h1>
                <p className="SelectedLocText">📍 {selectedAddress || parklyBookData.fallbackAddress}</p>
            </div>

            {/* Slider Sectors Mapping Array Layout */}
            <div className="ProSectorSliderTrack">
                {sections.map((sec) => (
                    <button
                        key={sec.id}
                        className={`SectorToggleBox ${activeBookedSlots.filter(id => id.startsWith(sec.id)).length >= sec.total ? 'sector-saturated' : ''} ${activeSection === sec.id ? 'sector-active' : ''}`}
                        onClick={() => !(activeBookedSlots.filter(id => id.startsWith(sec.id)).length >= sec.total) && handleSectionChange(sec.id)}
                    >
                        Sector {sec.id}
                    </button>
                ))}
            </div>

            {/* Main Interactive Matrix Dashboard */}
            <div className="TerminalBentoConsole">
                <div className="TerminalConsoleHeader">
                    <h2>Active Sector Console: {activeSection}</h2>
                    <span>Vacancy Rate: {totalSlotsForActiveSection - filledInActiveSection} / {totalSlotsForActiveSection} Slots Available</span>
                </div>

                <div className="ProParkingGridBlueprint">
                    {columns.map((col, index) => (
                        <React.Fragment key={index}>
                            <div className="ProBlueprintColumn">
                                {col.map((slot) => {
                                    const isBooked = activeBookedSlots.includes(slot.id);
                                    const isSelected = selectedSlots.includes(slot.id);
                                    const releaseInfo = bookedSlotDetails[slot.id];

                                    return (
                                        <div
                                            key={slot.id}
                                            className={`ProBlueprintSlot ${isBooked ? 'slot-occupied' : ''} ${isSelected && !isBooked ? 'slot-selected' : ''}`}
                                            onClick={() => handleSlotClick(slot.id)}
                                        >
                                            {isBooked ? (
                                                <>
                                                    <i className='bx bxs-car ProCarIcon'></i>
                                                    <span className="ProSlotNum">{slot.label}</span>
                                                    {releaseInfo && (
                                                        <span className="ProReleaseTimer">
                                                            {formatReleaseTime(releaseInfo.date, releaseInfo.outTime)}
                                                        </span>
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    <span className="ProSlotNum">{slot.label}</span>
                                                    <span className="ProSlotCat">{slot.category}</span>
                                                    <span className="ProSlotPrice">₹{slot.price}</span>
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            {index < 4 && <div className="ProBlueprintAisle"><div className="AisleDashedLine"></div></div>}
                        </React.Fragment>
                    ))}
                </div>

                <div className="TerminalActionFooter">
                    <button className="ProConfirmCTA" disabled={selectedSlots.length === 0} onClick={() => setShowModal(true)}>
                        {selectedSlots.length > 0 ? `Initialize Booking Profile (${selectedSlots.length}) — ₹${totalPrice}` : 'Select Operational Slots'}
                    </button>
                </div>
            </div>

            {/* --- MODAL 1: FORM CONFIGURATION --- */}
            {showModal && (
                <div className="ProModalOverlay">
                    <div className="ProModalCard">
                        <h2>{parklyBookData.modalDetails.title}</h2>
                        <p className="ProModalSubText">Operational Vectors: {selectedSlots.join(', ')}</p>

                        <form onSubmit={handleProceedToPayment} className="ProTerminalForm">
                            <div className="ProFormInputGroup">
                                <label>1. Authorized Operator Name</label>
                                <input type="text" name="name" value={formData.name} placeholder='Operator Identity' onChange={handleInputChange} />
                                {formErrors.name && <span className="ProFieldErrorText">{formErrors.name}</span>}
                            </div>
                            <div className="ProFormInputGroup">
                                <label>2. Communications Number</label>
                                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="10 Digits Vector" />
                                {formErrors.phone && <span className="ProFieldErrorText">{formErrors.phone}</span>}
                            </div>
                            <div className="ProFormInputGroup">
                                <label>3. Vehicle Registry Model</label>
                                <input type="text" name="carModel" value={formData.carModel} placeholder='e.g., Bolero Neo' onChange={handleInputChange} />
                                {formErrors.carModel && <span className="ProFieldErrorText">{formErrors.carModel}</span>}
                            </div>
                            <div className="ProFormInputGroup">
                                <label>4. License Plate Matrix</label>
                                <input type="text" name="plateNumber" value={formData.plateNumber} onChange={handleInputChange} placeholder="DL 01 AB 1234" />
                                {formErrors.plateNumber && <span className="ProFieldErrorText">{formErrors.plateNumber}</span>}
                            </div>
                            <div className="ProFormInputRow">
                                <div className="ProFormInputGroup input-half">
                                    <label>5. Allocation Date</label>
                                    <input type="date" name="bookingDate" value={formData.bookingDate} onChange={handleInputChange} min={minDate} max={maxDate} />
                                    {formErrors.bookingDate && <span className="ProFieldErrorText">{formErrors.bookingDate}</span>}
                                </div>
                            </div>
                            <div className="ProFormInputRow">
                                <div className="ProFormInputGroup input-half">
                                    <label>6a. Ingress Vector Time</label>
                                    <input type="time" name="inTime" value={formData.inTime} onChange={handleInputChange} />
                                    {formErrors.inTime && <span className="ProFieldErrorText">{formErrors.inTime}</span>}
                                </div>
                                <div className="ProFormInputGroup input-half">
                                    <label>6b. Egress Vector Time</label>
                                    <input type="time" name="outTime" value={formData.outTime} onChange={handleInputChange} />
                                    {formErrors.outTime && <span className="ProFieldErrorText">{formErrors.outTime}</span>}
                                </div>
                            </div>

                            <div className="ProModalActionTriggers">
                                <button type="button" className="ProModalCancelBtn" onClick={() => setShowModal(false)}>{parklyBookData.modalDetails.cancelBtn}</button>
                                <button type="submit" className="ProModalSubmitBtn">{parklyBookData.modalDetails.payBtn}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* --- MODAL 1.5: SECURE PAYMENT TERMINAL --- */}
            {showPaymentModal && (
                <div className="ProModalOverlay">
                    <div className="ProModalCard TextAlignCenter">
                        <h2>{parklyBookData.modalPayment.title}</h2>
                        <p className="ProModalSubText">{parklyBookData.modalPayment.subtitle}</p>

                        <div className="ProSecurePaymentDisplay">
                            <div className="ProQRShield">
                                <img src={ImageCenter.MyQRCode} alt="Clearing QR Token" />
                            </div>
                            <div className="ProTotalMetricsBox">
                                <p>{parklyBookData.modalPayment.amountLabel}</p>
                                <h3 className="ProCryptoPrice">₹{totalPrice}</h3>
                            </div>
                        </div>

                        <div className="ProModalActionTriggers AlignmentCenter">
                            <button
                                type="button"
                                className="ProModalCancelBtn"
                                onClick={() => {
                                    setShowPaymentModal(false);
                                    setShowModal(true);
                                }}
                            >
                                {parklyBookData.modalPayment.backBtn}
                            </button>
                            <button type="button" className="ProModalSubmitBtn" onClick={handleFinalBooking}>
                                {parklyBookData.modalPayment.confirmBtn}
                            </button>
                        </div>

                        <p className="ProTerminalRightsText">{parklyBookData.modalPayment.copyright}</p>
                    </div>
                </div>
            )}

            {/* --- MODAL 2: SUCCESS RECEIPT TOKEN --- */}
            {showTicketModal && currentTicket && (
                <div className="ProModalOverlay">
                    <div className="ProModalCard ProTicketCardBox">
                        <div className="ProTicketBannerHeader">
                            <h2>{parklyBookData.modalTicket.title}</h2>
                            <p>{parklyBookData.modalTicket.subtitle}</p>
                        </div>

                        <div className="ProTicketDataBody">
                            <div className="ProTicketQRContainer">
                                <img
                                    src={"https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=8&data=" + encodeURIComponent(window.location.origin + "/bookedhistory?ticket=" + currentTicket.bookingId)}
                                    alt="Validated Pass QR"
                                />
                                <h3>{currentTicket.bookingId}</h3>
                            </div>

                            <div className="ProTicketDataRows">
                                <div className="ProTicketRow"><span>Identity:</span> <strong>{currentTicket.name}</strong></div>
                                <div className="ProTicketRow"><span>Schedule:</span> <strong>{currentTicket.date}</strong></div>
                                <div className="ProTicketRow"><span>Duration:</span> <strong>{currentTicket.inTime} to {currentTicket.outTime}</strong></div>
                                <div className="ProTicketRow"><span>Allocations:</span> <strong>{currentTicket.slots.join(', ')}</strong></div>
                                <div className="ProTicketRow"><span>Vehicle ID:</span> <strong>{currentTicket.plateNumber}</strong></div>
                            </div>
                        </div>

                        <div className="ProModalActionTriggers AlignmentCenter MarginTop20">
                            <button className="ProModalSubmitBtn" onClick={() => setShowTicketModal(false)}>{parklyBookData.modalTicket.closeBtn}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookCenter;