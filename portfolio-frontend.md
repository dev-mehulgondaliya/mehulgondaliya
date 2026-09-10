# Mehul Gondaliya — Portfolio Website Frontend Specification

## 1. Project Overview

Build a **single-page personal portfolio website** for:

**Mehul Gondaliya**  
**MERN Stack Developer & Freelancer**

Primary stack:
- Next.js (App Router)
- JavaScript
- React.js
- Tailwind CSS
- Firebase
- Lucide React / React Icons
- Responsive UI for mobile, tablet and desktop

The visual direction should be inspired by the supplied portfolio reference image:
- Dark premium background
- Purple/violet glow effects
- Minimal, modern typography
- Large centered content area
- Soft glassmorphism cards
- Smooth section transitions
- Subtle animations
- Developer/technology-focused visual language

Do not copy the reference content. Use it only as UI/UX inspiration.

---

# 2. Main Goals

The portfolio should:

1. Present Mehul as a professional MERN Stack Developer.
2. Clearly communicate full-stack development skills.
3. Showcase projects dynamically.
4. Allow project information to be edited from an admin dashboard.
5. Allow project images to be changed dynamically.
6. Allow project URLs/demo URLs/GitHub URLs to be changed dynamically.
7. Allow project descriptions and technology lists to be edited dynamically.
8. Provide a contact form.
9. Store contact submissions in Firebase.
10. Protect the admin area with Firebase Authentication.
11. Provide a clean admin UI for managing projects and contact messages.
12. Work perfectly on mobile, tablet and desktop.

---

# 3. Single Page Sections

The public portfolio should use one main page:

`/`

Recommended sections:

1. Navbar
2. Hero
3. About
4. Skills / Tech Stack
5. Experience
6. Projects
7. Services
8. Contact
9. Footer

Use smooth scrolling between sections.

---

# 4. Navbar

Desktop:

- Logo / initials: `MG`
- Home
- About
- Skills
- Experience
- Projects
- Contact
- Hire Me CTA

Mobile:

- Logo
- Hamburger menu
- Slide/dropdown navigation

Navbar should become sticky after scrolling.

---

# 5. Hero Section

Main heading:

> Hi, I'm Mehul Gondaliya

Subheading:

> MERN Stack Developer & Freelancer

Technology line:

> React.js • Next.js • Node.js • MongoDB • Tailwind CSS • JavaScript

Short introduction:

> I build scalable, modern and user-focused web applications using modern JavaScript technologies.

Primary CTA:

`View Projects`

Secondary CTA:

`Let's Work Together`

Optional social icons:
- GitHub
- LinkedIn
- Email

LinkedIn:
`https://www.linkedin.com/in/dev-mehul-gondaliya/`

Hero visual can contain:
- Developer-style abstract graphic
- Code window
- Floating technology icons
- Purple glow
- Small animated particles

Avoid using an unnecessary profile photo unless one is intentionally added later.

---

# 6. About Section

Title:

> About Me

Content:

> I am a MERN Stack Developer and Freelancer with experience building full-stack web applications using modern JavaScript technologies.

Focus on:
- Frontend development
- Backend development
- REST APIs
- Database design
- Performance
- Scalable application architecture
- Cloud services
- Caching
- Queue-based services

Use a modern split layout:

Left:
- About text

Right:
- Skill/technology cards
- Developer statistics

---

# 7. Skills / Tech Stack

Create categorized technology cards.

## Frontend

- React.js
- Next.js
- JavaScript
- HTML
- CSS
- Tailwind CSS
- Redux Toolkit

## Backend

- Node.js
- Express.js
- REST API
- JavaScript
- BullMQ

## Database

- MongoDB
- Firebase / Firestore

## Performance / Infrastructure

- Redis
- AWS S3

## Tools

- Git
- GitHub
- GitLab
- Bitbucket
- ESLint
- Prettier
- ClickUp

Each technology should have an icon.

Use icons from:

`lucide-react`

and/or:

`react-icons`

Do not manually create unnecessary SVG files for common technology icons.

---

# 8. Experience Section

Display experience as a vertical timeline or modern cards.

## Knovator Technologies Pvt Ltd

Position:
`MERN Stack Developer`

Duration:
`Feb 2024 - Present`

Location:
`Rajkot, Gujarat, India`

## Mind Space

Position:
`Front-End Developer`

Duration:
`Sep 2023 - Feb 2024`

Location:
`Delhi, India · Remote`

Cards should be visually minimal with:
- Company
- Role
- Duration
- Location
- Short description
- Technology badges

---

# 9. Projects Section

This is the most important dynamic section.

Projects MUST NOT be hardcoded directly into the UI.

Fetch projects from Firebase Firestore.

Example document:

```js
{
  title: "MJ Trade Solution",
  slug: "mj-trade-solution",
  shortDescription: "Trading and market analysis platform.",
  description: "Detailed project description...",
  imageUrl: "...",
  liveUrl: "...",
  githubUrl: "...",
  technologies: [
    "Next.js",
    "Node.js",
    "MongoDB",
    "Redis"
  ],
  featured: true,
  order: 1,
  status: "published",
  createdAt: "...",
  updatedAt: "..."
}
```

---

# 10. Dynamic Project UI

Each project card should contain:

- Project image
- Project title
- Short description
- Technology badges
- Live Demo button
- GitHub button
- View Details button

Optional hover effects:
- Image zoom
- Purple glow
- Card lift
- Border animation

Project detail can open as:
- Modal, or
- Dedicated dynamic route

Recommended route:

`/projects/[slug]`

The homepage still remains a single-page portfolio experience.

---

# 11. Admin Project Management

Create protected admin routes:

`/admin/login`

`/admin`

`/admin/projects`

`/admin/projects/create`

`/admin/projects/[id]/edit`

Admin should be able to:

- Create project
- Edit project
- Delete project
- Publish/unpublish project
- Mark featured
- Change project order
- Change image
- Change project URL
- Change GitHub URL
- Change description
- Change technologies
- Change title
- Change slug

The public website should automatically display the latest published projects.

---

# 12. Project Image Management

Use Firebase Storage.

Admin form:

- Image upload
- Image preview
- Replace image
- Remove image

Store only the image URL/path reference in Firestore.

Do not store large binary image data inside Firestore documents.

Recommended image path:

`projects/{projectId}/{filename}`

---

# 13. Services Section

Recommended services:

### Full Stack Development
Build complete web applications from frontend to backend.

### Next.js Development
Build fast, SEO-friendly and scalable applications.

### REST API Development
Create secure and maintainable REST APIs.

### Database Development
Design MongoDB and Firestore data structures.

### Performance Optimization
Improve application speed, caching and backend performance.

### Freelance Development
Develop custom web solutions for startups and businesses.

---

# 14. Contact Section

Fields:

- Name
- Email
- Subject
- Message

Submit button:

`Send Message`

Success message:

`Thanks! Your message has been received.`

Error message:

`Something went wrong. Please try again.`

The contact form should save submissions to Firebase Firestore.

Add:
- Email icon
- LinkedIn
- GitHub
- Optional phone/email display

---

# 15. Contact Form UX

Requirements:

- Client-side validation
- Required field validation
- Email validation
- Loading state
- Disabled submit button while sending
- Success state
- Error state
- Anti-spam protection/rate limiting where practical
- Do not expose Firebase Admin credentials in frontend code

---

# 16. Admin Dashboard UI

Dashboard layout:

Desktop:
- Left sidebar
- Main content

Mobile:
- Hamburger button
- Collapsible sidebar

Sidebar:

- Dashboard
- Projects
- Add Project
- Messages
- Settings
- Logout

Dashboard cards:

- Total Projects
- Published Projects
- Featured Projects
- New Messages

Use reusable table components for admin data.

---

# 17. Project Table

Columns:

- Image
- Title
- Technologies
- Status
- Featured
- Created Date
- Actions

Actions:
- View
- Edit
- Publish/Unpublish
- Delete

Use pagination.

Recommended page sizes:
- 10
- 50

Include search.

---

# 18. Contact Messages Table

Columns:

- Name
- Email
- Subject
- Message preview
- Status
- Created Date
- Actions

Statuses:

- New
- Read
- Replied
- Archived

---

# 19. Responsive Design

Mobile-first design.

Breakpoints should support:

- Mobile
- Tablet
- Laptop
- Large desktop

Important:
- No horizontal overflow
- Cards stack correctly
- Images remain responsive
- Buttons remain touch-friendly
- Navigation becomes mobile menu
- Admin sidebar becomes drawer

---

# 20. Visual Design System

Background:

Very dark purple/black.

Use gradients such as:

- dark purple
- violet
- deep indigo

Use glow effects behind:
- Hero
- Project cards
- CTA
- Selected technology icons

Cards:
- Rounded corners
- Thin border
- Slight transparency
- Backdrop blur
- Soft shadow

Typography:
- Modern sans-serif
- Large bold headings
- Comfortable paragraph spacing

Do not overuse glow effects.

---

# 21. Animation

Use lightweight animations.

Recommended:
- Framer Motion / Motion
- CSS transitions

Animations:
- Hero entrance
- Scroll reveal
- Card hover
- Button hover
- Navbar transition
- Project image hover
- Section reveal

Animations should respect:

`prefers-reduced-motion`

---

# 22. Recommended Next.js Structure

```text
src/
├── app/
│   ├── layout.js
│   ├── page.js
│   ├── globals.css
│   │
│   ├── projects/
│   │   └── [slug]/
│   │       └── page.js
│   │
│   └── admin/
│       ├── login/
│       │   └── page.js
│       ├── page.js
│       ├── projects/
│       │   ├── page.js
│       │   ├── create/
│       │   │   └── page.js
│       │   └── [id]/
│       │       └── edit/
│       │           └── page.js
│       └── messages/
│           └── page.js
│
├── components/
│   ├── layout/
│   ├── home/
│   ├── projects/
│   ├── contact/
│   ├── admin/
│   └── ui/
│
├── lib/
│   ├── firebase/
│   │   ├── config.js
│   │   ├── auth.js
│   │   ├── firestore.js
│   │   └── storage.js
│   └── utils/
│
├── hooks/
├── services/
├── constants/
└── types/
```

---

# 23. Reusable Components

Create reusable components instead of duplicating UI.

Examples:

```text
Button
SectionTitle
Container
GlassCard
IconButton
Badge
Modal
Input
Textarea
Select
Loader
EmptyState
ProjectCard
ProjectForm
ProjectTable
ExperienceCard
SocialLinks
Navbar
Footer
```

---

# 24. Important Architecture Rules

- Use Next.js App Router.
- Prefer Server Components by default.
- Use Client Components only where interaction is required.
- Keep Firebase client configuration separate.
- Never expose Firebase Admin SDK credentials to the browser.
- Keep Firestore operations inside reusable service functions.
- Keep UI components separate from data access.
- Use environment variables for Firebase configuration.
- Keep public portfolio and admin dashboard separate.
- Use Firestore security rules to protect data.
- Use Firebase Authentication for admin login.

---

# 25. SEO

Add:

- Metadata
- Title
- Description
- Open Graph metadata
- Twitter/X metadata
- Favicon
- Robots
- Sitemap

Suggested title:

`Mehul Gondaliya | MERN Stack Developer & Freelancer`

Suggested description:

`Mehul Gondaliya is a MERN Stack Developer and Freelancer specializing in React.js, Next.js, Node.js, MongoDB and modern full-stack web development.`

---

# 26. Final UX Direction

The final design should feel:

- Professional
- Premium
- Modern
- Developer-focused
- Minimal
- Fast
- Trustworthy
- Freelancer-friendly

The supplied reference image should be treated as the visual inspiration, especially its dark-purple atmosphere, centered layout, glow effects, project presentation and clean spacing.
