import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed posts
  const postsCount = await prisma.post.count();
  if (postsCount === 0) {
    await prisma.post.createMany({
      data: [
        {
          title: "Getting Started with Next.js",
          excerpt:
            "Learn the basics of Next.js App Router and build your first application.",
          content:
            "Next.js is a React framework that enables server-side rendering and static site generation. With the App Router, you can build modern web applications using file-based routing, layouts, and React Server Components.",
          coverImage: "/images/nextjs-intro.jpg",
          author: "Admin",
          date: "2026-04-01",
        },
        {
          title: "Understanding Server Components",
          excerpt:
            "Dive deep into React Server Components and how they work in Next.js.",
          content:
            "React Server Components allow you to render components on the server, reducing the amount of JavaScript sent to the client. They are the default in Next.js App Router and are great for data fetching and static content.",
          coverImage: "/images/server-components.jpg",
          author: "Admin",
          date: "2026-04-02",
        },
        {
          title: "Routing in the App Router",
          excerpt:
            "Explore file-based routing, dynamic routes, and route groups.",
          content:
            "The App Router uses a file-system based routing approach. Folders define route segments, and special files like page.tsx and layout.tsx define the UI for each segment. Route groups, dynamic routes, and catch-all routes provide flexible URL patterns.",
          coverImage: "/images/app-router.jpg",
          author: "Admin",
          date: "2026-04-03",
        },
      ],
    });
    console.log("Seeded 3 posts");
  }

  // Seed default user
  const usersCount = await prisma.user.count();
  if (usersCount === 0) {
    await prisma.user.create({
      data: {
        name: "Admin",
        email: "admin@gmail.com",
        password: "admin123",
      },
    });
    console.log("Seeded default admin user");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
