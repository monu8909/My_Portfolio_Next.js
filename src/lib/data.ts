import { 
  SiMongodb, 
  SiExpress, 
  SiReact, 
  SiNodedotjs, 
  SiTypescript, 
  SiNextdotjs, 
  SiRedis, 
  SiGraphql, 
  SiGit, 
  SiGithub, 
  SiTailwindcss, 
  SiJavascript, 
  SiReactquery, 
  SiMui ,
  SiRedux,
  SiAntdesign 
} from "react-icons/si";
import { LuTextCursorInput } from "react-icons/lu";

export const projects = [
  {
    id: 1,
    title: "AIC of India — Official Portal",
    description:
      "A comprehensive insurance platform for the Agriculture Insurance Company of India. Features complex risk management modules, farmer registration, and crop protection scheme integrations.",
    tags: ["React", "Python", "Enterprise", "Risk Management"],
    live: "https://www.aicofindia.com/",
    image: "/images/AIC-OF-INDIA-LIMITED.png",
    color: "#00d4ff",
  },
  {
    id: 2,
    title: "AIC Internal Portal",
    description:
      "Enterprise-grade internal management system for AIC. Streamlines insurance processing, claim settlements, and administrative workflows for agents and employees nationwide.",
    tags: ["React", "Material UI", "Dashboard", "Internal Tool"],
    live: "https://myaic.aicofindia.com/login",
    image: "/images/AIC-OF-INDIA-LIMITED1.png",
    color: "#7c3aed",
  },
  {
    id: 3,
    title: "AdminRmitra — NGO Management",
    description:
      "A specialized blockchain-powered admin portal (TDH_NGO) for organization management, featuring secure resource tracking and transparent reporting tools.",
    tags: [ "React", "Admin Portal", "IOTA"],
    live: "https://adminrmitra.empowerplus.co.in/",
    image: "/images/TDH_NGO.png",
    color: "#feb528",
  },
  {
    id: 4,
    title: "Meteryard India",
    description:
      "A leading Indian real estate marketplace providing verified property listings, intelligent search filters, and expert market advice for buyers and sellers.",
    tags: ["Next.js", "Real Estate", "Search", "Marketplace"],
    live: "https://www.meteryard.com/",
    image: "/images/Meteryard.png",
    color: "#00d4ff",
  },
  {
    id: 5,
    title: "leafly",
    description:
      "An innovative platform integrating modern technology with agricultural biotech and e-commerce, offering specialized solutions for the cannabis and cannabinoid industry.",
    tags: [  "E-commerce", "Specialized Solutions", "React"],
    live: "https://www.leafly.com/",
    image: "/images/Dispensary-deals-weed-promos-BOGO-deals-near-you-Leafly.png",
    color: "#feb528",
  },
  {
    id: 6,
    title: "Instructor Advisor",
    description:
      "A global marketplace for finding and booking expert instructors across various skills including sports, driving, and academics. Connects verified tutors with students.",
    tags: ["Fitness","Education", "React", "Booking System", "Marketplace"],
    live: "https://www.instructoradvisor.com/",
    image: "/images/Find-Expert-Instructors-Tutors-Near-You-Learn-Sports-Driving-Languages-More.png",
    color: "#7c3aed",
  },
  {
    id: 7,
    title: "CalisDiary",
    description:
      "A fitness tracking and progression diary platform specifically designed for calisthenics athletes to log workouts, track bodyweight strength, and monitor physical growth.",
    tags: ["Fitness", "Journal", "Progress Tracking", "React"],
    live: "https://calisdiary.com/",
    image: "/images/Cali-s-Diary.png",
    color: "#00d4ff",
  },
  {
    id: 8,
    title: "OWP — Online Web Portal",
    description:
      "AIC's livestock insurance portal safeguarding farmers' livelihoods against cattle loss due to diseases or accidents through digital policy management and quick claims.",
    tags: [ "Insurance", "Portal", "Agriculture"],
    live: "https://owp.aicofindia.com/",
    image: "/images/OWP.png",
    color: "#7c3aed",
  },
];

export const experiences = [
  {
    id: 1,
    role: "Frontend Developer",
    company: "Talent Pro India Pvt Ltd — React JS Developer — Deployed at Client: AIC)",
    period: "May 2023 — Present",
    description:
      "Frontend Developer with 3+ years of experience in React.js and Next.js, building scalable, responsive, and high-performance web applications with modern UI/UX and clean architecture. Focused on performance optimisation, reusable components, and delivering fast, secure, and user-friendly digital experiences.",
    tags: ["React", "Python", "SQL", ],
  },
  {
    id: 2,
    role: "React JS Developer",
    company: "Mobiloitted India Pvt. Ltd.",
    period: "2022 — 2023",
    description:
      "ReactJS Frontend Developer building responsive, scalable, and high-performance web applications using modern technologies and clean architecture.",
    tags: ["React", "Express", "MongoDB", "Redis", "GitHub Actions"],
  },
  {
    id: 3,
    role: "React JS Developer Internship",
    company: "Mobiloitted India Pvt. Ltd.",

    period: "2022",
    description:
      "Aspiring ReactJS Developer seeking an internship opportunity to build responsive and scalable web applications while gaining real-world industry experience and improving frontend development skills.",
    tags: ["React", "JavaScript", "CSS3", "REST API","Material UI","Redux Toolkit"],
  },
];

export const skills = [
  { name: "MongoDB", level: 70, color: "#47A248" },
  { name: "Express.js", level: 70, color: "#00d4ff" },
  { name: "React.js", level: 95, color: "#61DAFB" },
  { name: "Node.js", level: 90, color: "#8CC84B" },
  { name: "Javascript", level: 95, color: "#F7DF1E" },
  { name: "TypeScript", level: 75, color: "#3178C6" },
  { name: "Next.js", level: 88, color: "#fff" },

];

export const techStack = [
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", description: "NoSQL Database" },
  { name: "Express", icon: SiExpress, color: "#ffffff", description: "Backend Framework" },
  { name: "React", icon: SiReact, color: "#61DAFB", description: "UI Library" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", description: "Runtime Environment" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", description: "Type Safety" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", description: "React Framework" },
  { name: "Redis", icon: SiRedis, color: "#fff", description: "Caching Layer" },
  { name: "Cursor", icon: LuTextCursorInput, color: "#fff", description: "AI Assistant" },
  { name: "Context API", icon:   SiReact , color: "#61DAFB", description: "State Management" },
  { name: "Redux Toolkit", icon: SiRedux , color: "#E10098", description: "State Management" },
  { name: "Git", icon: SiGit, color: "#F05032", description: "Version Control" },
  { name: "Github", icon: SiGithub, color: "#ffffff", description: "Platform" },
  { name: "Javascript", icon: SiJavascript, color: "#F7DF1E", description: "Engine" },
  { name: "Tanstack Query", icon: SiReactquery, color: "#FF4154", description: "Data Fetching" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", description: "CSS Framework" },
  { name: "Material UI", icon: SiMui, color: "#007FFF", description: "Component Library" },
  { name: "Ant Design", icon: SiAntdesign , color: "#007FFF", description: "Component Library" },
];
