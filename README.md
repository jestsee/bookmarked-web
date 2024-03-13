This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## TODO

### Chore

- [x] Setup tRPC
- [x] Global error handler react query

### Authentication

- [x] Register API
- [x] Register form
- [x] Middleware (protect both server & client routes)
- [x] Sign up error alert
- [x] Authenticated user can't access sign up or sign in page

### Uncategorized

- [x] Integrate with notion (button)
- [x] Connect to notion status
- [x] Bookmark tweet to notion
- [x] Deploy to vercel
- [x] Google authentication provider
- [x] Validate tweet url (twitter keyword; regex)
- [x] Notion template to clone
- [ ] Move `/redirect` to `/redirect/access-token`
- [ ] Twitter authentication provider
- [ ] Handle condition when the user doesn't have any notion database
- [ ] Check if the notion database has every needed property
- [ ] Handle expired notion's access token; provide mechanism to reconnect to Notion

```
{
    "status": "failed",
    "type": "thread",
    "url": "https://twitter.com/warpdotdev/status/1767250494714466461",
    "message": "API token is invalid."
}
```

### Error handler

- [ ] user_email_unique: email already exist

### UI

- [ ] display integration status with notion `(connected/not-connected)`
- [x] rewrite the authentication page
