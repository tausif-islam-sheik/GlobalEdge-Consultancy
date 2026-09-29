export type AppRow = {
  id: string;
  date: string;
  time: string;
  src: string;
  initials: string;
  student: string;
  country?: string;
  passport: string;
  phone: string;
  email: string;
  agent: string;
  institution: string;
  instCountry: string;
  program: string;
  intake?: string;
  duration?: string;
  tuition?: string;
  appFee?: string;
  counsellor: string;
  counsRole: string;
  counsPhone: string;
  counsEmail: string;
  status: "DRAFT" | "UNDER REVIEW" | "ACCEPTED" | "REJECTED";
  updated: string;
  docs: string;
};

export const appStats = {
  total: 43,
  draft: 12,
  applied: 31,
  visa: 14,
  visaProcess: 13,
  visaDone: 1,
  offer: 14,
  offerPending: 0,
  offerSent: 14,
  regProcess: 0,
  regDone: 0,
};

export const allApplications: AppRow[] = [
  {
    id: "CCAPP-10053",
    date: "27 September 2026",
    time: "9:13 pm",
    src: "Direct",
    initials: "",
    student: "Md Foysal Ahmed",
    passport: "Passport: Not provided",
    phone: "01687069581",
    email: "N/A",
    agent: "Direct Student",
    institution: "Asia Pacific University of Technology & Innovation (APU)",
    instCountry: "Malaysia",
    program: "Bachelor of Science (Honours) in Information Technology with a specialism in Cloud Engineering",
    intake: "November 2026",
    duration: "3 Years",
    tuition: "MYR 34,900",
    appFee: "N/A",
    counsellor: "Jabbar Khan",
    counsRole: "Designation",
    counsPhone: "+880 01828921831",
    counsEmail: "manager@gmail.com",
    status: "DRAFT",
    updated: "27 Sept 2026",
    docs: "No documents submitted",
  },
  {
    id: "CCAPP-10052",
    date: "27 September 2026",
    time: "3:55 pm",
    src: "Direct",
    initials: "FS",
    student: "Farhan Sheik",
    country: "Bangladesh",
    passport: "Passport: A5645654",
    phone: "+88001408987665",
    email: "tausifislamsheik1@gmail.com",
    agent: "Direct Student",
    institution: "University of Debrecen",
    instCountry: "Hungary",
    program: "BA in Contemporary Music",
    intake: "September 2027",
    duration: "3 Years",
    tuition: "$10,000",
    appFee: "$150",
    counsellor: "Karim Ali",
    counsRole: "Agent Counsellor",
    counsPhone: "+880 01734567890",
    counsEmail: "manager2@gmail.com",
    status: "ACCEPTED",
    updated: "27 Sept 2026",
    docs: "9/9 Documents verified",
  },
  {
    id: "CCAPP-10035",
    date: "5 September 2026",
    time: "12:32 pm",
    src: "Direct",
    initials: "SR",
    student: "S M RIFAT",
    country: "Bangladesh",
    passport: "Passport: A09606336",
    phone: "+88001303014182",
    email: "smrifat.animation@gmail.com",
    agent: "Direct Student",
    institution: "Management & Science University (MSU)",
    instCountry: "Malaysia",
    program: "N/A",
    intake: "February 2027",
    tuition: "N/A",
    appFee: "N/A",
    counsellor: "MD Jewel Hossain",
    counsRole: "HR Admin",
    counsPhone: "+880 01919860155",
    counsEmail: "ahosanjewel@gmail.com",
    status: "UNDER REVIEW",
    updated: "5 Sept 2026",
    docs: "7/7 Documents verified",
  },
  {
    id: "CCAPP-10027",
    date: "3 September 2026",
    time: "3:35 pm",
    src: "Direct",
    initials: "MF",
    student: "MD FARHAD HOSEN",
    country: "Bangladesh",
    passport: "Passport: A00392962",
    phone: "+88001704503641",
    email: "mdfarhadhosen@gmail.com",
    agent: "Direct Student",
    institution: "INTI International University & Colleges",
    instCountry: "Malaysia",
    program: "N/A",
    intake: "January 2027",
    tuition: "N/A",
    appFee: "N/A",
    counsellor: "Afsana Akter Amina",
    counsRole: "Director",
    counsPhone: "+880 01725623384",
    counsEmail: "afsanahq100@gmail.com",
    status: "UNDER REVIEW",
    updated: "5 Sept 2026",
    docs: "No documents submitted",
  },
  {
    id: "CCAPP-10046",
    date: "8 September 2026",
    time: "11:20 pm",
    src: "Direct",
    initials: "NR",
    student: "NADIA KABIR RIMI",
    country: "Bangladesh",
    passport: "Passport: A05260401",
    phone: "+880 01805214609",
    email: "riminadia4@gmail.com",
    agent: "Direct Student",
    institution: "SEGi University & Colleges",
    instCountry: "Malaysia",
    program: "BA (Hons) Business Management 3+0 in collaboration with University of Greenwich, UK",
    intake: "January 2027",
    duration: "3 Years",
    tuition: "MYR 15,400",
    appFee: "N/A",
    counsellor: "MD Jewel Hossain",
    counsRole: "HR Admin",
    counsPhone: "+880 01919860155",
    counsEmail: "ahosanjewel@gmail.com",
    status: "ACCEPTED",
    updated: "8 Sept 2026",
    docs: "13/13 Documents verified",
  },
];

export const appChecklists = [
  { country: "Hungary", name: "Hurgary Application Checklist", items: 4 },
  { country: "Malaysia", name: "Malaysia Student Application Checklist", items: 4 },
];

export const visaChecklists = [
  { country: "Hungary", name: "Hurgary Visa Checklist", items: 3 },
  { country: "Malaysia", name: "Malaysia Student visa Checklist", items: 6 },
];

export const liveCourses = [
  {
    title: "30-Day Study Abroad English & Vi...",
    desc: "COURSE DESCRIPTION The 30-Day Study...",
    teacher: "Takrima Tajnoor Tofa",
    manager: "MD Jewel Hossain",
    classes: "2 / 26",
    enrolled: 3,
    status: "ACTIVE",
  },
];

export const agents = [
  {
    id: "ccagent-10006",
    joined: "16 Sept 2026, 04:39 PM",
    name: "Test Agent 1",
    type: "Corporate Agent",
    country: "Bangladesh",
    email: "supportglobalit@gmail.com",
    web: "https://ccapply.com/",
    contact: "Owner name test",
    contactPhone: "+880 01712345678",
    contactEmail: "supportglobalit@gmail.com",
    status: "Verified",
    rank: "Rank #1",
    score: "Score 7",
    visa: "Visa success: 0% (0/2)",
    apps: "Applications: 2",
    process: "On process: 1",
    students: "Students: 2",
    updated: "27 Sept 2026",
    counsellor: "Karim Ali",
    counsRole: "Agent Counsellor",
    counsPhone: "+880 01734567890",
    counsEmail: "manager2@gmail.com",
  },
  {
    id: "ccagent-10005",
    joined: "30 Aug 2026, 06:10 PM",
    name: "Afsana Agency",
    type: "Student Agent",
    country: "",
    email: "afsana.creativeconsultancy@gmail.com",
    web: "",
    contact: "Afsana",
    contactPhone: "+880 01816285751",
    contactEmail: "afsana.creativeconsultancy@gmail.com",
    status: "Verified",
    rank: "Rank #8",
    score: "Score 0",
    visa: "Visa success: No visa cases",
    apps: "Applications: 0",
    process: "On process: 0",
    students: "Students: 0",
    updated: "30 Aug 2026",
    counsellor: "Karim Ali",
    counsRole: "Agent Counsellor",
    counsPhone: "+880 01734567890",
    counsEmail: "manager2@gmail.com",
  },
  {
    id: "ccagent-10004",
    joined: "15 Aug 2026, 05:12 PM",
    name: "Jowel Agency",
    type: "Corporate Agent",
    country: "Bangladesh",
    email: "mdjewel@gmail.com",
    web: "",
    contact: "md Jewel",
    contactPhone: "+880 01788521234",
    contactEmail: "mdjewel@gmail.com",
    status: "Verified",
    rank: "Rank #7",
    score: "Score 0",
    visa: "Visa success: No visa cases",
    apps: "Applications: 0",
    process: "On process: 0",
    students: "Students: 0",
    updated: "25 Aug 2026",
    counsellor: "Karim Ali",
    counsRole: "Agent Counsellor",
    counsPhone: "+880 01734567890",
    counsEmail: "manager2@gmail.com",
  },
];
