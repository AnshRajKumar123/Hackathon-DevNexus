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


// 🌟 Add this at the bottom of your assets file
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

// 🌟 Add this at the bottom of your assets file
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