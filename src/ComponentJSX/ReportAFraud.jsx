import React, { useState } from "react";
import '../ComponentCSS/ReportAFraud.css';
import { Link } from "react-router-dom";
import Toast from "./Toast";
import emailjs from '@emailjs/browser';
import { parklyFraudData } from "../assets/assest";

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
    const [showPopup, setShowPopup] = useState(false);

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
                'service_tqebzee',
                'template_vpp2w4c',
                templateParams,
                'b1aE1ZGhkj_rEMlbt'
            );
            setLoading(false);
            setShowPopup(true);
        } catch (err) {
            console.error('FAILED...', err);
            setLoading(false);
            showToast("Failed to send report. Please try again.", "error");
        }
    };

    const resetComplianceSession = () => {
        setFormData({ fullName: "", email: "", mobile: "", accusedName: "", city: "", message: "" });
        setReason("");
        setEvidence(null);
        setEvidencePreview(null);
        setShowPopup(false);
    };

    return (
        <div className="ProFraudLayoutContainer">
            {toast.show && <Toast message={toast.message} type={toast.type} />}

            {/* Upper Structural Header */}
            <header className="ProFraudHeaderDeck">
                <span className="ProTaglineText AlertColor">{parklyFraudData.tagline}</span>
                <h1>{parklyFraudData.title}</h1>
            </header>

            <main className="ProFraudGridCore">

                {/* Core Threat Reporting Form */}
                <form className="ProFraudTerminalForm" onSubmit={handleSubmit}>

                    <div className="ProFraudInputGrid">
                        <div className="ProFraudFieldBlock">
                            <label>Reporter Full Name</label>
                            <input name="fullName" type="text" value={formData.fullName} onChange={handleChange} placeholder={parklyFraudData.placeholders.name} required />
                        </div>
                        <div className="ProFraudFieldBlock">
                            <label>Secure Email Address</label>
                            <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder={parklyFraudData.placeholders.email} required />
                        </div>
                    </div>

                    <div className="ProFraudInputGrid">
                        <div className="ProFraudFieldBlock">
                            <label>Mobile Number Link</label>
                            <input name="mobile" type="text" value={formData.mobile} onChange={handleChange} placeholder={parklyFraudData.placeholders.mobile} required />
                        </div>
                        <div className="ProFraudFieldBlock">
                            <label>Target Accused Entity</label>
                            <input name="accusedName" type="text" value={formData.accusedName} onChange={handleChange} placeholder={parklyFraudData.placeholders.accused} required />
                        </div>
                    </div>

                    <div className="ProFraudFieldBlock">
                        <label>Geographic Incident City</label>
                        <input name="city" type="text" value={formData.city} onChange={handleChange} placeholder={parklyFraudData.placeholders.city} required />
                    </div>

                    {/* Highly Professional Grid Selection Modules */}
                    <div className="ProFraudRadioSection">
                        <h3>Select Core Vector Violation</h3>
                        <div className="ProFraudRadioOptionsGrid">
                            {parklyFraudData.fraudReasons.map((r) => (
                                <label key={r} className={`ProRadioLabelSlot ${reason === r ? 'radio-slot-active' : ''}`}>
                                    <input type="radio" value={r} checked={reason === r} onChange={(e) => setReason(e.target.value)} />
                                    <span>{r}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="ProFraudFieldBlock TextareaFieldBlock">
                        <label>Incident Operational Narrative Details</label>
                        <textarea name="message" value={formData.message} onChange={handleChange} placeholder={parklyFraudData.placeholders.message} maxLength={500} required></textarea>
                        <div className="ProCharCounterText">{formData.message.length} / 500 Characters</div>
                    </div>

                    {/* File Drop Matrix Zone */}
                    <div className="ProUploadTerminalZone" onDragOver={handleDragOver} onDrop={handleDrop}>
                        {!evidence ? (
                            <div className="ZoneUploadPromptContent">
                                <i className="bx bx-shield-quarter ZoneUploadPromptIcon ThreatColor"></i>
                                <p>Drag and drop forensic verification files here or <span className="BrowseActionHighlight ThreatLink">browse system storage</span></p>
                                <input type="file" accept="image/*,application/pdf" onChange={handleFile} />
                            </div>
                        ) : (
                            <div className="ZoneUploadPreviewState">
                                {evidencePreview ? (
                                    <img src={evidencePreview} alt="Forensic Evidence Data Matrix" />
                                ) : (
                                    <div className="ProPdfPreviewBox">
                                        <i className="bx bxs-file-pdf ForensicPdfIcon"></i>
                                        <p>{evidence.name}</p>
                                    </div>
                                )}
                                <button type="button" className="ZoneRemoveImageCTA" onClick={() => { setEvidence(null); setEvidencePreview(null); }}>
                                    Purge Evidence File
                                </button>
                            </div>
                        )}
                    </div>

                    <p className="ProFormWarningDisclaimerText">
                        <i className='bx bx-info-circle'></i> {parklyFraudData.disclaimer}
                    </p>

                    <button type="submit" className="ProFraudSubmitCTA" disabled={loading}>
                        {loading ? "Processing Compliance Ledger..." : "Deploy System Threat Report"}
                    </button>
                </form>

                {/* Right Bento Aside Panel */}
                <aside className="ProFraudAsideConsole">
                    <div className="AsideSystemBentoCard GenericHelpInfoCard">
                        <h3>{parklyFraudData.sideCards.support.title}</h3>
                        <p>{parklyFraudData.sideCards.support.description}</p>
                        <Link to="/helpsupport" className="StandardSupportVectorLink">
                            {parklyFraudData.sideCards.support.cta} <i className='bx bx-right-arrow-alt'></i>
                        </Link>
                    </div>
                </aside>

            </main>

            {/* SEAMLESS COMPLIANCE SECURE MODAL OVERLAY */}
            {showPopup && (
                <div className="ProModalOverlay">
                    <div className="ProModalCard TextAlignCenter CustomAlertBorder">
                        <div className="CyberModalSuccessIcon ShieldThreatColor"><i className='bx bx-check-shield'></i></div>
                        <h2>{parklyFraudData.successModal.title}</h2>
                        <p>{parklyFraudData.successModal.description}</p>
                        <button className="ProModalSubmitBtn AlertBgBtn" onClick={resetComplianceSession}>
                            {parklyFraudData.successModal.btnText}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportFraud;