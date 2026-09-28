export const adminCounts = {
  onProcessing: 13,
  totalStudents: 57,
  totalApplications: 43,
  totalAgents: 8,
};

export const recentApplications = [
  {
    student: "Md Foysal Ahmed",
    institution: "Asia Pacific University of Technology & Innovation (APU)",
    program: "Bachelor of Science (Honours) in Information Technology with a specialism in Cloud Engineering",
    status: "Under Review",
    assigned: "Jabbar Khan",
    updated: "27 Sept 2026",
  },
  {
    student: "Farhan Sheik",
    institution: "University of Debrecen",
    program: "BA in Contemporary Music",
    status: "Accepted",
    assigned: "Karim Ali",
    updated: "27 Sept 2026",
  },
  {
    student: "Saad Khondaker",
    institution: "Asia Pacific University of Technology & Innovation (APU)",
    program: "Bachelor in Banking and Finance (Hons)",
    status: "On Processing",
    assigned: "Dr. Ekramul Haque",
    updated: "27 Sept 2026",
  },
  {
    student: "Sasha Gona",
    institution: "Universiti Kuala Lumpur (UniKL)",
    program: "Bachelor in Tourism Planning and Development (Honours)",
    status: "Under Review",
    assigned: "Unassigned",
    updated: "24 Sept 2026",
  },
  {
    student: "Sasha Gona",
    institution: "ALFA University College (AUC)",
    program: "Bachelor of Human Resource Management (Honours)",
    status: "Under Review",
    assigned: "Unassigned",
    updated: "24 Sept 2026",
  },
];

export const notifications = [
  { title: "New visit booked", desc: "Sumaiya Jannat Rayha booked a visit for Sep 29, 2026, 6:00 PM with Dr. Ekramul Haque.", time: "28 Sept 2026 · 08:55 AM", tag: null, unread: false },
  { title: "Offer letter issued", desc: "An offer letter was issued to Tausif Sheik for application ccapp-10052.", time: "27 Sept 2026 · 04:20 PM", tag: "OFFER LETTER", unread: true },
  { title: "Requested document submitted", desc: 'A student uploaded "passport" for application ccapp-10052.', time: "27 Sept 2026 · 04:18 PM", tag: null, unread: true },
  { title: "New application submitted", desc: "Tausif Sheik submitted an application to University of Debrecen.", time: "27 Sept 2026 · 03:59 PM", tag: "APPLICATION", unread: true },
  { title: "Tuition payment received", desc: "Saad Khondaker's tuition payment for Bachelor in Banking and Finance (Hons) was marked complete.", time: "27 Sept 2026 · 03:36 PM", tag: "TUITION", unread: true },
  { title: "Offer letter issued", desc: "An offer letter was issued to Saad Khondaker for application ccapp-10051.", time: "27 Sept 2026 · 03:34 PM", tag: "OFFER LETTER", unread: true },
  { title: "New application submitted", desc: "Saad Khondaker submitted an application to ALFA University College (AUC).", time: "27 Sept 2026 · 03:18 PM", tag: "APPLICATION", unread: true },
  { title: "Agent profile complete", desc: "Test Agent 1 completed their profile and is ready for verification review.", time: "16 Sept 2026 · 04:55 PM", tag: null, unread: false },
];

export const newAccounts = {
  students: [
    { name: "Farhan Sheik", sub: "farhansheik@gmail.com" },
    { name: "Saad Khondaker", sub: "saaa@mail.com" },
    { name: "Sasha Gona", sub: "sashagona5@gmail.com" },
    { name: "MST. FARHANA AKTER URMI", sub: "frhnurmi@gmail.com" },
    { name: "Chyanne Johnson", sub: "chyannejohnson486@gmail.com" },
  ],
  agents: [
    { name: "Test Agent 1", sub: "Owner name test" },
    { name: "Afsana Agency", sub: "Afsana" },
    { name: "Jowel Agency", sub: "md Jewel" },
    { name: "Global It", sub: "Saad Khondaker" },
    { name: "Marvel Studies", sub: "Marvel Studies" },
  ],
  institutions: [
    { name: "Krirk University", sub: "Thailand" },
    { name: "Lincoln University College", sub: "Malaysia" },
    { name: "Britts Imperial Global Education", sub: "United Arab Emirates" },
    { name: "Regent Middle East", sub: "United Arab Emirates" },
  ],
};

export const recentActivities = [
  { action: "IMPERSONATE LOGIN", desc: "logged in as this account", by: "By Dr. Ekramul Haque", date: "28 Sept 2026" },
  { action: "IMPERSONATE LOGIN", desc: "logged in as this account", by: "By Dr. Ekramul Haque", date: "28 Sept 2026" },
  { action: "IMPERSONATE LOGIN", desc: "logged in as this account", by: "By Dr. Ekramul Haque", date: "28 Sept 2026" },
  { action: "ADD PROGRAM", desc: "added program", by: "By Management & Science University (MSU)", date: "28 Sept 2026" },
  { action: "ADD PROGRAM", desc: "added program", by: "By Management & Science University (MSU)", date: "28 Sept 2026" },
];

export const funnelSteps = [
  { label: "Registered", value: 57, color: "#3b82f6" },
  { label: "Students Applied", value: 31, color: "#22c55e" },
  { label: "Sent to University", value: 4, color: "#60a5fa" },
  { label: "Offer Received", value: 0, color: "#f59e0b" },
  { label: "Accepted Applications", value: 13, color: "#10b981" },
];
