# Mehul Gondaliya Portfolio — Firebase Backend Specification

## 1. Backend Overview

The portfolio frontend uses Next.js App Router.

Firebase will provide the backend services:

- Firebase Authentication
- Cloud Firestore
- Firebase Storage
- Firebase Security Rules

Optional future services:
- Firebase Cloud Functions
- Email service
- Analytics

There is no need to create a separate Node.js/Express backend for the initial portfolio unless a future requirement needs server-side business logic.

---

# 2. Firebase Services

Enable:

1. Authentication
2. Firestore Database
3. Storage

Recommended authentication method:

- Email/Password

Optional later:
- Google Authentication

Only authorized admin users should access:

`/admin/*`

---

# 3. Firebase Collections

Recommended Firestore structure:

```text
users/
projects/
contactMessages/
settings/
```

---

# 4. Users Collection

Path:

`users/{uid}`

Example:

```js
{
  uid: "firebase-user-id",
  name: "Mehul Gondaliya",
  email: "admin@example.com",
  role: "admin",
  status: "active",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

Possible roles:

```text
admin
```

For the portfolio, only admin users should be able to manage projects and messages.

---

# 5. Projects Collection

Path:

`projects/{projectId}`

Example:

```js
{
  title: "MJ Trade Solution",
  slug: "mj-trade-solution",

  shortDescription:
    "Trading and market analysis platform.",

  description:
    "Detailed project description...",

  imageUrl:
    "https://...",

  imagePath:
    "projects/project-id/image.webp",

  liveUrl:
    "https://example.com",

  githubUrl:
    "https://github.com/example/project",

  technologies: [
    "Next.js",
    "Node.js",
    "MongoDB",
    "Redis"
  ],

  featured: true,

  status: "published",

  order: 1,

  createdAt: Timestamp,

  updatedAt: Timestamp
}
```

---

# 6. Project Status

Use:

```text
draft
published
archived
```

Only:

```text
published
```

projects should appear on the public portfolio.

---

# 7. Project CRUD

Admin must be able to:

### Create

Create a new Firestore project document.

### Read

Read projects for:
- Admin dashboard
- Public portfolio

### Update

Update:
- Title
- Slug
- Description
- Image
- Live URL
- GitHub URL
- Technologies
- Featured
- Status
- Order

### Delete

Delete the Firestore document.

When deleting a project, also delete its associated Firebase Storage image when applicable.

---

# 8. Project Image Storage

Firebase Storage structure:

```text
projects/
  {projectId}/
    image.webp
```

Recommended upload process:

1. Admin selects image.
2. Validate file type.
3. Validate file size.
4. Upload to Firebase Storage.
5. Get download URL.
6. Save URL + storage path in Firestore.
7. If replacing an image, delete the old Storage file when safe.

Recommended image types:

```text
webp
jpg
jpeg
png
```

Prefer WebP for portfolio project screenshots.

---

# 9. Contact Messages Collection

Path:

`contactMessages/{messageId}`

Example:

```js
{
  name: "John Doe",
  email: "john@example.com",
  subject: "Website Development",
  message: "I would like to discuss a project.",

  status: "new",

  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

Possible status values:

```text
new
read
replied
archived
```

---

# 10. Contact Form Flow

Public user:

```text
Portfolio
   ↓
Contact Form
   ↓
Client Validation
   ↓
Firestore
   ↓
contactMessages
   ↓
Success Message
```

Admin:

```text
Admin Login
   ↓
Admin Dashboard
   ↓
Messages
   ↓
View Message
   ↓
Update Status
```

---

# 11. Contact Form Security

The public contact form needs controlled write access.

Do not allow public users to:

- Read messages
- Update messages
- Delete messages

Public users should only be able to create a valid contact message.

Admin users can:
- Read
- Update
- Delete

Use Firestore Security Rules to enforce this.

---

# 12. Admin Authentication Flow

```text
/admin/login
      ↓
Firebase Auth
      ↓
User authenticated
      ↓
Read users/{uid}
      ↓
Check role === "admin"
      ↓
Allow Admin Dashboard
```

If role is not admin:

```text
Access denied
```

Do not rely only on hiding admin UI.

Authorization must also be enforced by Firebase Security Rules.

---

# 13. Admin Login

Recommended flow:

1. Enter email.
2. Enter password.
3. Firebase `signInWithEmailAndPassword()`.
4. Get authenticated user.
5. Check admin profile/role.
6. Redirect to `/admin`.

On logout:

```js
signOut(auth)
```

Then redirect to:

`/admin/login`

---

# 14. Route Protection

Protect:

```text
/admin
/admin/projects
/admin/projects/create
/admin/projects/[id]/edit
/admin/messages
```

Public routes:

```text
/
/projects/[slug]
```

For the client-side admin dashboard, Firebase Auth state can control access.

For sensitive server-side operations, use secure server-side verification or Firebase Admin SDK in a trusted server environment.

---

# 15. Firestore Security Rules Concept

The rules should follow this model:

```text
projects:
  public -> read published projects
  admin -> full CRUD

contactMessages:
  public -> create only
  public -> no read/update/delete
  admin -> full access

users:
  user -> read own profile
  admin -> controlled access
```

Never use:

```text
allow read, write: if true;
```

for production.

---

# 16. Firebase Environment Variables

Use `.env.local`.

Example:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

These client Firebase configuration values are not treated as secrets by Firebase itself, but Firestore/Storage/Auth rules must provide the real security.

If Firebase Admin SDK is later added, keep Admin credentials server-only.

Never expose:

```text
FIREBASE_PRIVATE_KEY
FIREBASE_CLIENT_EMAIL
```

to the client.

---

# 17. Firebase Client Structure

Recommended:

```text
src/lib/firebase/
├── config.js
├── auth.js
├── firestore.js
└── storage.js
```

### config.js

Initialize Firebase application.

### auth.js

Handle:
- Login
- Logout
- Auth state

### firestore.js

Handle:
- Projects
- Contact messages
- User profiles

### storage.js

Handle:
- Project image upload
- Project image delete
- Project image URL

---

# 18. Service Layer

Keep Firebase operations out of UI components.

Recommended:

```text
src/services/
├── projectService.js
├── contactService.js
├── userService.js
└── storageService.js
```

Example:

```js
createProject()
getProjects()
getPublishedProjects()
getProjectBySlug()
updateProject()
deleteProject()
```

Contact:

```js
createContactMessage()
getContactMessages()
updateContactStatus()
deleteContactMessage()
```

---

# 19. Public Project Query

The public homepage should query only:

```text
status == "published"
```

Recommended ordering:

```text
order ASC
```

or:

```text
createdAt DESC
```

depending on the portfolio design.

For featured projects:

```text
featured == true
```

can be used.

---

# 20. Project Slug

Each project should have a unique slug.

Example:

```text
mj-trade-solution
portfolio-website
school-management-system
ecommerce-platform
```

Public route:

```text
/projects/mj-trade-solution
```

The slug should be validated to avoid duplicate URLs.

---

# 21. Contact Spam Protection

The initial version should include:

- Client validation
- Server/security validation where applicable
- Firestore rules
- Reasonable message length limits
- Rate limiting strategy if traffic grows

For a public production portfolio, consider adding:
- App Check
- Cloud Functions
- CAPTCHA/Turnstile
- IP/email rate limiting through a trusted backend service

Do not depend only on client-side validation.

---

# 22. Firebase App Check

Consider enabling Firebase App Check for production.

Purpose:

Help ensure that requests to Firebase services originate from the legitimate application.

Use it after the basic Firebase setup is working.

---

# 23. Contact Email Notification

Optional future feature.

When a new contact message arrives:

```text
Contact Form
   ↓
Firestore
   ↓
Cloud Function / Email Service
   ↓
Mehul receives notification email
```

Do not send email directly from browser using private SMTP credentials.

Possible future implementation:

- Firebase Cloud Functions
- Resend
- SendGrid
- Another transactional email provider

---

# 24. Admin Dashboard Statistics

Calculate:

```text
Total Projects
Published Projects
Featured Projects
New Messages
```

Example:

```js
{
  totalProjects: 12,
  publishedProjects: 10,
  featuredProjects: 4,
  newMessages: 7
}
```

For a small portfolio, Firestore queries are sufficient.

Avoid unnecessary real-time listeners everywhere.

---

# 25. Timestamp Rules

Use Firestore server timestamps:

```js
serverTimestamp()
```

For:

```text
createdAt
updatedAt
```

Do not trust a client-provided timestamp for important ordering/auditing.

Display dates in the user's desired local format on the frontend.

---

# 26. Error Handling

Firebase operations should return predictable errors.

Frontend should show:

```text
Loading...
Success
Error
Empty State
```

Do not expose raw Firebase internal errors to normal visitors.

Example:

Instead of:

```text
FirebaseError: Missing or insufficient permissions
```

show:

```text
Unable to submit your message. Please try again.
```

Log useful technical details only in an appropriate development/server logging system.

---

# 27. Data Validation

Project validation:

```text
title -> required
slug -> required + unique
description -> required
image -> required for published projects
technologies -> array
liveUrl -> valid URL when provided
githubUrl -> valid URL when provided
status -> allowed enum
order -> number
featured -> boolean
```

Contact validation:

```text
name -> required
email -> required + valid email
subject -> required
message -> required
```

---

# 28. Recommended Backend Folder Structure

```text
src/
├── lib/
│   └── firebase/
│       ├── config.js
│       ├── auth.js
│       ├── firestore.js
│       └── storage.js
│
├── services/
│   ├── projectService.js
│   ├── contactService.js
│   ├── userService.js
│   └── storageService.js
│
├── hooks/
│   └── useAuth.js
│
└── middleware.js
```

If Firebase Admin SDK/server verification is added later:

```text
src/lib/firebase/
├── client.js
└── admin.js
```

`admin.js` must only run on the server.

---

# 29. Recommended Development Order

## Phase 1

Create Firebase project.

Enable:
- Authentication
- Firestore
- Storage

## Phase 2

Build Firebase client configuration.

## Phase 3

Create admin authentication.

## Phase 4

Create project CRUD.

## Phase 5

Create Firebase Storage image upload.

## Phase 6

Connect public portfolio to Firestore.

## Phase 7

Create contact form.

## Phase 8

Create admin messages page.

## Phase 9

Apply Firestore Security Rules.

## Phase 10

Add production security:
- App Check
- Rate limiting
- Error monitoring
- Backup strategy

---

# 30. Important Security Rules

Never:

- Put Admin SDK private keys in client code.
- Allow everyone to read contact messages.
- Allow everyone to update projects.
- Trust `role: "admin"` from the browser.
- Use unrestricted Firestore rules.
- Store image binary data in Firestore.
- Put private API keys in `NEXT_PUBLIC_*` variables.

The admin role must be verified through trusted Firebase data/rules.

---

# 31. Final Backend Architecture

```text
                  ┌──────────────────────┐
                  │   Next.js Portfolio  │
                  └──────────┬───────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
        Firebase Auth    Firestore       Storage
              │              │              │
              │              │              │
              ▼              ▼              ▼
          Admin User       Projects      Project Images
                             │
                             ▼
                       Contact Messages
```

This architecture keeps the first version simple while allowing the portfolio to scale later.

---

# 32. Final Requirement

The portfolio must be **content-driven**, not hardcoded.

The developer should be able to log into:

`/admin`

and manage portfolio projects without changing source code.

Changing a project in the admin dashboard should update the public portfolio data from Firebase.

The same architecture should allow future additions such as:
- Blog
- Testimonials
- Services management
- Resume management
- Contact email notifications
- Analytics dashboard
- Multiple admin users
