import prisma from '@component/lib/prismaClient';

const creators = [
  {
    title: 'Start Your Side Hustle',
    name: 'Gay Vee',
    content:
      "Embark on a journey towards financial independence. Each day, take a step towards brainstorming, validating, and launching your side business within a month. You'll learn about market research, branding, and online marketing.\n\nDay by day, you'll be closer to economic freedom and personal fulfilment.",
    authorId: 'garyvee',
    targetSessions: 30,
    targetSessionDuration: 60,
    periodicity: 'Daily',
    startingTimestamp: new Date('2023-05-20T15:00:00-04:00').getTime(),
    imageUrl: 'https://i.ytimg.com/vi/PqwFkPt7C_E/maxresdefault.jpg',
    userLimit: 1000,
    isPrivate: false,
  },
  {
    title: 'Declutter Your Space',
    name: 'Marie Kondo',
    content:
      "Experience the joy of tidying up. Each day, dedicate an hour to decluttering and organizing a specific area of your home.\n\nFollow the KonMari method to decide what brings joy to your life and what doesn't. Clear the clutter and transform your living space into a sanctuary.",
    authorId: 'konmari_co',
    targetSessions: 30,
    targetSessionDuration: 60,
    periodicity: 'Daily',
    startingTimestamp: new Date('2023-05-20T15:00:00-04:00').getTime(),
    imageUrl:
      'https://i.cbc.ca/1.4972060.1548096450!/fileImage/httpImage/marie-kondo.jpg',
    userLimit: 1000,
    isPrivate: false,
  },
  {
    title: 'Daily Drawing Challenge',
    name: 'Bob Ross',
    content:
      "Do you have a passion for drawing? Take part in this challenge to draw one picture every day. It doesn't matter what you draw, as long as you draw something.\n\nThis is a great way to improve your drawing skills and express your creativity. Let's get started!",
    authorId: 'proko',
    targetSessions: 30,
    targetSessionDuration: 60,
    periodicity: 'Daily',
    startingTimestamp: new Date('2023-05-20T15:00:00-04:00').getTime(),
    imageUrl: 'https://source.unsplash.com/random',
    userLimit: 1000,
    isPrivate: false,
  },
];

async function main() {
  for (let creator of creators) {
    // First, create the User.
    const newUser = await prisma.user.create({
      data: {
        name: creator.name,
        username: creator.username,
        email: `${creator.username}@example.com`, // Update this with real email or unique dummy email
        oauthProvider: 'twitter', // Provide your OAuth provider here
        image: creator.imageUrl,
        timeZone: 'America/Santiago', // Provide a default timezone if needed
        // Add other user fields as necessary
      },
    });

    // Then, create the Sadhana, associated with the User.
    await prisma.sadhana.create({
      data: {
        title: creator.challenge,
        content: creator.content,
        authorId: newUser.id,
        targetSessions: creator.targetSessions,
        targetSessionDuration: creator.targetSessionDuration,
        periodicity: 'daily',
        startingTimestamp: creator.startingTimestamp,
        imageUrl: creator.imageUrl,
        isPrivate: false,
      },
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
