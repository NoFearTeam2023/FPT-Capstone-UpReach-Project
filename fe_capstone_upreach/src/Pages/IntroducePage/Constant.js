import { Link } from "react-router-dom";

export const SUB_TITLE = "Find Instagram, Facebook, TikTok, and YouTube influencers to create unique content for your brand";
export const CONTENT = ["Our website", "Help find Influencer attributes or keywords", "Easily search Influencer by topic, content with #hashtag tags.", "Narrow down the search by specifying the attributes of theInfluencer or the following audience."];
export const ITEMSEARCHBTN = [
    {
        key: "1",
        label: (
            <Link
                rel="noopener noreferrer"
                to="/login"
            >
                Any
            </Link>
        ),
    },
    {
        key: "2",
        label: (
            <Link
                rel="noopener noreferrer"
                to="/login"
            >
                Facebook
            </Link >
        ),
    },
    {
        key: "3",
        label: (
            <Link
                rel="noopener noreferrer"
                to="/login"
            >
                Instagram
            </Link >
        ),
    },
    {
        key: "4",
        label: (
            <Link
                rel="noopener noreferrer"
                to="/login"
            >
                Youtube
            </Link >
        ),
    },
    {
        key: "5",
        label: (
            <Link
                rel="noopener noreferrer"
                to="/login"
            >
                Tiktok
            </Link >
        ),
    },
];

export const ITEMCATEGORYBTN = [
    {
        key: "1",
        label: (
            <Link
                rel="noopener noreferrer"
                to="/login"
            >
                All
            </Link>
        ),
    },
    {
        key: "2",
        label: (
            <Link
                rel="noopener noreferrer"
                to="/login"
            >
                Sport/Fitness
            </Link>
        ),
    },
    {
        key: "3",
        label: (
            <Link
                rel="noopener noreferrer"
                to="/login"
            >
                Beauty
            </Link>
        ),
    },
];

export const PLATFORM = "Platform";
export const DESCRIBE_PLAFORM = "Choose a platform";
export const CATEGORY = "Category";
export const DESCRIBE_CATEGORY = "Search for categories, keywords, hashtags or influencers";