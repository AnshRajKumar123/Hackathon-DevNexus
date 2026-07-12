import React, { useState, useEffect } from 'react';
import '../ComponentCSS/BookedHistory.css';
import { parklyHistoryData } from '../assets/assest';

const BookedHistory = () => {
    const [history, setHistory] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [activeTab, setActiveTab] = useState('All');

    useEffect(() => {
        const savedHistory = localStorage.getItem('parkingHistory');
        if (savedHistory) {
            const parsed = JSON.parse(savedHistory);
            const sorted = parsed.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            setHistory(sorted);
        }
    }, []);

    useEffect(() => {
        if (selectedTicket) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedTicket]);

    const getTicketStatus = (ticket) => {
        if (ticket.status === 'Cancelled') return 'Cancelled';

        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        const currentDate = `${yyyy}-${mm}-${dd}`;
        const currentTime = now.toTimeString().substring(0, 5);

        if (ticket.date < currentDate || (ticket.date === currentDate && ticket.outTime <= currentTime)) {
            return 'Completed';
        }
        return 'Upcoming';
    };

    const handleCancelBooking = (bookingIdToCancel) => {
        const isConfirmed = window.confirm("Are you sure you want to cancel this booking? The slots will be released.");
        if (!isConfirmed) return;

        const bookingToCancel = history.find(b => b.bookingId === bookingIdToCancel);
        if (!bookingToCancel) return;
        const slotsToFree = bookingToCancel.slots;

        const updatedHistory = history.map(b =>
            b.bookingId === bookingIdToCancel ? { ...b, status: 'Cancelled' } : b
        );

        setHistory(updatedHistory);
        localStorage.setItem('parkingHistory', JSON.stringify(updatedHistory));

        const savedBookedSlots = JSON.parse(localStorage.getItem('bookedParkingSlots')) || [];
        const updatedBookedSlots = savedBookedSlots.filter(slotId => !slotsToFree.includes(slotId));
        localStorage.setItem('bookedParkingSlots', JSON.stringify(updatedBookedSlots));
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const filteredHistory = history.filter(ticket => {
        if (activeTab === 'All') return true;
        return getTicketStatus(ticket) === activeTab;
    });

    const getBadgeClass = (status) => {
        switch (status) {
            case 'Upcoming': return 'badge-upcoming';
            case 'Completed': return 'badge-completed';
            case 'Cancelled': return 'badge-cancelled';
            default: return 'badge-completed';
        }
    };

    return (
        <div className='ProHistoryWrapper'>
            <div className="HistoryHeadlineBlock">
                <h1>{parklyHistoryData.title}</h1>
                <p className="SelectedLocText">{parklyHistoryData.subtitle}</p>
            </div>

            {/* Navigation Tabs System */}
            <div className="ProHistoryTabsContainer">
                {parklyHistoryData.tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`ProHistoryTabBtn ${activeTab === tab ? 'tab-active' : ''}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {filteredHistory.length === 0 ? (
                /* Professional Empty State */
                <div className="ProHistoryEmptyState">
                    <i className='bx bx-folder-open EmptyFolderIcon'></i>
                    <h3>{parklyHistoryData.emptyState.title}</h3>
                    <p>{parklyHistoryData.emptyState.description}</p>
                </div>
            ) : (
                /* Clean Structured History List */
                <div className="ProHistoryListContainer">
                    {filteredHistory.map((booking, index) => {
                        const status = getTicketStatus(booking);
                        const badgeClass = getBadgeClass(status);

                        return (
                            <div key={index} className="ProHistoryCard">
                                <span className={`ProStatusBadge ${badgeClass}`}>
                                    {status}
                                </span>

                                <div className="ProHistoryCardContent">
                                    <h3 className="ProHistoryCardDate">{booking.date}</h3>
                                    <p className="ProHistoryCardBookedOn">Logged on: {formatDate(booking.timestamp)}</p>

                                    <div className="ProCardMetaGroup">
                                        <div className="MetaItem"><span>ID:</span> <strong>{booking.bookingId}</strong></div>
                                        <div className="MetaItem"><span>Slots:</span> <strong>{booking.slots.join(', ')}</strong></div>
                                        <div className="MetaItem"><span>Window:</span> <strong>{booking.inTime} - {booking.outTime}</strong></div>
                                        <div className="MetaItem"><span>Vehicle:</span> <strong>{booking.plateNumber}</strong></div>
                                    </div>
                                </div>

                                <div className="ProHistoryCardActions">
                                    {status === 'Upcoming' && (
                                        <button className="ProCancelTicketBtn" onClick={() => handleCancelBooking(booking.bookingId)}>
                                            Abort Log
                                        </button>
                                    )}

                                    <button className="ProViewTicketBtn" onClick={() => setSelectedTicket(booking)}>
                                        Open Token
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Clean Cyber Themed Modal Layer */}
            {selectedTicket && (
                <div className="ProModalOverlay" onClick={() => setSelectedTicket(null)}>
                    <div className="ProModalCard ProTicketCardBox RelativeModal" onClick={(e) => e.stopPropagation()}>

                        <span className={`ProStatusBadge ModalBadge ${getBadgeClass(getTicketStatus(selectedTicket))}`}>
                            {getTicketStatus(selectedTicket)}
                        </span>

                        <div className="ProTicketBannerHeader">
                            <h2>{parklyHistoryData.ticketModal.title}</h2>
                            <p>{parklyHistoryData.ticketModal.subtitle}</p>
                        </div>

                        <div className="ProTicketDataBody">
                            <div className="ProTicketQRContainer">
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(selectedTicket.bookingId)}`}
                                    alt="Access Token QR"
                                    className={getTicketStatus(selectedTicket) === 'Cancelled' ? 'FadedQR' : ''}
                                />
                                <h3 className={getTicketStatus(selectedTicket) === 'Cancelled' ? 'StrikeText' : ''}>
                                    {selectedTicket.bookingId}
                                </h3>
                            </div>

                            <div className="ProTicketDataRows">
                                <div className="ProTicketRow"><span>Identity:</span> <strong>{selectedTicket.name}</strong></div>
                                <div className="ProTicketRow"><span>Schedule:</span> <strong>{selectedTicket.date}</strong></div>
                                <div className="ProTicketRow"><span>Duration:</span> <strong>{selectedTicket.inTime} to {selectedTicket.outTime}</strong></div>
                                <div className="ProTicketRow"><span>Allocations:</span> <strong>{selectedTicket.slots.join(', ')}</strong></div>
                                <div className="ProTicketRow"><span>Vehicle ID:</span> <strong>{selectedTicket.plateNumber}</strong></div>
                                <div className="ProTicketRow AmountPaidRow">
                                    <span>Authorized Total:</span> <strong className="AmountPaidValue">₹{selectedTicket.amount}</strong>
                                </div>
                            </div>
                        </div>

                        <div className="ProModalActionTriggers AlignmentCenter MarginTop20">
                            <button className="ProModalCancelBtn" onClick={() => setSelectedTicket(null)}>{parklyHistoryData.ticketModal.closeBtn}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookedHistory;