import CheckIcon from "../../Assets/Icon/CheckIcon.svg"
import NoneCheckIcon from "../../Assets/Icon/NoneCheckIcon.svg"


export const NOTE_TITLE ="* We built UpReach to help you find and analyze influencers for your campaigns. If we detect suspicious behavior that doesn't conform with the intended use laid out in our Terms of Service, we reserve the right to permanently and temporarily restrict your account while we investigate.";
export const Q1_TITLE ="Can I try Upreach before committing to a plan?";
export const Q1_SUB_TITLE ="Sure! With our free trial you can use all of our search filters, but with limited results. This way you can absolutely know how Upreach works before committing to a plan.";
export const Q2_TITLE ="Can I downgrade or cancel any time?";
export const Q2_SUB_TITLE ="Yes. Our plans are monthly or yearly, and you can downgrade or unsubscribe whenever you want.";
export const Q3_TITLE ="If I upgrade, will I pay full price twice?";
export const Q3_SUB_TITLE ="Definitely not. Our system will detect the upgrade and calculate a proration between the usage of the first plan and the one that you are about to buy. You will not be charged twice for the same thing.";

export const UPGRADE_CARDS = [
    {
        tag:"Starter",
        cost:"49", 
        btnTag:"Buy starter",
        sub1:[CheckIcon, "Database of 11M influencers"],
        sub2:[CheckIcon, "15000 monthly results"],
        sub3:[CheckIcon, "500 monthly reports"],
        sub4:[CheckIcon, '10 lists'],
        sub5:[CheckIcon, 'Basic search'],
        sub6:[CheckIcon, 'Feedback influencer'],
        sub7:[NoneCheckIcon, 'Add new influencers'],
        sub8:[NoneCheckIcon, 'Contact'],
        sub9:[NoneCheckIcon, 'Exports'],
        sub10:[NoneCheckIcon, 'Audience data'],
        sub11:[NoneCheckIcon, 'Save search'],
    },
    {   
        tag:"Business",
        cost:"79",
        btnTag:"Buy business",
        sub1:[CheckIcon, 'Database of 11M influencers'],
        sub2:[CheckIcon, '40000 monthly results'],
        sub3:[CheckIcon, '2000 monthly reports'],
        sub4:[CheckIcon, '50 lists'],
        sub5:[CheckIcon, 'Basic search'],
        sub6:[CheckIcon, 'Feedback influencer'],
        sub7:[CheckIcon, 'Add new influencers'],
        sub8:[CheckIcon, 'Contact'],
        sub9:[CheckIcon, 'Exports'],
        sub10:[CheckIcon, 'Audience data'],
        sub11:[CheckIcon, 'Save search'],
    },
    {
        tag:"Gold",
        cost:"149",
        btnTag:"Buy gold",
        sub1:[CheckIcon, 'Database of 11M influencers'],
        sub2:[CheckIcon, '60000 monthly results'],
        sub3:[CheckIcon, '5000 monthly reports'],
        sub4:[CheckIcon, 'Unlimited lists'],
        sub5:[CheckIcon, 'Basic search'],
        sub6:[CheckIcon, 'Feedback influencer'],
        sub7:[CheckIcon, 'Add new influencers'],
        sub8:[CheckIcon, 'Contact'],
        sub9:[CheckIcon, 'Exports'],
        sub10:[CheckIcon, 'Audience data'],
        sub11:[CheckIcon, 'Save search'],
    }
];