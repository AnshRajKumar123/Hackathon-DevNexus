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


export const parklyAboutData = {
    banner: {
        title: "Innovating the Way You Park",
        description: "Discover the passion and technology behind our mission to eliminate parking stress. What started as a simple idea to solve city congestion has evolved into a seamless digital platform."
    },
    journey: {
        tagline: "The Core History",
        title: "Our Journey",
        p1: "The foundation of Parkly emerged from a real-life frustration shared by a close friend, Ranjit Maurya. While heading to a crucial career interview, Ranjit found himself trapped in a nightmare: despite arriving in the area on time, he spent over thirty minutes circling for parking. By the time he found a spot, he was significantly late for his interview. Seeing a friend suffer such a high-stakes setback due to a simple parking issue sparked a mission: no one should ever miss an opportunity because of a parking spot.",
        p2: "While other platforms exist, we noticed they lacked the speed and precision required for the modern driver. This drove our team to build something better. We integrated a live-map interface with real-time GPS tracking to ensure users aren't just finding a general area, but a specific, available slot.",
        p3: "To streamline the experience, we pioneered a seamless QR-code entry system. Upon booking, users receive an instant digital pass; a simple scan at the facility allows them to park and go without touching a ticket or waiting in a queue. Combined with our 24/7 dedicated customer support, Parkly isn't just a booking site—it's a commitment to ensuring that your journey ends exactly when you arrive."
    },
    mission: {
        tagline: "What we believe in",
        title: "Our Mission & Values",
        description: "Our company exists to eliminate the stress of urban travel by providing seamless, reliable parking solutions for every driver. At Parkly, we believe that smart technology should simplify life, starting with the moment you arrive. Our values guide every decision we make, from real-time data accuracy to ensuring a secure and effortless experience at every location.",
        cards: [
            {
                title: "Accuracy & Reliability",
                text: "WE LEVERAGE LIVE DATA AND GPS TRACKING TO ENSURE EVERY SLOT LISTED IS AVAILABLE IN REAL-TIME. YOUR TIME IS VALUABLE, AND OUR MISSION IS TO ENSURE YOU NEVER HAVE TO CIRCLE THE BLOCK AGAIN."
            },
            {
                title: "Seamless Innovation",
                text: "WE ARE COMMITTED TO A TICKETLESS, HASSLE-FREE FUTURE. BY INTEGRATING INSTANT QR-CODE ACCESS AND SECURE DIGITAL PAYMENTS, WE REDUCE CONGESTION AND MAKE URBAN MOBILITY FASTER AND SMARTER FOR EVERYONE."
            },
            {
                title: "24/7 Customer Service",
                text: "WE BELIEVE IN BEING THERE WHEN YOU NEED US MOST. WHETHER IT'S MIDNIGHT OR RUSH HOUR, OUR DEDICATED SUPPORT TEAM IS AVAILABLE AROUND THE CLOCK TO ENSURE YOUR PARKING EXPERIENCE IS FLAWLESS."
            }
        ]
    },
    team: {
        title: "The Architects Behind Mobility",
        description: "Our team is a passionate group of developers, problem-solvers, and innovators dedicated to making your urban commute stress-free."
    },
    cta: {
        title: "Ready to Park Without the Stress?",
        description: "Join the Parkly community today and experience the fastest way to secure your slot. Stop wasting time in traffic and start arriving with confidence using our live-map and instant QR-entry system.",
        btnText: "Book Your Slot Now"
    }
};

export const parklyBookData = {
    title: "Terminal Spot Controller",
    fallbackAddress: "No location state detected",
    modalDetails: {
        title: "Vector Allocation Profile",
        cancelBtn: "Abort",
        payBtn: "Authorize Gateway"
    },
    modalPayment: {
        title: "Secure Clearing House",
        subtitle: "Execute cryptographic transaction via core QR terminal matrix.",
        amountLabel: "Total Authorized Settlement",
        backBtn: "Return to Profile",
        confirmBtn: "Confirm Payment Settlement",
        copyright: "© 2026 Parkly Ltd. Cryptographic Settlement Engine."
    },
    modalTicket: {
        title: "Allocation Validated! 🎉",
        subtitle: "Deploy token signature at physical terminal barrier gates.",
        closeBtn: "Terminate Session"
    }
};