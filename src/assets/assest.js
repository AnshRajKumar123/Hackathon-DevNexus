import WebLogo from './ImageFold/WebsiteShowLogo.png'
import HeroImage from './ImageFold/HeroImage.jpeg'
import MoneySign from './ImageFold/MoneySign.png'
import Watch from './ImageFold/Watch.png'
import ManStress from './ImageFold/ManStress.png'

import Photo1 from './ImageFold/Photo1.jpeg'
import Photo2 from './ImageFold/Photo2.jpeg'
import Photo3 from './ImageFold/Photo3.jpeg'
import Photo4 from './ImageFold/Photo4.jpeg'

import IOS from './ImageFold/IOS.avif'
import GooglePlay from './ImageFold/GooglePlay.avif'
import MyQRCode from './ImageFold/MyQRCode.jpeg'

import OurJourneyImage from './ImageFold/OurJourneyImage.jpeg'
import MapIcon from './ImageFold/MapIcon.svg'
import Customer_Service from './ImageFold/Customer_Service.png'
import QR_Code from './ImageFold/QR_Code.png'
import BMW_Key from './ImageFold/BMW_Key.png'
import Hand_Mobile from './ImageFold/Hand_Mobile.png'

export const ImageCenter = {
    WebLogo,
    HeroImage,
    MoneySign,
    Watch,
    ManStress,

    Photo1,
    Photo2,
    Photo3,
    Photo4,

    IOS,
    MyQRCode,
    GooglePlay,

    OurJourneyImage,
    MapIcon,
    Customer_Service,
    QR_Code,
    BMW_Key,
    Hand_Mobile
}

export const parklyNavbarData = {
    links: [
        { label: "Home", path: "/", isDropdown: false },
        { label: "About Us", path: "/about", isDropdown: false },
        { label: "Booked History", path: "/bookedhistory", isDropdown: false }
    ],
    dropdown: {
        triggerLabel: "More",
        items: [
            { label: "Notification", path: "/notifications", isSpan: true }, // custom configuration tag
            { label: "Report A Fraud", path: "/reportfraud", isSpan: false },
            { label: "Help And Support", path: "/helpsupport", isSpan: false }
        ]
    }
};

export const parklyHeroData = {
    titlePrefix: "Best Space Car",
    titleSuffix: "Parking Area",
    description: "Your journey doesn't end when you arrive; it ends when you're parked. We make sure that transition is flawless.",
    placeholders: {
        location: "1. Set your current location...",
        parking: "2. Select a parking area from the map below..."
    },
    buttons: {
        detect: "Current Location",
        detecting: "Detecting...",
        cta: "Grab A Spot"
    },
    modal: {
        title: "Login Required",
        description: "You must be logged in to book a parking spot. Please log in or create an account to continue.",
        cancel: "Cancel",
        action: "Go to Login"
    }
};

export const parklyFeaturesData = {
    header: {
        tagline: "Core Capabilities",
        title: "Engineered for Seamless Mobility"
    },
    items: [
        {
            icon: "bx bx-credit-card-front",
            title: "Save Money",
            description: "Find the most competitive rates in the city. Compare prices instantly and enjoy exclusive discounts when you book in advance."
        },
        {
            icon: "bx bx-time-five",
            title: "Save Time",
            description: "Stop circling the block. Pinpoint your perfect spot in seconds and navigate directly to your reserved space without any delays."
        },
        {
            icon: "bx bx-shield-quarter",
            title: "Save Stress",
            description: "Experience total peace of mind. Secure your parking before you leave home and arrive knowing a spot is waiting for you."
        }
    ]
};

export const parklyChoosingData = {
    tagline: "The Parkly Advantage",
    title: "Why Choose Us",
    description: "Experience the future of parking with our seamless QR-based booking system. Simply reserve your spot online to receive a unique digital pass. Upon arrival, scan your QR code at the entrance for instant access—no tickets, no cash, and no delays. We offer secure, well-lit facilities and real-time navigation, ensuring a fast, safe, and entirely contactless parking experience every time.",
    cta: "Explore Ecosystem"
};

export const parklyPricingData = {
    tagline: "Transparent Rates",
    title: "Flexible Plans for Every Driver",
    plans: [
        {
            title: "Basic",
            price: "₹35",
            period: "/ hour",
            description: "An affordable, budget-friendly parking solution. It provides essential, reliable spots for short-term stays, ensuring a seamless and cost-effective urban parking experience.",
            bgImage: ImageCenter.Photo1, // 📸 Maps a clean asset image layer
            isFeatured: false
        },
        {
            title: "Standard",
            price: "₹50",
            period: "/ hour",
            description: "Strikes the perfect balance between affordability and convenience. It offers a reliable, mid-tier parking solution for everyday drivers seeking quality and value.",
            bgImage: ImageCenter.Photo2,
            isFeatured: true // Highlights this tier as the flagship choice
        },
        {
            title: "Premium",
            price: "₹75",
            period: "/ hour",
            description: "Delivers the ultimate parking experience, offering prime, high-security spots and priority access. It ensures maximum convenience and peace of mind for drivers.",
            bgImage: ImageCenter.Photo3,
            isFeatured: false
        }
    ]
};


export const parklyFooterData = {
    companyColumn: {
        title: "Company",
        links: [
            { label: "PARKLY", path: "#" },
            { label: "Serving India", path: "#" },
            { label: "Investor Relations", path: "#" }
        ]
    },
    businessColumn: {
        title: "For Business",
        links: [
            { label: "Partner with Us", path: "#" },
            { label: "Apps for you", path: "#" }
        ]
    },
    placesColumn: {
        title: "Parking Places",
        links: [
            { label: "Delhi", path: "#" },
            { label: "Mumbai", path: "#" },
            { label: "Chandigarh", path: "#" },
            { label: "Punjab", path: "#" }
        ]
    },
    legalColumn: {
        title: "Legal",
        links: [
            { label: "Privacy", path: "#", isRouter: false },
            { label: "Security", path: "#", isRouter: false },
            { label: "Terms of Service", path: "#", isRouter: false },
            { label: "Help and Support", path: "/helpsupport", isRouter: true },
            { label: "Report a Fraud", path: "/reportfraud", isRouter: true }
        ]
    },
    socials: {
        title: "Connect With Us",
        links: [
            { icon: "bx bxl-linkedin", url: "#" },
            { icon: "bx bxl-instagram", url: "https://www.instagram.com/midnightnfood/" },
            { icon: "bx bxl-facebook", url: "#" },
            { icon: "bx bxl-twitter", url: "#" }
        ]
    },
    disclaimer: "By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners 2008-2026 © Parkly Ltd. All rights reserved."
};