# Next.js Learning Roadmap (App Router) Integrated with Mini Project: Blog Management Application

**Goal of the Blog Mini Project:** Build a complete blog application using the Next.js App Router, including functionalities for viewing, creating, editing, deleting posts, user management, performance optimization, and SEO.

---

## Module/Slide 1: Next.js Fundamentals (App Router)

### Theory:
- Introduction to Next.js and the App Router.
- The `app/` directory structure and conventions.
- Layouts and Nested Routing in the App Router.
- The difference between Server Components and Client Components.

### Blog Mini Project Practice Requirements:
- **1.1 Project Setup:** Initialize a new Next.js project using the command `npx create-next-app@latest simple-blog-admin --experimental-app`.
- **1.2 Basic Structure:** Create the `app/(dashboard)/` and `app/(auth)/` directories to organize the admin and authentication pages.
- **1.3 Homepage & Layout:** Create the homepage `app/page.tsx` to display "Welcome to Blog Admin" and a basic layout `app/layout.tsx` for the entire application (e.g., containing `<html>`, `<lang="en">`, `<head>`, `<body>`).
- **1.4 Simple Component:** Create a Client Component (e.g., `app/components/Greeting.tsx` with `'use client'`) to display a greeting and import it into the homepage.

---

## Module/Slide 2: Advanced Routing Techniques

### Theory:
- Dynamic Routes with directory/file naming conventions.
- Nested Routes and Layouts for complex structures.
- Catch-all and Optional Catch-all Routes.
- `Link` Component for navigation.
- Programmatic navigation with `useRouter` and `usePathname`.

### Blog Mini Project Practice Requirements:
- **2.1 Dynamic Post List:** Create a dynamic route `app/(dashboard)/posts/[postId]/page.tsx` to display the details of a single post.
- **2.2 Dashboard Layout:** Create `app/(dashboard)/layout.tsx` with a fixed navigation sidebar (Client Component) containing links to "All Posts" and "Add Post".
- **2.3 "All Posts" Page:** Create `app/(dashboard)/posts/page.tsx` to display a list of posts (dynamic data not yet required).
- **2.4 Navigation:** Use `Link` in the sidebar to navigate between pages. In a hypothetical `PostCard`, use `Link` to go to the post detail page.

---

## Module/Slide 3: Data Fetching Strategies

### Theory:
- Using Server Components with Async Data Fetching.
- Static Generation with `generateStaticParams` and `fetch`.
- Server-side Rendering and Streaming UI.
- Client-side Data Fetching with React Hooks and SWR/React Query.
- Creating and using Route Handlers in the `app/api` folder.

### Blog Mini Project Practice Requirements:
- **3.1 API Route for Posts:** Create an API Route at `app/api/posts/route.ts` to return a list of sample posts (mock data).
- **3.2 Server-side Data Fetching:** In `app/(dashboard)/posts/page.tsx` (Server Component), use `fetch` to retrieve the post list from the created API Route and display them.
- **3.3 Post Detail Fetching:** In `app/(dashboard)/posts/[postId]/page.tsx` (Server Component), use `fetch` and `params.postId` to retrieve the details of a specific post.
- **3.4 Static Generation (Optional):** If you have fixed post data, experiment with `generateStaticParams` to pre-render the post detail pages.

---

## Module/Slide 4: Styling and CSS in Next.js

### Theory:
- Using CSS Modules in the App Router.
- Integrating Sass/SCSS.
- Styled-components with Server Components.
- Configuring and using Tailwind CSS.

### Blog Mini Project Practice Requirements:
- **4.1 Tailwind CSS Configuration:** Install and configure Tailwind CSS for your project.
- **4.2 Applying Tailwind:** Use Tailwind classes to style the Header, Sidebar, PostCard, and other UI elements.
- **4.3 CSS Modules (Optional):** Try creating some specific styles for a small component using CSS Modules to see the difference.

---

## Module/Slide 5: Performance Optimization Techniques

### Theory:
- Image Optimization with `next/image`.
- Automatic Code Splitting and Parallel Loading.
- React Suspense and Lazy Loading with Loading UI.
- Caching Strategies and Incremental Static Regeneration (ISR).
- Tracking and improving Core Web Vitals.

### Blog Mini Project Practice Requirements:
- **5.1 Image Optimization:** Replace `<img>` tags with `next/image` for any images in the blog (e.g., post cover image, avatar).
- **5.2 Loading UI:** Create `app/(dashboard)/posts/loading.tsx` to display a loading UI while post data is being fetched.
- **5.3 Caching with fetch:** Experiment with `fetch` caching options in Server Component data fetching functions (e.g., `cache: 'no-store'` for always fresh data, `revalidate` for ISR).

---

## Module/Slide 6: State Management in Next.js Applications

### Theory:
- Leveraging React Context and Server Components for Global State.
- Integrating Redux Toolkit with Next.js App Router (Redux with App Router).
- Using Recoil and Zustand.
- Handling State Hydration between Server and Client.

### Blog Mini Project Practice Requirements:
- **6.1 Add/Edit Post Form (Client Component):** Create a Client Component at `app/(dashboard)/posts/create/page.tsx` or `app/(dashboard)/posts/[postId]/edit/page.tsx` with a form for adding/editing posts. Use `useState` to manage form state.
- **6.2 Temporary (Context/Prop Drilling):** To pass form data back to a Server Component or API Route, you can temporarily use prop drilling or a simple (Client-side) Context for small cases.

---

## Module/Slide 7: Authentication and Authorization

### Theory:
- Setting up NextAuth.js in the App Router.
- Building a custom authentication system with Server Actions.
- Implementing JWT Authentication and Secure APIs.
- Role-based access control with Middleware and Layouts.

### Blog Mini Project Practice Requirements:
- **7.1 NextAuth.js Setup:** Install and configure NextAuth.js with at least one provider (e.g., Credentials Provider or Google Provider).
- **7.2 Login/Register Pages:** Create the pages `app/(auth)/login/page.tsx` and `app/(auth)/register/page.tsx`.
- **7.3 Protecting API Routes:** Update the `/api/posts` API Routes to require user authentication.
- **7.4 Middleware:** Create a `middleware.ts` to protect the `/dashboard` routes, allowing access only to logged-in users.

---

## Module/Slide 8: Testing Next.js Applications

### Theory:
- Unit Testing Server and Client Components with Jest.
- Integration Testing with React Testing Library.
- End-to-End Testing with Cypress.
- Testing API Routes and Server Actions.

### Blog Mini Project Practice Requirements:
- **8.1 Unit Test Component:** Write a few unit tests for the `Header` or `PostCard` component using Jest and React Testing Library.
- **8.2 Test API Route:** Write a simple test for the `/api/posts` API Route to ensure it returns data in the correct format.

---

## Module/Slide 9: Deployment and Hosting

### Theory:
- Deploying App Router Projects to Vercel.
- Setting up Continuous Deployment with Netlify and other platforms.
- Containerizing Next.js Apps with Docker.
- Serverless Deployment Options and Edge Functions.

### Blog Mini Project Practice Requirements:
- **9.1 Deploy to Vercel:** Deploy your blog application to Vercel and explore the integrated features.
- **9.2 Environment Variable Configuration:** Ensure environment variables (e.g., for NextAuth.js) are correctly configured on Vercel.

---

## Module/Slide 10: SEO Optimization for Next.js

### Theory:
- Managing Metadata and Head Tags with `head.tsx` or the `metadata` object.
- Creating Dynamic Sitemaps.
- Implementing Structured Data with JSON-LD.
- Integrating AMP Pages (optional).

### Blog Mini Project Practice Requirements:
- **10.1 Dynamic Metadata:** Use the `metadata` object in `layout.tsx` and `page.tsx` (or `layouts.js`/`page.js` files) to manage the SEO title and description for each page (especially post detail pages).
- **10.2 Structured Data:** Add JSON-LD for posts on the detail page to improve search engine presentation.

---

## Advanced Modules (After completing the basic Blog Mini Project and deployment):

---

## Module/Slide 11: Scalability Patterns and Best Practices

### Theory:
- Organizing code with a Modular Folder Structure.
- Implementing Reusable Layout and Templates.
- Integrating Microservices and API Gateways.
- CDN Usage and Caching Strategies.
- Database Scaling Techniques.

### Blog Mini Project Practice Requirements:
- **11.1 Refactor Code:** Refactor components and modules for easier maintenance and scalability.
- **11.2 Database Introduction:** Replace mock data with a real database connection (e.g., MongoDB with Mongoose, PostgreSQL with Prisma) and update API Routes to interact with the DB.

---

## Module/Slide 12: Internationalization and Localization

### Theory:
- Setting up Next.js Internationalization with the App Router.
- Managing Dynamic Multilingual Content.
- Implementing RTL (Right-to-Left) Language Support.
- Language switching and locale-based routing.

### Blog Mini Project Practice Requirements:
- **12.1 Multi-language Support:** Add support for at least two languages (e.g., Vietnamese and English) for your blog, including language switching in the Header.
- **12.2 Translated Content:** Update post data to include translated content.

---

## Module/Slide 13: Redux With Next.js (App Router)

### Theory:
- When to use Redux with Next.js App Router.
- Required Libraries and Setup for Redux Toolkit.
- Suggested Folder Structure with `store/` and Redux Store.
- Store Configuration, Creating Async Slices with `createAsyncThunk`.
- Connecting Redux Store to Next.js App Router: Using Redux in Server and Client Components, Server Actions, and Data Fetching.

### Blog Mini Project Practice Requirements:
- **13.1 Redux Toolkit Integration:** Refactor post state management (and potentially user state) to use Redux Toolkit instead of `useState` or Context API.
- **13.2 Async Thunks:** Use `createAsyncThunk` to manage asynchronous tasks like fetching posts from the API.

---

## Module/Slide 14: Advanced Next.js Features and Patterns

### Theory:
- Using Middleware for Custom Server Logic and Edge Functions.
- Building Custom Servers and API Middleware.
- Static HTML Export and Serverless Environment Support.
- Creating Reusable API Middleware and Utilities.

### Blog Mini Project Practice Requirements:
- **14.1 Custom Middleware:** Create a custom middleware to log requests or add custom headers.
- **14.2 Server Actions:** Experiment with using Server Actions to handle form submissions (adding/editing posts) more directly and efficiently.
