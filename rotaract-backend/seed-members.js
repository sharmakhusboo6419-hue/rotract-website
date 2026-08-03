

const { connectDB, disconnectDB } = require('./db');
const { MEMBER_CATEGORIES } = require('./constants');
const { validateMember } = require('./member-validation');
const Member = require('./models/Member');
const { membersList } = require('./seed-data/members-data');

async function seedMembers() {
  const validatedMembers = [];
  const invalidMembers = [];

  for (const member of membersList) {
    const errors = validateMember(member);
    if (errors.length > 0) {
      invalidMembers.push({ member, errors });
    } else {
      validatedMembers.push(member);
    }
  }

  if (invalidMembers.length > 0) {
    console.error('❌ Skipping invalid members:');
    for (const { member, errors } of invalidMembers) {
      console.error(`  - ${member.name}: ${errors.join('; ')}`);
    }
  }

  if (validatedMembers.length === 0) {
    console.error('❌ No valid members to seed. Aborting.');
    process.exit(1);
  }

  await connectDB();

  try {
    // Only clear previous non-leadership members — leadership is managed by seed-team.js.
    await Member.deleteMany({ category: { $ne: MEMBER_CATEGORIES.LEADERSHIP } });
    await Member.insertMany(validatedMembers);

    console.log(`🚀 Successfully inserted ${validatedMembers.length} members into MongoDB!`);
  } catch (err) {
    console.error('❌ Seeding Error:', err.message);
    process.exitCode = 1;
  } finally {
    await disconnectDB();
  }
}

seedMembers();
