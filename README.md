# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/0ec88094-775e-4f05-b2ce-461a5a0de510

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/0ec88094-775e-4f05-b2ce-461a5a0de510) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### Option 1: Deploy with Lovable
Simply open [Lovable](https://lovable.dev/projects/0ec88094-775e-4f05-b2ce-461a5a0de510) and click on Share -> Publish.

### Option 2: Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Set up environment variables in Vercel dashboard:
   - `VITE_CLERK_PUBLISHABLE_KEY`
3. Deploy: `vercel --prod`

Alternatively, connect your GitHub repository to Vercel for automatic deployments.

### Option 3: Deploy to Netlify

1. Install Netlify CLI: `npm i -g netlify-cli`
2. Build the project: `npm run build`
3. Deploy: `netlify deploy --prod --dir=dist`
4. Set environment variables in Netlify dashboard:
   - `VITE_CLERK_PUBLISHABLE_KEY`

Alternatively, connect your GitHub repository to Netlify for automatic deployments.

### Environment Variables Setup

Before deploying, ensure you have:
1. Copied `.env.example` to `.env`
2. Added your Clerk API keys from [Clerk Dashboard](https://dashboard.clerk.com)
3. Configured the same environment variables in your deployment platform

**Important:** Never commit `.env` files to version control. The `.env` file is already in `.gitignore`.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Production Checklist

Before deploying to production:
- [ ] Environment variables are configured in your deployment platform
- [ ] `.env` is in `.gitignore` (already configured)
- [ ] Build succeeds locally: `npm run build`
- [ ] No linting errors: `npm run lint`
- [ ] Clerk authentication is properly configured
- [ ] All routes are tested and working
