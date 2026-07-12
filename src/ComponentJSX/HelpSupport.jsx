import React, { useState } from "react";
import '../ComponentCSS/HelpSupport.css';
import { Link } from "react-router-dom";
import Toast from "./Toast";
import emailjs from '@emailjs/browser';
import { parklyHelpData } from "../assets/assest";

const HelpSupport = () => {
    const [screenshot, setScreenshot] = useState(null);
    const [screenshotPreview, setScreenshotPreview] = useState(null);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(parklyHelpData.defaultOption);
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        message: "",
    });

    const [toast, setToast] = useState({ show: false, message: "", type: "" });

    const showToast = (msg, type = "success") => {
        setToast({ show: true, message: msg, type });
        setTimeout(() => setToast({ show: false }), 2500);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        if (selected === parklyHelpData.defaultOption) return "Please select a help topic";
        if (!formData.fullName.trim()) return "Full Name is required";
        if (!/\S+@\S+\.\S+/.test(formData.email)) return "Enter a valid Email Address";
        if (formData.message.length < 10) return "Message must be at least 10 characters";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validate();
        if (error) return showToast(error, "error");

        setLoading(true);

        const templateParams = {
            user_name: formData.fullName,
            user_email: formData.email,
            user_phone: formData.phone || "Not provided",
            help_topic: selected,
            message: formData.message,
        };

        try {
            await emailjs.send(
                'service_tqebzee',
                'template_gx9t3bs',
                templateParams,
                'b1aE1ZGhkj_rEMlbt'
            );
            setLoading(false);
            setShowPopup(true);
        } catch (err) {
            console.error('FAILED...', err);
            setLoading(false);
            showToast("Failed to send request. Please try again.", "error");
        }
    };

    const resetFormSession = () => {
        setFormData({ fullName: "", email: "", phone: "", message: "" });
        setSelected(parklyHelpData.defaultOption);
        setScreenshot(null);
        setScreenshotPreview(null);
        setShowPopup(false);
    };

    const handleScreenshot = (e) => {
        const file = e.target.files[0];
        setScreenshot(file);
        if (file && file.type.startsWith("image/")) {
            setScreenshotPreview(URL.createObjectURL(file));
        } else {
            setScreenshotPreview(null);
        }
    };

    const handleDragOver = (e) => e.preventDefault();

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setScreenshot(file);
        if (file && file.type.startsWith("image/")) {
            setScreenshotPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="ProHelpLayoutContainer">
            {toast.show && <Toast message={toast.message} type={toast.type} />}

            {/* upper section header */}
            <header className="ProHelpHeaderDeck">
                <span className="ProTaglineText">{parklyHelpData.tagline}</span>
                <h1>{parklyHelpData.title}</h1>
            </header>

            <main className="ProHelpGridCore">

                {/* primary dynamic control form console */}
                <form className="ProHelpTerminalForm" onSubmit={handleSubmit}>

                    {/* customized modern drop console container */}
                    <div className="ProHelpDropContainer">
                        <label className="TerminalLabelField">Select Core Category</label>
                        <div className="ProHelpDropHeader" onClick={() => setOpen(!open)}>
                            <span className={selected === parklyHelpData.defaultOption ? "DimText" : "HighlightText"}>
                                {selected}
                            </span>
                            <i className={`bx bx-chevron-down DropChevronIcon ${open ? "RotateIcon" : ""}`}></i>
                        </div>

                        {open && (
                            <ul className="ProHelpDropList">
                                {parklyHelpData.options.map((opt, i) => (
                                    <li key={i} className="ProHelpDropItem" onClick={() => { setSelected(opt); setOpen(false); }}>
                                        {opt}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* interactive dynamic inline query list modules */}
                    {selected !== parklyHelpData.defaultOption && (
                        <div className="ProFAQBentoBox">
                            <h3><i className='bx bx-git-pull-request'></i> Suggested Vector Reference Guides</h3>
                            <ul>
                                {parklyHelpData.faqs[selected].map((f, i) => (
                                    <li key={i} className="ProFaqListItem">
                                        <i className='bx bx-help-circle'></i> <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* text field input decks */}
                    <div className="ProHelpInputGrid">
                        <div className="ProHelpFieldBlock">
                            <label>Full Name</label>
                            <input name="fullName" type="text" value={formData.fullName} onChange={handleChange} placeholder={parklyHelpData.placeholders.name} required />
                        </div>
                        <div className="ProHelpFieldBlock">
                            <label>Email Address</label>
                            <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder={parklyHelpData.placeholders.email} required />
                        </div>
                    </div>

                    <div className="ProHelpFieldBlock">
                        <label>Phone Number (Optional)</label>
                        <input name="phone" type="text" value={formData.phone} onChange={handleChange} placeholder={parklyHelpData.placeholders.phone} />
                    </div>

                    <div className="ProHelpFieldBlock TextareaFieldBlock">
                        <label>Operational Message Log</label>
                        <textarea name="message" value={formData.message} onChange={handleChange} placeholder={parklyHelpData.placeholders.message} maxLength={400} required></textarea>
                        <div className="ProCharCounterText">{formData.message.length} / 400 Characters</div>
                    </div>

                    {/* premium file drag box layer */}
                    <div className="ProUploadTerminalZone" onDragOver={handleDragOver} onDrop={handleDrop}>
                        {!screenshot ? (
                            <div className="ZoneUploadPromptContent">
                                <i className="bx bx-cloud-upload ZoneUploadPromptIcon"></i>
                                <p>Drag and drop support screenshot here or <span className="BrowseActionHighlight">browse local storage</span></p>
                                <input type="file" accept="image/*" onChange={handleScreenshot} />
                            </div>
                        ) : (
                            <div className="ZoneUploadPreviewState">
                                {screenshotPreview && <img src={screenshotPreview} alt="Screenshot Data Matrix" />}
                                <button type="button" className="ZoneRemoveImageCTA" onClick={() => { setScreenshot(null); setScreenshotPreview(null); }}>
                                    Purge Screenshot File
                                </button>
                            </div>
                        )}
                    </div>

                    <button type="submit" className="ProHelpSubmitCTA" disabled={loading}>
                        {loading ? "Transmitting Logs..." : "Submit Support Ticket"}
                    </button>
                </form>

                {/* auxiliary right bento control stations */}
                <aside className="ProHelpAsideConsole">
                    <div className="AsideSystemBentoCard EmergencyRedBorderCard">
                        <h3>{parklyHelpData.sideCards.emergency.title}</h3>
                        <p>{parklyHelpData.sideCards.emergency.description}</p>
                        <Link to="/reportfraud" className="EmergencyTriggerLink">
                            {parklyHelpData.sideCards.emergency.cta} <i className='bx bx-right-arrow-alt'></i>
                        </Link>
                    </div>

                    <div className="AsideSystemBentoCard">
                        <h3>{parklyHelpData.sideCards.activeBooking.title}</h3>
                        <p>{parklyHelpData.sideCards.activeBooking.description}</p>
                    </div>
                </aside>

            </main>

            {/* MODERN CYBER ACCENT DATA VALIDATION SUCCESS MODAL */}
            {showPopup && (
                <div className="ProModalOverlay">
                    <div className="ProModalCard TextAlignCenter">
                        <div className="CyberModalSuccessIcon"><i className='bx bx-check-shield'></i></div>
                        <h2>{parklyHelpData.successModal.title}</h2>
                        <p>{parklyHelpData.successModal.description}<strong>{formData.email || 'your registered vector link'}</strong>.</p>
                        <button className="ProModalSubmitBtn CustomWidthBtn" onClick={resetFormSession}>
                            {parklyHelpData.successModal.btnText}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HelpSupport;