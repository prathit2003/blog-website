import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedDatabase() {
  console.log("🌱 Seeding database...");

  const users = await prisma.user.createMany({
    data: [
      {
        email: "alice@example.com",
        password: "pass1234",
        bio: "Tech blogger and AI enthusiast.",
        username: "alice123",
      },
      {
        email: "bob@example.com",
        password: "securepass567",
        bio: "Travel writer and adventure seeker.",
        username: "bob_writer",
      },
      {
        email: "charlie@example.com",
        password: "uniquePass789",
        bio: "Software engineer and web developer.",
        username: "charlie_dev",
      },
      {
        email: "david@example.com",
        password: "strongPass321",
        bio: "Photographer and digital artist.",
        username: "david_photos",
      },
      {
        email: "emma@example.com",
        password: "emmaSecure987",
        bio: "Health and wellness advocate.",
        username: "emma_wellness",
      },
    ],
  });

  console.log("✅ Users created.");

  // Fetch users
  const alice = await prisma.user.findUnique({
    where: { username: "alice123" },
  });
  const bob = await prisma.user.findUnique({
    where: { username: "bob_writer" },
  });
  const charlie = await prisma.user.findUnique({
    where: { username: "charlie_dev" },
  });
  const david = await prisma.user.findUnique({
    where: { username: "david_photos" },
  });
  const emma = await prisma.user.findUnique({
    where: { username: "emma_wellness" },
  });

  if (!alice || !bob || !charlie || !david || !emma) {
    throw new Error("❌ Failed to retrieve users.");
  }

  // Create Posts
  await prisma.post.createMany({
    data: [
      {
        title: "The Future of Artificial Intelligence",
        content: `Artificial intelligence (AI) has seen rapid advancements over the past decade. Machine learning models, particularly deep learning architectures, have significantly improved natural language processing, computer vision, and decision-making tasks. Companies like OpenAI and Google have developed powerful AI models that can generate human-like text, translate languages, and even compose music.

        However, with great power comes great responsibility. AI ethics is now a major area of research, as developers and policymakers grapple with issues such as bias in AI models, misinformation, and the impact of automation on jobs. The future of AI will likely involve a combination of stronger regulations, explainable AI, and more ethical AI training methodologies.`,
        authorId: alice.id,
        published: true,
      },
      {
        title: "Exploring the Wonders of Europe",
        content: `Traveling through Europe offers a breathtaking experience unlike any other. From the Eiffel Tower in Paris to the ancient ruins of Rome, every city tells a story. One of the most enchanting places to visit is Prague, with its charming medieval architecture, cobbled streets, and vibrant nightlife. In contrast, Norway’s fjords provide a serene, nature-filled escape for those seeking adventure.

        Food is another aspect of European culture that travelers must experience. Italian pasta, Spanish tapas, and French pastries showcase the continent’s diverse culinary heritage. Whether you’re backpacking through hostels or enjoying a luxury stay in a historical castle, Europe is a must-visit for any travel enthusiast.`,
        authorId: bob.id,
        published: true,
      },
      {
        title: "Mastering Full-Stack Web Development",
        content: `The world of web development is constantly evolving. A decade ago, simple HTML, CSS, and JavaScript were enough to build a functioning website. Today, full-stack development involves a wide array of technologies, including frontend frameworks like React, backend solutions like Node.js, and databases such as PostgreSQL or MongoDB.

        Becoming a proficient full-stack developer requires understanding both the client and server sides of web applications. Learning DevOps, cloud computing, and CI/CD pipelines can further enhance a developer's skill set. The future of web development will focus on performance, scalability, and seamless user experiences.`,
        authorId: charlie.id,
        published: false,
      },
      {
        title: "The Art of Photography: Capturing Timeless Moments",
        content: `Photography is more than just taking pictures—it’s about telling stories through visuals. A well-composed photograph captures emotions, landscapes, and memories in a way that words often cannot. With advancements in camera technology, photographers now have access to high-resolution sensors, powerful zoom lenses, and AI-assisted editing tools that make the process more dynamic than ever.

        However, mastering photography requires understanding lighting, composition, and perspective. The rule of thirds, golden hour lighting, and proper framing can turn a simple snapshot into a masterpiece. Whether shooting with a DSLR or a smartphone, the essence of photography remains the same—freezing a moment in time.`,
        authorId: david.id,
        published: true,
      },
      {
        title: "The Science of a Healthy Lifestyle",
        content: `A healthy lifestyle is not just about eating the right foods or exercising regularly; it is a holistic approach that combines mental well-being, physical fitness, and emotional stability. Research shows that maintaining a balanced diet rich in whole foods, proteins, and healthy fats contributes significantly to overall well-being.

        Moreover, mindfulness and stress management play a vital role in health. Yoga, meditation, and deep-breathing exercises help reduce cortisol levels and promote relaxation. Living a healthy life is a continuous journey, but with small, consistent habits, anyone can achieve a happier and healthier state of being.`,
        authorId: emma.id,
        published: true,
      },
    ],
  });

  console.log("✅ Posts created.");

  // Create Comments
  await prisma.comment.createMany({
    data: [
      {
        content:
          "This is a great take on AI! I totally agree with your perspective.",
        authorId: bob.id,
        postId: 1,
      },
      {
        content:
          "Europe has always been on my bucket list! Thanks for the travel tips.",
        authorId: alice.id,
        postId: 2,
      },
      {
        content:
          "Web development is evolving so fast! Thanks for breaking it down.",
        authorId: david.id,
        postId: 3,
      },
      {
        content: "Photography is such a powerful medium! Love this article.",
        authorId: charlie.id,
        postId: 4,
      },
      {
        content:
          "Health and wellness should be a priority for everyone. Great insights!",
        authorId: bob.id,
        postId: 5,
      },
    ],
  });

  console.log("✅ Comments added.");

  // Create Likes
  await prisma.like.createMany({
    data: [
      { authorId: bob.id, postId: 1 },
      { authorId: charlie.id, postId: 1 },
      { authorId: alice.id, postId: 2 },
      { authorId: emma.id, postId: 5 },
      { authorId: david.id, postId: 4 },
    ],
  });

  console.log("✅ Likes added.");

  // Create Tags
  await prisma.tag.createMany({
    data: [
      { name: "Technology" },
      { name: "Travel" },
      { name: "Web Development" },
      { name: "Photography" },
      { name: "Health & Wellness" },
    ],
  });

  console.log("✅ Tags added.");

  // Create Subscriptions
  await prisma.subscription.createMany({
    data: [
      { username: "alice123", profilePicture: null },
      { username: "bob_writer", profilePicture: null },
      { username: "david_photos", profilePicture: null },
    ],
  });

  console.log("✅ Subscriptions added.");
  console.log("🎉 Database seeding completed!");
}

seedDatabase()
  .catch((e) => console.error("❌ Error seeding database:", e))
  .finally(() => prisma.$disconnect());
