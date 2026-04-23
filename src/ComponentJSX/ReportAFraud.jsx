import React, { useState } from "react";
import '../ComponentCSS/ReportAFraud.css'
import { Link } from "react-router-dom";
import Toast from "./Toast";
import emailjs from '@emailjs/browser';

const ReportFraud = () => {
    const [formData, setFormData] = useState({
        fullName: "", email: "", mobile: "",
        accusedName: "", city: "", message: "",
    });
    const [reason, setReason] = useState("");
    const [evidence, setEvidence] = useState(null);
    const [evidencePreview, setEvidencePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: "", type: "" });

    // 1. NEW: State to control the success pop-up
    const [showPopup, setShowPopup] = useState(false);

    const fraudReasons = [
        "Payment Fraud", "Fake Booking Activity", "Scam Call / Message",
        "Suspicious Parking Profile", "Impersonation of Parkly Team", "Other",
    ];

    const showToast = (msg, type = "success") => {
        setToast({ show: true, message: msg, type });
        setTimeout(() => setToast({ show: false }), 2500);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFile = (e) => {
        const file = e.target.files[0];
        setEvidence(file);
        if (file && file.type.startsWith("image/")) {
            setEvidencePreview(URL.createObjectURL(file));
        } else {
            setEvidencePreview(null);
        }
    };

    const handleDragOver = (e) => e.preventDefault();
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setEvidence(file);
        if (file && file.type.startsWith("image/")) {
            setEvidencePreview(URL.createObjectURL(file));
        } else {
            setEvidencePreview(null);
        }
    };

    const validateForm = () => {
        if (!formData.fullName.trim()) return "Full Name is required";
        if (!/\S+@\S+\.\S+/.test(formData.email)) return "Invalid email address";
        if (!/^[0-9]{10}$/.test(formData.mobile)) return "Mobile number must be 10 digits";
        if (!formData.accusedName.trim()) return "Accused entity is required";
        if (!formData.city.trim()) return "City is required";
        if (!reason) return "Please select the fraud type";
        if (formData.message.length < 20) return "Message must be at least 20 characters";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const error = validateForm();
        if (error) {
            showToast(error, "error");
            return;
        }

        setLoading(true);

        const templateParams = {
            user_name: formData.fullName,
            user_email: formData.email,
            user_mobile: formData.mobile,
            accused_name: formData.accusedName,
            user_city: formData.city,
            fraud_type: reason,
            message: formData.message,
        };

        try {
            await emailjs.send(
                'service_tqebzee',    // e.g., 'service_abc123'
                'template_vpp2w4c',   // e.g., 'template_xyz456'
                templateParams,
                'b1aE1ZGhkj_rEMlbt'     // e.g., 'user_a1b2c3d4e5'
            );

            setLoading(false);

            // Reset form
            setFormData({
                fullName: "", email: "", mobile: "",
                accusedName: "", city: "", message: "",
            });
            setReason("");
            setEvidence(null);
            setEvidencePreview(null);

            // 2. NEW: Show the pop-up instead of redirecting
            setShowPopup(true);

        } catch (err) {
            console.error('FAILED...', err);
            setLoading(false);
            showToast("Failed to send report. Please try again.", "error");
        }
    };

    return (
        <>
            {toast.show && <Toast message={toast.message} type={toast.type} />}

            <section className="ReportSection">
                <section className="HelpSectBanner">
                    <h1>Report a Potential Fraud</h1>
                </section>

                <section className="HelpFormSection">
                    <form className="HelpForm" onSubmit={handleSubmit}>

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
                            <input name="mobile" type="text" className="input-field" value={formData.mobile} onChange={handleChange} placeholder=" " required />
                            <label className="input-label">Mobile Number</label>
                        </div>

                        <div className="input-box">
                            <span className="input-accent"></span>
                            <input name="accusedName" type="text" className="input-field" value={formData.accusedName} onChange={handleChange} placeholder=" " required />
                            <label className="input-label">Person / Organization Being Reported</label>
                        </div>

                        <div className="input-box">
                            <span className="input-accent"></span>
                            <input name="city" type="text" className="input-field" value={formData.city} onChange={handleChange} placeholder=" " required />
                            <label className="input-label">City</label>
                        </div>

                        <div className="fraud-reason-section">
                            <h3>Select Type of Fraud</h3>
                            <div className="fraud-reason-options">
                                {fraudReasons.map((r) => (
                                    <label key={r} className="reasonLabel">
                                        <input type="radio" value={r} checked={reason === r} onChange={(e) => setReason(e.target.value)} />
                                        <span>{r}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="input-box TextAreaBox">
                            <span className="input-accent"></span>
                            <textarea name="message" className="input-field textarea-field" value={formData.message} onChange={handleChange} placeholder=" " required ></textarea>
                            <label className="input-label">Message (Details)</label>
                            <div className="char-count">{formData.message.length}/500</div>
                        </div>

                        <div className="upload-box" onDragOver={handleDragOver} onDrop={handleDrop}>
                            {!evidence ? (
                                <div className="upload-content">
                                    <i className="bx bx-upload upload-icon"></i>
                                    <p>Drag & drop evidence here or <span>browse</span></p>
                                    <input type="file" accept="image/*,application/pdf" onChange={handleFile} />
                                </div>
                            ) : (
                                <div className="upload-preview">
                                    {evidencePreview ? (
                                        <img src={evidencePreview} alt="Preview" />
                                    ) : (
                                        <div className="pdf-preview">
                                            <i className="bx bxs-file-pdf pdf-icon"></i>
                                            <p>{evidence.name}</p>
                                        </div>
                                    )}
                                    <button type="button" className="remove-file-btn" onClick={() => { setEvidence(null); setEvidencePreview(null); }}>Remove</button>
                                </div>
                            )}
                        </div>

                        <p className="SomeTermsOfCond">
                            This channel is only for reporting suspected fraud or violation of
                            Parkly’s Code of Conduct. Not for booking-related issues.
                        </p>

                        <button type="submit" className="SubmitButton" disabled={loading}>
                            {loading ? "Submitting..." : "Submit Report"}
                        </button>
                    </form>

                    <div className="infoReportBoxes">
                        <div className="SafetyEmergency">
                            <h1>Disclaimer</h1>
                            <p>Please use this form only to report potential fraud. For any parking booking or general help:</p>
                            <Link to="/help-support">Contact Support Here</Link>
                        </div>
                    </div>
                </section>
            </section>

            {/* 3. NEW: The Success Pop-up Modal */}
            {showPopup && (
                <div className="SuccessModalOverlay" onClick={() => setShowPopup(false)}>
                    <div className="SuccessModalContent" onClick={(e) => e.stopPropagation()}>
                        <div className="SuccessEmoji">✅</div>
                        <h2>Report Submitted!</h2>
                        <p>Thank you for bringing this to our attention. Our team will review your report immediately to keep Parkly safe.</p>
                        <button className="CloseSuccessBtn" onClick={() => setShowPopup(false)}>
                            Done
                        </button>
                    </div>
                </div>
            )}

        </>
    );
};

export default ReportFraud;