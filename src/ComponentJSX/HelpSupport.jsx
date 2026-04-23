import React, { useState } from "react";
import '../ComponentCSS/HelpSupport.css'
import { Link } from "react-router-dom"; // Removed useNavigate
import Toast from "./Toast";
import emailjs from '@emailjs/browser';

const HelpSupport = () => {
    const [screenshot, setScreenshot] = useState(null);
    const [screenshotPreview, setScreenshotPreview] = useState(null);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("How can we help you?");
    const [loading, setLoading] = useState(false);

    // 1. NEW: State to control the success pop-up
    const [showPopup, setShowPopup] = useState(false);

    const options = [
        "I have an issue with my parking booking.",
        "My Parkly app/website is not working.",
        "I want to share feedback or a suggestion.",
    ];

    const faqs = {
        "I have an issue with my parking booking.": [
            "Where is my booked slot?",
            "Someone is parked in my slot.",
            "QR Code is not scanning at the gate.",
            "Refund for cancellation not received.",
        ],
        "My Parkly app/website is not working.": [
            "Website is crashing.",
            "Location detection is failing.",
            "Payment not going through.",
        ],
        "I want to share feedback or a suggestion.": [
            "I want to suggest a new parking location.",
            "I want to suggest a new feature.",
            "Report website UX/UI issue.",
        ],
    };

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
        if (selected === "How can we help you?") return "Please select a help topic";
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

            // Reset form
            setFormData({ fullName: "", email: "", phone: "", message: "" });
            setSelected("How can we help you?");
            setScreenshot(null);
            setScreenshotPreview(null);

            // 2. NEW: Show the pop-up instead of navigating away
            setShowPopup(true);

        } catch (err) {
            console.error('FAILED...', err);
            setLoading(false);
            showToast("Failed to send request. Please try again.", "error");
        }
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
        <>
            {toast.show && <Toast message={toast.message} type={toast.type} />}

            <section className="HelpSection">
                <section className="HelpSectBanner">
                    <h1>We would love to help you !!</h1>
                </section>

                <section className="HelpFormSection">
                    <form className="HelpForm" onSubmit={handleSubmit}>
                        {/* Dropdown */}
                        <div className="DropContainer">
                            <div className="DropHeader" onClick={() => setOpen(!open)}>
                                <div className="inputAcc"></div>
                                <span className="SelectHelp">{selected}</span>
                                <span className={`Arrow ${open ? "Rotate" : ""}`}>
                                    ▼
                                </span>
                            </div>

                            {open && (
                                <ul className="DropList">
                                    {options.map((opt, i) => (
                                        <li
                                            key={i}
                                            className="DropItem"
                                            onClick={() => {
                                                setSelected(opt);
                                                setOpen(false);
                                            }}
                                        >
                                            {opt}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Suggested FAQs */}
                        {selected !== "How can we help you?" && (
                            <div className="FAQBox">
                                <h3>Suggested Help</h3>
                                <ul>
                                    {faqs[selected].map((f, i) => (
                                        <li key={i} className="faqListItem">
                                            ❓ <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Inputs */}
                        <div className="input-box">
                            <span className="input-accent"></span>
                            <input name="fullName" type="text" className="input-field" value={formData.fullName} onChange={handleChange} placeholder=" " required />
                            <label className="input-label">Full Name</label>
                        </div>

                        <div className="input-box">
                            <span className="input-accent"></span>
                            <input name="email" type="email" className="input-field" value={formData.email} onChange={handleChange} placeholder=" " required />
                            <label className="input-label">Email Address</label>
                        </div>

                        <div className="input-box">
                            <span className="input-accent"></span>
                            <input name="phone" type="text" className="input-field" value={formData.phone} onChange={handleChange} placeholder=" " />
                            <label className="input-label">Phone Number (Optional)</label>
                        </div>

                        <div className="input-box TextAreaBox">
                            <span className="input-accent"></span>
                            <textarea name="message" className="input-field textarea-field" value={formData.message} onChange={handleChange} placeholder=" " required ></textarea>
                            <label className="input-label">Type your message</label>
                            <div className="char-count">{formData.message.length}/400</div>
                        </div>

                        <div className="upload-box" onDragOver={handleDragOver} onDrop={handleDrop}>
                            {!screenshot ? (
                                <div className="upload-content">
                                    <i className="bx bx-upload upload-icon"></i>
                                    <p>Drop screenshot here or <span>browse</span></p>
                                    <input type="file" accept="image/*" onChange={handleScreenshot} />
                                </div>
                            ) : (
                                <div className="upload-preview">
                                    {screenshotPreview && (
                                        <img src={screenshotPreview} alt="screenshot" />
                                    )}
                                    <button type="button" className="remove-file-btn" onClick={() => { setScreenshot(null); setScreenshotPreview(null); }}>
                                        Remove Screenshot
                                    </button>
                                </div>
                            )}
                        </div>

                        <button type="submit" className="SubmitButton" disabled={loading}>
                            {loading ? "Sending..." : "Submit"}
                        </button>
                    </form>

                    {/* Right Side Boxes */}
                    <div className="infoReportBoxes">
                        <div className="SafetyEmergency">
                            <h1>Report a Safety Emergency</h1>
                            <p>We are committed to the safety of <br /> everyone using <strong>Parkly</strong>.</p>
                            <Link to="/reportfraud">Report here</Link>
                        </div>

                        <div className="SafetyEmergency">
                            <h1>Issue with an active booking?</h1>
                            <p>Check your <strong>Booked History</strong> for your ticket details, or call the parking attendant listed on your pass for immediate help.</p>
                        </div>
                    </div>
                </section>
            </section>

            {/* 3. NEW: The Success Pop-up Modal */}
            {showPopup && (
                <div className="SuccessModalOverlay" onClick={() => setShowPopup(false)}>
                    <div className="SuccessModalContent" onClick={(e) => e.stopPropagation()}>
                        <div className="SuccessEmoji">✅</div>
                        <h2>Message Sent!</h2>
                        <p>Thank you for reaching out. Our support team will get back to you at <strong>{formData.email || 'your email'}</strong> as soon as possible.</p>
                        <button className="CloseSuccessBtn" onClick={() => setShowPopup(false)}>
                            Got it
                        </button>
                    </div>
                </div>
            )}

        </>
    );
};

export default HelpSupport;