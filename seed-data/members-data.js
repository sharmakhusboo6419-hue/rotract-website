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
  const initials = String(name || 'RACPC')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase() || 'R';

  const palette = ['d4af37', 'b8860b', '8b6914', 'c69c2e', 'e0b84b', 'a8801f', '5c4310'];
  const hash = [...String(name || 'RACPC')].reduce((value, character) => value + character.charCodeAt(0), 0);
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
    bio: 'The President is the chief executive officer of the Rotaract Club, responsible for leading the club, presiding over meetings, and representing the club in official functions. The President provides vision, direction, and leadership to ensure the club achieves its goals and fulfills its mission.',
    photoUrl: '/images/skanda.jpeg'
  },
  {
    name: 'Rtr. Avnish Kumar',
    role: 'Vice-President',
    bio: 'The Vice-President assists the President in leading the Rotaract Club and may take on additional responsibilities as needed.',
    photoUrl: '/images/avnish-kumar-2026.jpeg'
  },
  {
    name: 'Rtr. Dolly Gupta',
    role: 'Secretary',
    bio:
      `Bachelor of Business administration (BBA)

I am a friendly and enthusiastic person who loves music, dancing, and travelling. I enjoy meeting new people and can easily make others feel comfortable. I believe in spreading positivity, building meaningful connections, and learning from every experience. I am a quick learner, and always ready to take on new challenges with confidence and dedication.`,
    photoUrl: '/images/dolly-gupta.jpeg'
  },
  {
    name: 'Rtr. Deepak Kumar Barik',
    role: 'Operation Secretary',
    bio: `Bachelor of Business Administration (BBA)
I am a dedicated BBA student with a strong passion for leadership, creativity, and continuous learning. I take pride in organizing events, leading teams, and creating impactful digital content that connects with people. Through my active involvement in the Rotaract Club and various college initiatives, I have developed skills in communication, teamwork, event management, and public relations.`,
      
    photoUrl: '/images/deepak-kumar-barik.jpeg'
  },
  {
    name: 'Rtr. Patan Anif',
    role: 'Sergeant-At-Arms',
    bio: 'The Sergeant-at-Arms is responsible for maintaining order and decorum during club meetings and events. This role involves ensuring that meetings run smoothly, enforcing rules and procedures, and assisting with the setup and organization of events.',
    photoUrl: '/images/patan-anif.jpeg',
  },
  
  {
    name: 'Rtr. Sathwik',
    role: 'Club Treasurer',
    bio: 'The Club Treasurer is responsible for managing the club\'s finances, including budgeting, accounting, and ensuring financial transparency.',
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
    bio:
      `I'm a BCA student with a curious mind and a passion for technology. I love exploring the ever-changing world of tech, where every challenge is an opportunity to learn something new. Beyond coding and innovation, I enjoy leading creative projects, transforming ideas into reality, and paying attention to the little details that make a big difference. I believe kindness, creativity, and continuous learning define who I am. My goal is to keep growing, inspire those around me, and leave a positive impact through both technology and meaningful connections.`,
    photoUrl: '/images/sandhya-new.jpeg'
  },
  {
    name: 'Rtr. Ramya',
    role: 'Public Relations Director',
    bio:`I am currently pursuing BCA
I am a hardworking and determined person who always tries to learn and improve. I believe that every challenge is an opportunity to grow. I am kind, respectful, and supportive of the people around me. I take responsibility for my work and never give up easily. I am proud of my willingness to keep moving forward, learn from my mistakes, and become a better version of myself every day.`,
    photoUrl: '/images/ramya.jpeg'
  },
  {
    name: 'Rtr. Khusboo Sharma',
    role: 'Cultural Event Director',
    bio:
      'The Cultural Event Director in  Rotaract Club is responsible for planning and managing all cultural and entertainment activities that strengthen fellowship, celebrate diversity, and encourage member participation. While each club may define director roles differently, Rotaract clubs commonly assign directors to lead specific areas and organize activities aligned with the club\'s annual goals.',
    photoUrl: '/images/khusboo-sharma.jpeg'
  },

  {
    name: 'Rtr. Vani Ray',
    role: 'Director of Events',
    bio: `Bachelors of business administration ( BBA) 
One thing I’m truly proud of is my ability to connect with people and create positive vibe wherever I go. I am someone who loves being pro active on social media and connect with others .
I love dancing, swimming, and travelling because each of these activities teaches me  confidence, discipline, adaptability, and the joy of exploring new perspectives.`,
    photoUrl: '/images/vani-ray.jpeg',
  },
  {
    name: 'Rtr. Aditya Raj',
    role: 'Director of Events',
    bio: `I’m currently pursuing BCA (Bachelor of Computer Application).
One quality I am truly proud of is my ability to connect with people and make them feel comfortable. I have a friendly and approachable personality, which helps me build meaningful relationships with people from different backgrounds. I enjoy meeting new people, listening to their perspectives, and learning from their experiences.

I also have a curious mindset and love exploring new ideas. Whether it is taking on a new challenge, learning a new skill, or finding creative solutions to problems, I always look for opportunities to grow. I believe that every new experience teaches us something valuable and helps us become a better version of ourselves.`,
    photoUrl: '/images/aditya-raj.jpeg',
  },
   {
    name: 'Rtr. Hamid Ashraf',
    role: 'Club Service Director',
    bio: 'The club service director is responsible for overseeing the club\'s internal operations, ensuring that meetings, events, and activities run smoothly and efficiently.',
    photoUrl: '/images/hamid-ashraf.jpeg'
  },

  {
    name: 'Rtr. Kaneez Fatima',
    role: 'Club Service Director',
    bio: 'The club service director is responsible for overseeing the club\'s internal operations, ensuring that meetings, events, and activities run smoothly and efficiently.',
    photoUrl: '/images/kaneez-fatima.jpeg',
  },
  {
    name: 'Rtr. Adithyian Vinod',
    role: 'Community Service Director',
    bio: `I am currently pursuing a Bachelor of Commerce (B.Com.) in Banking and Finance. I am passionate about developing my leadership skills and enjoy taking responsibility in team activities. One thing I am proud of is my ability to lead and work well with others while creating a positive and supportive environment.

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
    bio: 'A dedicated member of the Rotaract Club, contributing to various initiatives and activities.',
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
].map((member) => ({ ...member, category: MEMBER_CATEGORIES.LEADERSHIP }));

const membersList = [
 
  
  {
    name: 'Rtr. Dithipriya Dutta',
    role: 'Public Relational Director',
    bio: 'The Public Relations Director is responsible for managing the club\'s image, promoting its activities, and maintaining communication with members, the public, and the media. This role involves creating marketing materials, managing social media accounts, and fostering positive relationships with stakeholders.',
    photoUrl: '/images/dithi-priya.jpeg',
  },
  
  
].map((member) => ({ ...member, category: MEMBER_CATEGORIES.MEMBER }));

module.exports = { teamMembers, membersList };
