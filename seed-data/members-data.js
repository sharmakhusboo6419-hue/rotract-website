const MEMBER_CATEGORIES = { LEADERSHIP: 'leadership', MEMBER: 'member' };

function escapeXml(value) {
  return String(value).replace(/[&<>"]|'/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;'
  }[character]));
}

function buildAvatarDataUri(name) {
  const initials = String(name || 'RCPC')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase() || 'R';

  const palette = ['d4af37', 'b8860b', '8b6914', 'c69c2e', 'e0b84b', 'a8801f', '5c4310'];
  const hash = [...String(name || 'RCPC')].reduce((value, character) => value + character.charCodeAt(0), 0);
  const background = palette[hash % palette.length];
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" role="img" aria-label="${escapeXml(name || 'Member')}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#${background}" />
          <stop offset="100%" stop-color="#3a2e00" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" rx="48" fill="url(#g)" />
      <circle cx="200" cy="170" r="74" fill="rgba(255,255,255,0.16)" />
      <text x="50%" y="56%" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="112" font-weight="700">${escapeXml(initials)}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.replace(/\s{2,}/g, ' ').trim())}`;
}

const teamMembers = [
   {
    name: 'Rtr. Skanda',
    role: 'President',
    bio: `Leader, passionate, kind.`,
    photoUrl: '/images/skanda.jpeg'
  },
  {
    name: 'Rtr. Avnish Kumar',
    role: 'Vice-President',
    bio: `I'm Avnish Kumar, currently pursuing my Bachelor of Business Administration (BBA) at Presidency College, Bangalore. I have the privilege of serving as the Vice President of the Rotaract Club of Presidency College.
I believe that leadership is not about holding a position—it's about taking responsibility, serving others, and inspiring people through actions. I enjoy organizing events, managing teams, and building meaningful connections with people. Every challenge I take on teaches me something new and helps me grow as both a leader and an individual.
Beyond academics, I am passionate about social service, event management, travelling, writing, and long-distance bike rides. I strive to remain disciplined, dependable, and committed in everything I do.
My goal is not just to achieve success for myself, but to create opportunities, bring people together, and leave a positive impact wherever I go. I want to be remembered as someone who led with humility, worked with dedication, and made a difference in the lives of others.`,
    photoUrl: '/images/avnish-kumar-2026.jpeg'
  },
  {
    name: 'Rtr. Dolly Gupta',
    role: 'Secretary',
    bio: `Friendly, compassionate, supportive.`,
    photoUrl: '/images/dolly-gupta.jpeg'
  },
  {
    name: 'Rtr. Deepak Kumar Barik',
    role: 'Operation Secretary',
    bio: `Creative, strategic thinker.`,
      
    photoUrl: '/images/deepak-kumar-barik.jpeg'
  },
  {
    name: 'Rtr. Patan Anif',
    role: 'Sergeant-At-Arms',
    bio: `Discipline, leadership, integrity.`,
    photoUrl: '/images/patan-anif.jpeg',
  },
  
  {
    name: 'Rtr. Sathwik',
    role: 'Club Treasurer',
    bio: `Hope, justice, purpose.`,
    photoUrl: '/images/sathwik-new.jpeg'
  },
  
  
  {
    name: 'Rtr. Sibhi Solanki',
    role: 'Club Treasurer',
    bio: `I am currently pursuing BBA (Bachelor of Business Administration).
I am proud of being someone who easily connects with people through my friendly and approachable personality. I believe that kindness, confidence, and genuine communication can leave a lasting impression, and I strive to make everyone around me feel comfortable and valued.
One of my greatest passions is travelling because it allows me to explore new cultures, meet diverse people, and learn valuable life lessons beyond the classroom. Every journey broadens my perspective and inspires me to become a more adaptable and open-minded individual.`,
    photoUrl: '/images/sibhi-solanki.jpeg',
  },
  {
    name: 'Rtr. Sandhya Kumari',
    role: 'Public Relations Director',
    bio: `Funny, ambitious, supportive.`,
    photoUrl: '/images/sandhya-new.jpeg'
  },
  {
    name: 'Rtr. Ramya',
    role: 'Public Relations Director',
    bio: `Confident, positive, brave.`,
    photoUrl: '/images/ramya.jpeg'
  },
  
  {
    name: 'Rtr. Dithipriya Dutta',
    role: 'Public Relational Director',
    bio: `Calm, confident, observant.`,
    photoUrl: '/images/dithi-priya.jpeg',
  },
  {
    name: 'Rtr. Kaneez Fatima',
    role: 'Club Service Director',
    bio: 'The club service director is responsible for overseeing the club\'s internal operations, ensuring that meetings, events, and activities run smoothly and efficiently.',
    photoUrl: '/images/kaneez-fatima.jpeg',
  },
  {
    name: 'Rtr. Hamid Ashraf',
    role: 'Club Service Director',
    bio: 'The club service director is responsible for overseeing the club\'s internal operations, ensuring that meetings, events, and activities run smoothly and efficiently.',
    photoUrl: '/images/hamid-ashraf.jpeg'
  },
  {
    name: 'Rtr. Khusboo Sharma',
    role: 'Cultural Event Director',
    bio:
      `A BCA (Data Science) student at Presidency College in Bengaluru with a strong interest in software development, web technologies, artificial intelligence, and data science.I enjoy learning by building real-world projects such as an Emergency Triage System, an AI Resume Analyzer, and a personal portfolio website, while continuously improving my skills in HTML, CSS, JavaScript, Python, SQL, and Linux. Alongside my technical interests, I actively participate in my college's Rotaract Club, contributing to event planning, public speaking, and leadership activities. I am focused on gaining practical experience through internships, strengthening my portfolio, and preparing for a successful career in the tech industry.`,
    photoUrl: '/images/khusboo-sharma.jpeg'
  },
  {
    name: 'Rtr. Iman Shariff',
    role: 'Cultural Event Director',
    bio: `Introvert, shy, under confident.`,
    photoUrl: '/images/iman-shariff.jpeg'
  },
  {
    name: 'Rtr. Vani Ray',
    role: 'Director of Events',
    bio: `Vibrant, goofy, expressive.`,
    photoUrl: '/images/vani-ray.jpeg',
  },
  {
    name: 'Rtr. Aditya Raj',
    role: 'Director of Events',
    bio: `Extrovert, adaptable, empathetic.`,
    photoUrl: '/images/aditya-raj.jpeg',
  },
  {
    name: 'Rtr. Adithyian Vinod',
    role: 'Community Service Director',
    bio: `Leadership-oriented, straightforward, and loyal.

Apart from academics, I enjoy spending quality time with my friends, exploring new places, and hanging out. I believe that strong relationships, teamwork, and continuous learning help me grow both personally and professionally.`,
    photoUrl: '/images/adithyian-vinod.png'
  },
  {
    name: 'Rtr. Monisha Kumari',
    role: 'Community Service Director',
    bio: `I'm a B.Com student with a strong interest in learning and personal growth. I am a confident, friendly, and approachable person who enjoys interacting with others. I love traveling and exploring new places, cultures, and ideas, as it helps me broaden my perspective. One of my greatest strengths is my curiosity and eagerness to learn new things. I believe my positive attitude, willingness to learn, and enthusiasm for exploring new experiences help me become a better person every day.`,
    photoUrl: '/images/monisha-kumari.jpeg'
  },
  {
    name: 'Rtr. Dhanush',
    role: 'International Service Director',
    bio: `I am Dhanush, currently pursuing a Bachelor of Commerce (B.Com.) in Banking and Finance. I am passionate about developing my leadership skills and enjoy taking responsibility in team activities. One thing I am proud of is my ability to lead and work well with others while creating a positive and supportive environment.

Apart from academics, I enjoy spending quality time with my friends, exploring new places, and hanging out. I believe that strong relationships, teamwork, and continuous learning help me grow both personally and professionally.`,
    photoUrl: '/images/dhanush.jpeg'
  },
  {
    name: 'Rtr. Kishan Pandey',
    role: 'Professional Development Director',
    bio: `I am currently pursuing a Bachelor of Business Administration (BBA). I am passionate about learning new thing improving my communication skills, and developing leadership qualities.
One thing I am proud of is my dedication to continuous learning and self-improvement. I enjoy taking on new challenges, working with teams, and finding practical solutions to problems. My goal is to build a successful career in the business world while making a positive impact through my knowledge, hard work, and commitment.`,
    photoUrl: '/images/kishan-pandey.jpeg'
  },
 
  {
    name: 'Rtr. Noor Hoorain',
    role: 'Professional Development Director',
    bio: 'I’m currently pursuing bca (so and ml).One thing I am truly proud of is stepping out of my comfort zone and embracing every opportunity to learn and grow. Whether it was participating in college events, presenting research papers, taking on leadership roles, or hosting events as an MC, each experience has helped me build confidence, strengthen my teamwork and communication skills, and develop a mindset of continuous learning. These experiences have shaped me into someone who is always ready to take on new challenges and make a positive impact.',
    photoUrl: '/images/noor-hoorain.jpeg',
  },
  {
    name: 'Rtr. Syed Mohd Zayeed',
    role: 'Professional Development Director',
    bio: `My name is Syed Mohammed Zaid currently pursuing BCA (AI and ML). One thing I am truly proud of is my ability to balance my passions with personal growth. Whether it's exploring the latest in technology, enjoying gaming sessions, jamming to music with friends, or learning more about bikes and cars, I always strive to make the most of every experience. These interests have taught me creativity, teamwork, problem-solving, and the value of staying curious. I believe that every hobby and every new challenge helps shape me into a more confident, adaptable, and well-rounded individual.`,
    photoUrl: '/images/syed-zayeed.jpeg'
  }
].map((member) => ({ ...member, category: MEMBER_CATEGORIES.LEADERSHIP }));

const membersList = [
 
  
  
].map((member) => ({ ...member, category: MEMBER_CATEGORIES.MEMBER }));

module.exports = { teamMembers, membersList };
