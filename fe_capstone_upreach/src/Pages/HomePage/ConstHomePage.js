export const PLATFORM = [
    { value: "Facebook", label: "Facebook" },
    { value: "Instagram", label: "Instagram" },
    { value: "Youtube", label: "Youtube" },
    { value: "TikTok", label: "TikTok" }
];
export const CATEGORY = [
    { value: "Sport/Fitness", label: "Sport/Fitness" },
    { value: "Beauty", label: "Beauty" },
    { value: "Business", label: "Business" },
    { value: "Technology", label: "Technology" },
    { value: "Baby", label: "Baby" },
    { value: "Hot Face", label: "Hot Face" },
    { value: "Education", label: "Education" },
    { value: "Travel", label: "Travel" },
    { value: "Music", label: "Music" },
    { value: "Food & Drink", label: "Food & Drink" },
    { value: "Housing", label: "Housing" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Nutrition", label: "Nutrition" },
    { value: "Game", label: "Game" },
    { value: "Film", label: "Film" },
    { value: "Personal perception", label: "Personal perception" },
    { value: "Artwork", label: "Artwork" },
    { value: "Pet", label: "Pet" },
    { value: "Fashion", label: "Fashion" }
];

export const LIST_LEFT_BUTTON_SELECT_SEARCH = {
    className: "leftButton",
    options: PLATFORM,
    title: "Platform",
    description: "Choose a platform"
};

export const LIST_RIGHT_BUTTON_SELECT_SEARCH = {
    className: "rightButton",
    options: CATEGORY,
    title: "Category",
    description: "Search for categories, keywords, hashtags or influencers"
};

export const LIST_TYPE_SEARCH = [
    { name: "Celebrity", value: "Celebrity" },
    { name: "Talent", value: "Talent" },
    { name: "Professional", value: "Professional" },
    { name: "Citizen", value: "Citizen" },
    { name: "Community", value: "Community" },
]

export const LIST_CONTENT_FORMATS_SEARCH = [
    { name: "Text", value: "Text" },
    { name: "Picture", value: "Picture" },
    { name: "Video", value: "Video" },
]

// marks for slider
export const COST = {
    0: {
        style: {
            paddingTop: "10px",
            paddingLeft: "10px",
        },
        label: <div>0{" "}(VND)</div>,
    },
    5000000: {
        style: {
            width:"150px",
            paddingTop: "10px",
            paddingRight: "40px",
        },
        label: <div>5M+{" "}(VND)</div>,
    },
};

export const AGE = {
    0: {
        style: {
            paddingTop: "10px",
            paddingLeft: "2px",
        },
        label: <div>0</div>,
    },
    100: {
        style: {
            paddingTop: "10px",
            paddingRight: "5px",
        },
        label: <div>100</div>,
    },
};

export const FOLLOWERS = {
    0: {
        style: {
            paddingTop: "10px",
            paddingLeft: "10px",
        },
        label: <div>0</div>,
    },
    10000000: {
        style: {
            width:"150px",
            paddingTop: "10px",
            paddingRight: "40px",
        },
        label: <div>10M+</div>,
    },
};

export const ENGAGEMENT = {
    0: {
        style: {
            paddingTop: "10px",
            paddingLeft: "10px",
        },
        label: <div>0%</div>,
    },
    20: {
        style: {
            width:"150px",
            paddingTop: "10px",
            paddingRight: "40px",
        },
        label: <div>20%+</div>,
    },
};

export const PUBLICATION = {
    0: {
        style: {
            paddingTop: "10px",
            paddingLeft: "10px",
        },
        label: <div>0</div>,
    },
    15: {
        style: {
            width:"150px",
            paddingTop: "10px",
            paddingRight: "40px",
        },
        label: <div>15+</div>,
    },
};

export const GENDER_OF_AGE = [
    { name: "0-18", value: "AAI001" },
    { name: "19-25", value: "AAI002" },
    { name: "26-40", value: "AAI003" },
    { name: "41-60", value: "AAI004" }
];
export const GENDER_OF_AUDIANCE = [
    { name: "Male", value: "Male" },
    { name: "Female", value: "Female" },
];

export const PROFILE_INFLUS = [
    {
        id: "1",
        fullName: "Le Quang Hieu",
        type: "Citizen",
        topics: [
            "Baby",
            "Beauty",
            "Business",
            "Travel",
            "Game",
            "Film",
            "Personal perception",
            "Film",
            "Film",
            "Film",
        ],
        address: "Da Nang",
        gender: "Male",
        age: 22,
        relationship: "Married",
        bio: "Sang som thuc day bong thay minh qua dep trai, tieng hot thanh thot cua nhung chu chim vua sang, ngay vui lai len...",
        email: "hieupro123@gmail.com",
        phone: "0398357123",

    },
    {
        id: "2",
        fullName: "Vu Thi Thuy Trang",
        type: "Celebrity",
        address: "Ha Noi",
        topics: ["Beuaty", "Education"],
    },
    {
        id: "3",
        fullName: "Nguyen Nhat Minh",
        type: "Professional",
        address: "Da Nang",
        topics: ["Game", "Music", "Fashion"],
    },
    {
        id: "4",
        fullName: "Le Quang Hieu",
        address: "Da Nang",
        topics: ["Game", "Beauty", "Any"],
    },
    {
        id: "5",
        fullName: "Le Quang Hieu",
        address: "Da Nang",
        topics: ["Game", "Beauty", "Any"],
    },
    {
        id: "6",
        fullName: "Le Quang Hieu",
        address: "Da Nang",
        topics: ["Game", "Beauty", "Any"],
    },
    {
        id: "7",
        fullName: "Le Quang Hieu",
        address: "Da Nang",
        topics: ["Game", "Beauty", "Any"],
    },
    {
        id: "8",
        fullName: "Le Quang Hieu",
        address: "Da Nang",
        topics: ["Game", "Beauty", "Any"],
    },
    {
        id: "9",
        fullName: "Le Quang Hieu",
        address: "Da Nang",
        topics: ["Game", "Beauty", "Any"],
    },
    {
        id: "10",
        fullName: "Le Quang Hieu",
        address: "Da Nang",
        topics: ["Game", "Beauty", "Any"],
    },
    {
        id: "11",
        fullName: "Le Quang Hieu",
        address: "Da Nang",
        topics: ["Game", "Beauty", "Any"],
    },
    {
        id: "12",
        fullName: "Le Quang Hieu",
        address: "Da Nang",
        topics: ["Game", "Beauty", "Any"],
    },
    {
        id: "13",
        fullName: "Le Quang Hieu",
        address: "Da Nang",
        topics: ["Game", "Beauty", "Any"],
    },
    {
        id: "14",
        fullName: "Le Quang Hieu",
        address: "Da Nang",
        topics: ["Game", "Beauty", "Any"],
    },
    {
        id: "15",
        fullName: "Le Quang Hieu",
        address: "Da Nang",
        topics: ["Game", "Beauty", "Any"],
    },
];

export const VERSION_PROFILE_INFLU = [
    {
        fullName: "Le Quang Hieu",
        type: "Citizen",

        topics: [
            "Baby",
            "Beauty",
            "Business",
            "Travel",
            "Game",
            "Film",
            "Personal perception",
            "Film",
            "Film",
            "Film",
        ],
        address: "Da Nang",
        gender: "Male",
        age: 22,
        relationship: "Married",
        bio: "Sang som thuc day bong thay minh qua dep trai, tieng hot thanh thot cua nhung chu chim vua sang, ngay vui lai len...",
        email: "hieupro123@gmail.com",
        phone: "0398357123",
        facebook:{followers: 1230989, interactions: 2304955},
        instagram:{followers: 123098, interactions: 230495},
        youtube:{followers: 12309899, interactions: 23049559},
        tiktok:{followers: 1230, interactions: 2304},
        date:"7/2023",
        view:1345,
        image:[
        { 
            uid: '-1',
            name: 'image1.png',
            status: 'done',
            url:'https://kenh14cdn.com/thumb_w/600/203336854389633024/2023/3/15/photo1678877198587-16788771988181833109244.jpg'},
        { 
            uid: '-2',
            name: 'image2.png',
            status: 'done',
            url:'https://nld.mediacdn.vn/291774122806476800/2021/4/30/img-3282-16197464144561057923327.jpg'},
        { 
            uid: '-3',
            name: 'image3.png',
            status: 'done',
            url:'https://kenh14cdn.com/203336854389633024/2023/5/9/photo-3-16836084165791093415121.jpeg'}
        ],
    },
    {
        fullName: "Le Quang Hieu",
        type: "Citizen",
        topics: [
            "Baby",
            "Beauty",
            "Business",
            "Travel",
            "Game",
            "Film",
            "Personal perception",
            "Film",
            "Film",
            "Film",
        ],
        address: "Da Nang",
        gender: "Male",
        age: 22,
        relationship: "Married",
        bio: "Sang som thuc day bong thay minh qua dep trai, tieng hot thanh thot cua nhung chu chim vua sang, ngay vui lai len...",
        email: "hieupro123@gmail.com",
        phone: "0398357123",
        date:"6/2023",
        view:1234,
        image:[{},{},{}],
        facebook:{followers: 1230989, interactions: 2304955},
        instagram:{followers: 123098, interactions: 230495},
        youtube:{followers: 12309899, interactions: 23049559},
        tiktok:{followers: 1230, interactions: 2304},

    },
    {
        fullName: "Le Quang Hieu",
        type: "Citizen",
        topics: [
            "Baby",
            "Beauty",
            "Business",
            "Travel",
            "Game",
            "Film",
            "Personal perception",
            "Film",
            "Film",
            "Film",
        ],
        address: "Da Nang",
        gender: "Male",
        age: 22,
        relationship: "Married",
        bio: "Sang som thuc day bong thay minh qua dep trai, tieng hot thanh thot cua nhung chu chim vua sang, ngay vui lai len...",
        email: "hieupro123@gmail.com",
        phone: "0398357123",
        date:"5/2023",
        view:1110,
        image:[{},{},{}],
        facebook:{followers: 1230989, interactions: 2304955},
        instagram:{followers: 123098, interactions: 230495},
        youtube:{followers: 12309899, interactions: 23049559},
        tiktok:{followers: 1230, interactions: 2304},
    },
    {
        fullName: "Le Quang Hieu",
        type: "Citizen",
        topics: [
            "Baby",
            "Beauty",
            "Business",
            "Travel",
            "Game",
            "Film",
            "Personal perception",
            "Film",
            "Film",
            "Film",
        ],
        address: "Da Nang",
        gender: "Male",
        age: 22,
        relationship: "Married",
        bio: "Sang som thuc day bong thay minh qua dep trai, tieng hot thanh thot cua nhung chu chim vua sang, ngay vui lai len...",
        email: "hieupro123@gmail.com",
        phone: "0398357123",
        date:"4/2023",
        view:1111,
        facebook:{followers: 1230989, interactions: 2304955},
        instagram:{followers: 123098, interactions: 230495},
        youtube:{followers: 12309899, interactions: 23049559},
        tiktok:{followers: 1230, interactions: 2304},
    },
    {
        fullName: "Le Quang Hieu",
        type: "Citizen",
        topics: [
            "Baby",
            "Beauty",
            "Business",
            "Travel",
            "Game",
            "Film",
            "Personal perception",
            "Film",
            "Film",
            "Film",
        ],
        address: "Da Nang",
        gender: "Male",
        age: 22,
        relationship: "Married",
        bio: "Sang som thuc day bong thay minh qua dep trai, tieng hot thanh thot cua nhung chu chim vua sang, ngay vui lai len...",
        email: "hieupro123@gmail.com",
        phone: "0398357123",
        date:"3/2023",
        view:124,
        facebook:{followers: 1230989, interactions: 2304955},
        instagram:{followers: 123098, interactions: 230495},
        youtube:{followers: 12309899, interactions: 23049559},
        tiktok:{followers: 1230, interactions: 2304},

    },
    {
        fullName: "Le Quang Hieu",
        type: "Citizen",
        topics: [
            "Baby",
            "Beauty",
            "Business",
            "Travel",
            "Game",
            "Film",
            "Personal perception",
            "Film",
            "Film",
            "Film",
        ],
        address: "Da Nang",
        gender: "Male",
        age: 22,
        relationship: "Married",
        bio: "Sang som thuc day bong thay minh qua dep trai, tieng hot thanh thot cua nhung chu chim vua sang, ngay vui lai len...",
        email: "hieupro123@gmail.com",
        phone: "0398357123",
        date:"2/2023",
        view:111,
        facebook:{followers: 1230989, interactions: 2304955},
        instagram:{followers: 123098, interactions: 230495},
        youtube:{followers: 12309899, interactions: 23049559},
        tiktok:{followers: 1230, interactions: 2304},
    },
]

export const roundNumber = (num) => {
    const map = [
      { suffix: "T", threshold: 1e12 },
      { suffix: "B", threshold: 1e9 },
      { suffix: "M", threshold: 1e6 },
      { suffix: "K", threshold: 1e3 },
      { suffix: "", threshold: 1 },
    ];
  
    const found = map.find((x) => Math.abs(num) >= x.threshold);
  
    if (found) {
      let formatted = "";
      if (num < 1000) {
        formatted = (num / found.threshold).toFixed(0) + found.suffix;
      } else formatted = (num / found.threshold).toFixed(1) + found.suffix;
      return formatted;
    }
  
    return num;
  };

export const URL_API_CITY = 'https://provinces.open-api.vn/api/p/';
