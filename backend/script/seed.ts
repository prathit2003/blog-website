import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedDatabase() {
  try {

    const users = await prisma.user.createMany({
      data: [
        { email: "john.doe1@example.com", password: "password123", firstname: "John", username: "johndoe" },
        { email: "jane.smith1@example.com", password: "password123", firstname: "Jane", username: "janesmith" },
        { email: "alice.brown1@example.com", password: "password123", firstname: "Alice", username: "alicebrown" },
        { email: "bob.miller1@example.com", password: "password123", firstname: "Bob", username: "bobmiller" },
        { email: "emily.davis1@example.com", password: "password123", firstname: "Emily", username: "emilydavis" },
        { email: "oliver.jackson1@example.com", password: "password123", firstname: "Oliver", username: "oliverjackson" },
        { email: "emma.thompson1@example.com", password: "password123", firstname: "Emma", username: "emmathompson" },
        { email: "liam.wilson1@example.com", password: "password123", firstname: "Liam", username: "liamwilson" },
        { email: "sophia.jones1@example.com", password: "password123", firstname: "Sophia", username: "sophiajones" },
        { email: "noah.moore1@example.com", password: "password123", firstname: "Noah", username: "noahmoore" },
        { email: "mia.taylor1@example.com", password: "password123", firstname: "Mia", username: "miataylor" },
        { email: "jack.anderson1@example.com", password: "password123", firstname: "Jack", username: "jackanderson" },
        { email: "amelia.clark1@example.com", password: "password123", firstname: "Amelia", username: "ameliaclarck" },
        { email: "lucas.hall1@example.com", password: "password123", firstname: "Lucas", username: "lucashall" },
        { email: "ava.young1@example.com", password: "password123", firstname: "Ava", username: "avayoung" },
      ],
    });


    const tags = await prisma.tag.createMany({
      data: [
        { name: "Technology" },
        { name: "Lifestyle" },
        { name: "Travel" },
        { name: "Food" },
        { name: "Health" },
        { name: "Education" },
        { name: "Environment" },
        { name: "Science" },
        { name: "Art" },
        { name: "History" },
      ],
    });


    const allUsers = await prisma.user.findMany();
    const allTags = await prisma.tag.findMany();


    const posts = [
      {
        title: "The Transformative Power of AI",
        content:
          "Artificial intelligence is no longer a concept of the future; it is a transformative force shaping our present. From healthcare to entertainment, AI is enabling innovations that were once deemed impossible. With machine learning and neural networks, industries are optimizing processes, personalizing experiences, and solving complex problems with unparalleled efficiency. It is revolutionizing diagnostic procedures, automating routine tasks, and enabling creative pursuits. The journey of AI has just begun, and its potential to redefine human capabilities continues to unfold at an unprecedented pace. This growing field holds promises and challenges as we explore its potential in creating a balanced and fair world.",
        authorId: allUsers[0].id,
        likes: 100,
        published: true,
        tags: [allTags[0], allTags[7]],
        comments: [
          { content: "Great post! Very insightful.", authorId: allUsers[1].id },
          { content: "AI is definitely the future.", authorId: allUsers[2].id },
        ],
      },
      {
        title: "Embracing Minimalism for a Fuller Life",
        content:
          "In a world driven by consumerism, minimalism offers a refreshing perspective. By focusing on essentials and decluttering both our physical and mental spaces, minimalism paves the way for a life of intentionality and purpose. It teaches us that less truly can be more, providing freedom from material distractions. With fewer possessions, individuals often find a greater sense of clarity, peace, and fulfillment. Minimalism is not about deprivation but about making space for what truly matters, be it relationships, passions, or personal growth. This approach advocates mindful decisions and fosters long-term satisfaction and happiness.",
        authorId: allUsers[1].id,
        likes: 75,
        published: true,
        tags: [allTags[1]],
        comments: [
          { content: "Minimalism changed my life.", authorId: allUsers[0].id },
          { content: "It's all about quality over quantity.", authorId: allUsers[3].id },
        ]
      },
      {
        title: "Discovering Hidden Travel Gems",
        content:
          "Travel is more than visiting famous landmarks; it is about discovering hidden gems that offer authentic experiences. From quaint villages tucked away in the hills to pristine beaches far from the crowds, these spots allow travelers to connect deeply with local culture and nature, creating unforgettable memories. Immersing oneself in off-the-beaten-path destinations fosters genuine interactions with locals, often unveiling stories and traditions that mainstream tourism overlooks. These experiences enrich our understanding of the world and leave a lasting impression that goes beyond photographs. By engaging with the world in this way, we redefine the essence of meaningful travel.",
        authorId: allUsers[2].id,
        likes: 85,
        published: true,
        tags: [allTags[2], allTags[3]],
        comments: [
          { content: "Great post! Very insightful.", authorId: allUsers[1].id },
        ],
      },
      {
        title: "The Joy of Culinary Exploration",
        content:
          "Cooking is a journey of exploration, where flavors, textures, and techniques converge to create art on a plate. Experimenting with ingredients from different cuisines not only expands our palate but also fosters an appreciation for diverse cultures and traditions, making every meal a celebration. The act of cooking transcends nourishment; it becomes an expression of creativity and love. Sharing meals with others builds bonds, and the stories behind recipes often reveal histories and emotions that make every dish truly special. This universal appeal of food bridges communities and celebrates diversity.",
        authorId: allUsers[3].id,
        likes: 60,
        published: true,
        tags: [allTags[3], allTags[4]],
        comments: [
          { content: "Great post! Very insightful.", authorId: allUsers[1].id },
        ]
      },
      {
        title: "Wellness in a Fast-Paced World",
        content:
          "In today’s hectic environment, prioritizing health and wellness is essential. Simple practices like mindfulness, balanced nutrition, and regular exercise can drastically improve our physical and mental well-being, ensuring that we thrive even amidst the chaos of daily life. Incorporating moments of stillness and gratitude into our routines can help us reconnect with ourselves and maintain inner peace. Wellness is not a destination but an ongoing journey of self-care and awareness, empowering us to lead balanced and fulfilling lives. It emphasizes the importance of resilience and adaptability in modern society.",
        authorId: allUsers[4].id,
        likes: 90,
        published: true,
        tags: [allTags[4]],
        comments: [
          { content: "Great post! Very insightful.", authorId: allUsers[1].id },
        ]
      },
      {
        title: "The Rise of Green Technology",
        content:
          "Green technology is at the forefront of global efforts to combat climate change. From renewable energy sources like solar and wind to innovations in sustainable agriculture, these advancements are reshaping industries for a more eco-friendly future. The integration of smart systems and energy-efficient solutions in urban planning highlights humanity's commitment to reducing its carbon footprint. As awareness of environmental issues grows, green technology stands as a beacon of hope, paving the way for a sustainable and prosperous planet. With innovations scaling globally, its impact is both profound and inspiring.",
        authorId: allUsers[5].id,
        likes: 120,
        published: true,
        tags: [allTags[6], allTags[0]],
        comments: [
          { content: "Great post! Very insightful.", authorId: allUsers[1].id },
        ]
      },
      {
        title: "Mindful Living in Modern Times",
        content:
          "Mindfulness is more than a trend; it is a profound way to engage with life fully. By being present in each moment, we can savor experiences and reduce stress. In a world that moves at a relentless pace, mindfulness offers a sanctuary of peace and clarity. Practices such as meditation and deep breathing cultivate a sense of gratitude and compassion, enriching our relationships and enhancing our overall well-being. Mindfulness empowers us to live intentionally and harmoniously. This art of conscious living enhances our ability to connect with ourselves and others deeply.",
        authorId: allUsers[6].id,
        likes: 110,
        published: true,
        tags: [allTags[1]],
        comments: [
          { content: "Great post! Very insightful.", authorId: allUsers[1].id },
        ]
      },
      {
        title: "Exploring Culinary Diversity",
        content:
          "Food is a gateway to cultural diversity, each dish telling a story of heritage and innovation. Exploring international cuisines not only tantalizes the taste buds but also broadens our perspective on global traditions. Whether it's savoring spicy street food in Asia or indulging in rich pastries in Europe, culinary adventures ignite a sense of wonder and connection. The universal love for food transcends borders, uniting people through shared experiences and flavors. This celebration of culinary diversity enriches not just the plate but the soul, connecting communities worldwide.",
        authorId: allUsers[7].id,
        likes: 95,
        published: true,
        tags: [allTags[3]],
        comments: [
          { content: "Great post! Very insightful.", authorId: allUsers[1].id },
        ]
      },
      {
        title: "Digital Detox: Reclaiming Our Time",
        content:
          "In the age of constant connectivity, a digital detox can be a transformative experience. Disconnecting from screens allows us to focus on the present and engage with the world around us. It encourages meaningful interactions and fosters creativity by reducing distractions. By setting boundaries with technology, we can reclaim our time and energy, paving the way for a more balanced and intentional life. A digital detox is not about abandoning technology but about using it more mindfully. This balance enhances productivity and improves the quality of life.",
        authorId: allUsers[8].id,
        likes: 70,
        published: true,
        tags: [allTags[1], allTags[4]],
        comments: [
          { content: "Great post! Very insightful.", authorId: allUsers[1].id },
        ]
      },
      {
        title: "The Art of Resilience",
        content:
          "Resilience is the cornerstone of human strength, enabling us to overcome adversity and adapt to change. It is cultivated through self-awareness, support systems, and a growth mindset. Challenges become opportunities for learning and growth when we approach them with resilience. This inner strength empowers us to navigate life's uncertainties with grace and determination, turning setbacks into stepping stones towards success. By fostering resilience, individuals can create meaningful and fulfilling lives, even amidst difficulties.",
        authorId: allUsers[9].id,
        likes: 80,
        published: true,
        tags: [allTags[4], allTags[6]],
        comments: [
          { content: "Great post! Very insightful.", authorId: allUsers[1].id },
        ]
      }
    ];


    for (const post of posts) {
      const createdPost = await prisma.post.create({
        data: {
          title: post.title,
          content: post.content,
          likes: post.likes,
          published: post.published,
          authorId: post.authorId,
          tags: {
            connect: post.tags.map((tag) => ({ id: tag.id })),
          },
          comments: {
            create: post.comments,
          },
        },
      });
      console.log(`Created post: ${createdPost.title}`);
    }
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
