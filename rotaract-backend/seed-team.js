const { connectDB, disconnectDB } = require('./db');
const { MEMBER_CATEGORIES } = require('./constants');
const { validateMember } = require('./member-validation');
const Member = require('./models/Member');
const { teamMembers } = require('./seed-data/members-data');

async function seedTeam() {
  const validatedMembers = [];
  const invalidMembers = [];

  for (const member of teamMembers) {
    const errors = validateMember(member);
    if (errors.length > 0) {
      invalidMembers.push({ member, errors });
    } else {
      validatedMembers.push(member);
    }
  }

  if (invalidMembers.length > 0) {
    console.error('❌ Skipping invalid team members:');
    for (const { member, errors } of invalidMembers) {
      console.error(`  - ${member.name}: ${errors.join('; ')}`);
    }
  }

  if (validatedMembers.length === 0) {
    console.error('❌ No valid team members to seed. Aborting.');
    process.exit(1);
  }

  await connectDB();

  try {
    // Only clear leadership members — do not wipe regular members.
    await Member.deleteMany({ category: MEMBER_CATEGORIES.LEADERSHIP });
    await Member.insertMany(validatedMembers);

    console.log(`🚀 Successfully inserted ${validatedMembers.length} leadership members!`);
  } catch (err) {
    console.error('❌ Error seeding team:', err.message);
    process.exitCode = 1;
  } finally {
    await disconnectDB();
  }
}

seedTeam();
