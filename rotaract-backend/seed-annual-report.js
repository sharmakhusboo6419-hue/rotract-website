const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('./models/Project');

const annualProjects = [
  {
    title: "Orientation",
    category: "Club Leadership & Training",
    description: "Our Rotaract club orientation session provided insights into the workings of Rotary, empowering new members with knowledge, structure, goals, and projects.",
    submittedBy: "Rotaract Club of Presidency College",
    email: "rotaract@presidency.edu.in"
  },
  {
    title: "Ashraya",
    category: "Community Service",
    description: "Visited an old-age home and orphanage, interacting with residents, playing games, sharing stories, and distributing goodies to spread joy.",
    submittedBy: "Rotaract Club of Presidency College",
    email: "rotaract@presidency.edu.in"
  },
  {
    title: "Parinama (Installation)",
    category: "Club Service",
    description: "Official installation ceremony for the new leadership board and team members for the RI Year 2024-25.",
    submittedBy: "Rotaract Club of Presidency College",
    email: "rotaract@presidency.edu.in"
  },
  {
    title: "BGMI Tournament",
    category: "Fundraising & E-Sports",
    description: "Hosted online and offline BGMI gaming segments featuring cash prizes of ₹1,500, raising funds for community causes.",
    submittedBy: "Rotaract Club of Presidency College",
    email: "rotaract@presidency.edu.in"
  },
  {
    title: "Dedication Stall",
    category: "Fundraising & Campus Service",
    description: "Initiative allowing freshers to buy personalized greeting cards and roses to express feelings to peers while raising club project funds.",
    submittedBy: "Rotaract Club of Presidency College",
    email: "rotaract@presidency.edu.in"
  },
  {
    title: "Raksha Bandhan Celebrations",
    category: "Community & Culture",
    description: "Rotaract members tied rakhis to college security personnel and support staff to express gratitude for their service and dedication.",
    submittedBy: "Rotaract Club of Presidency College",
    email: "rotaract@presidency.edu.in"
  },
  {
    title: "Sankalptaru",
    category: "Environmental Sustainability",
    description: "Joint environmental bike ride and plantation drive with Rotary Bangalore Raj Mahal Vilas and Rotaract Club of RIMS, visiting the Adiyogi statue.",
    submittedBy: "Rotaract Club of Presidency College",
    email: "rotaract@presidency.edu.in"
  },
  {
    title: "General Body Meeting",
    category: "Club Administration",
    description: "Strategic general body meeting to align members, discuss upcoming initiatives, and delegate project leadership roles.",
    submittedBy: "Rotaract Club of Presidency College",
    email: "rotaract@presidency.edu.in"
  },
  {
    title: "Teachers' Day Celebrations",
    category: "Institutional Service",
    description: "Distributed personalized dedication cards to college faculty members acknowledging their guidance and dedication.",
    submittedBy: "Rotaract Club of Presidency College",
    email: "rotaract@presidency.edu.in"
  },
  {
    title: "Rota Got Talent",
    category: "Cultural & Youth Service",
    description: "Talent showcase featuring singing, dancing, and drawing, with Chief Guest Ruben Stalin encouraging virtual and live participation.",
    submittedBy: "Rotaract Club of Presidency College",
    email: "rotaract@presidency.edu.in"
  },
  {
    title: "Swara 2025",
    category: "Health & Menstrual Hygiene",
    description: "A 9-day initiative promoting menstrual hygiene, featuring poster competitions, quizzes, photo booths, and a speaker session with Dr. Meenakshi Bharat.",
    submittedBy: "Rotaract Club of Presidency College",
    email: "rotaract@presidency.edu.in"
  },
  {
    title: "Independence Day Celebrations",
    category: "Patriotic & Community Service",
    description: "Celebrated Independence Day with government school children and honored local police officers and campus security guards with badges and supplies.",
    submittedBy: "Rotaract Club of Presidency College",
    email: "rotaract@presidency.edu.in"
  },
  {
    title: "Technoshala (Phase 1)",
    category: "Digital Literacy & Education",
    description: "Interactive session introducing government school students to basic computer operation and digital technology concepts.",
    submittedBy: "Rotaract Club of Presidency College",
    email: "rotaract@presidency.edu.in"
  },
  {
    title: "Club Outing",
    category: "Fellowship & Bonding",
    description: "Resort team-building outing focused on strengthening camaraderie, adventure activities, and peer bonding.",
    submittedBy: "Rotaract Club of Presidency College",
    email: "rotaract@presidency.edu.in"
  },
  {
    title: "Bali To Bangalore",
    category: "International Service",
    description: "International virtual cultural exchange between Rotaract Club of Presidency College and Rotaract Club of Aksakarsa Purwokerto (Indonesia).",
    submittedBy: "Rotaract Club of Presidency College",
    email: "rotaract@presidency.edu.in"
  },
  {
    title: "Badminton Fellowship",
    category: "Sports & Fellowship",
    description: "Friendly badminton tournament bringing club members together to promote health, sportsmanship, and teamwork.",
    submittedBy: "Rotaract Club of Presidency College",
    email: "rotaract@presidency.edu.in"
  },
  {
    title: "Fire Fest",
    category: "Fundraising & E-Sports",
    description: "Two-day Free Fire tournament featuring offline (internal) and online segments with cash prizes of ₹1,500.",
    submittedBy: "Rotaract Club of Presidency College",
    email: "rotaract@presidency.edu.in"
  },
  {
    title: "Sahara Anti-Drug Campaign",
    category: "Flagship Social Awareness",
    description: "Flagship anti-drug initiative featuring flash mobs and poster competitions at Orion Mall with the Assistant Commissioner of Police (ACP) as Chief Guest.",
    submittedBy: "Rotaract Club of Presidency College",
    email: "rotaract@presidency.edu.in"
  },
  {
    title: "Republic Day Celebrations",
    category: "Community & Civic Awareness",
    description: "Flag hoisting ceremony, national anthem, and civic interaction organized at a local government school.",
    submittedBy: "Rotaract Club of Presidency College",
    email: "rotaract@presidency.edu.in"
  },
  {
    title: "Technoshala (Phase 2)",
    category: "Digital Literacy & Education",
    description: "Advanced digital skills drive providing hands-on technology practical sessions for underprivileged students.",
    submittedBy: "Rotaract Club of Presidency College",
    email: "rotaract@presidency.edu.in"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas...");

    // Insert new projects
    await Project.insertMany(annualProjects);
    console.log(`🚀 Successfully inserted ${annualProjects.length} projects into MongoDB!`);
    
    process.exit();
  } catch (err) {
    console.error("❌ Seeding Error:", err.message);
    process.exit(1);
  }
}

seedDatabase();
