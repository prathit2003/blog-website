const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const runSeed = async () => {
  // Step 1: Create Users
  const usersData = [
    { email: 'john.doe@example.com', password: 'password123', firstname: 'John', username: 'john_doe' },
    { email: 'jane.smith@example.com', password: 'password123', firstname: 'Jane', username: 'jane_smith' },
    { email: 'emma.brown@example.com', password: 'password123', firstname: 'Emma', username: 'emma_brown' },
    { email: 'michael.jones@example.com', password: 'password123', firstname: 'Michael', username: 'michael_jones' },
    { email: 'oliver.johnson@example.com', password: 'password123', firstname: 'Oliver', username: 'oliver_johnson' },
    { email: 'sophia.davis@example.com', password: 'password123', firstname: 'Sophia', username: 'sophia_davis' },
    { email: 'liam.martin@example.com', password: 'password123', firstname: 'Liam', username: 'liam_martin' },
    { email: 'ava.lee@example.com', password: 'password123', firstname: 'Ava', username: 'ava_lee' },
    { email: 'noah.wilson@example.com', password: 'password123', firstname: 'Noah', username: 'noah_wilson' },
    { email: 'mia.white@example.com', password: 'password123', firstname: 'Mia', username: 'mia_white' },
  ];

  const users = await prisma.user.createMany({ data: usersData });
  console.log(`${users.count} users created.`);

  // Step 2: Create Tags
  const tagsData = [
    { name: 'Technology' },
    { name: 'Health' },
    { name: 'Education' },
    { name: 'Travel' },
    { name: 'Food' },
    { name: 'Lifestyle' },
    { name: 'Finance' },
    { name: 'Science' },
    { name: 'Sports' },
    { name: 'Entertainment' },
    { name: 'History' },
    { name: 'Music' },
    { name: 'Art' },
    { name: 'Culture' },
    { name: 'Gaming' },
  ];

  const tags = await prisma.tag.createMany({ data: tagsData });
  console.log(`${tags.count} tags created.`);

  // Step 3: Create Posts
  const postsData = [
    {
      title: 'The Future of Artificial Intelligence',
      content: 'Artificial Intelligence is shaping our future, transforming industries, and redefining what’s possible.',
      authorId: 1, // John
      likes: 120,
      comments: 35,
      published: true,
      tags: ['Technology', 'Science'],
    },
    {
      title: '10 Tips for a Healthier Lifestyle',
      content: 'Adopting small changes can have a big impact on your health and well-being.',
      authorId: 2, // Jane
      likes: 89,
      comments: 20,
      published: true,
      tags: ['Health', 'Lifestyle'],
    },
    {
      title: 'Exploring the World: Top Travel Destinations',
      content: 'From the mountains to the beaches, here are some must-visit destinations for travelers.',
      authorId: 3, // Emma
      likes: 150,
      comments: 45,
      published: true,
      tags: ['Travel', 'Lifestyle'],
    },
    {
      title: 'The Evolution of Space Exploration',
      content: 'A journey through the milestones in space exploration and what lies ahead.',
      authorId: 4, // Michael
      likes: 200,
      comments: 50,
      published: true,
      tags: ['Science', 'History'],
    },
    {
      title: 'A Beginner’s Guide to Investing',
      content: 'Learn the basics of investing and how to grow your wealth over time.',
      authorId: 5, // Oliver
      likes: 75,
      comments: 15,
      published: false,
      tags: ['Finance'],
    },
    {
      title: 'The Impact of Climate Change on Our Planet',
      content: 'Understanding the science behind climate change and its effects.',
      authorId: 6, // Sophia
      likes: 180,
      comments: 40,
      published: true,
      tags: ['Science', 'Education'],
    },
    {
      title: 'Mastering the Art of Cooking',
      content: 'Explore tips and tricks to take your culinary skills to the next level.',
      authorId: 7, // Liam
      likes: 60,
      comments: 10,
      published: true,
      tags: ['Food', 'Lifestyle'],
    },
    {
      title: 'The Rise of Esports',
      content: 'How esports is becoming a global phenomenon in the gaming world.',
      authorId: 8, // Ava
      likes: 140,
      comments: 30,
      published: true,
      tags: ['Gaming', 'Sports'],
    },
    {
      title: 'The History of Classical Music',
      content: 'Dive into the rich history of classical music and its timeless influence.',
      authorId: 9, // Noah
      likes: 50,
      comments: 5,
      published: false,
      tags: ['Music', 'Art'],
    },
    {
      title: 'Building a Startup from Scratch',
      content: 'A practical guide to turning your business idea into a reality.',
      authorId: 10, // Mia
      likes: 95,
      comments: 25,
      published: true,
      tags: ['Finance', 'Technology'],
    },
  ];

  for (const post of postsData) {
    const postTags = await prisma.tag.findMany({
      where: { name: { in: post.tags } },
    });

    await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        authorId: post.authorId,
        likes: post.likes,
        comments: post.comments,
        published: post.published,
        tags: {
          connect: postTags.map((tag) => ({ id: tag.id })),
        },
      },
    });
  }

  console.log(`${postsData.length} posts created.`);
};

runSeed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
