# Stitch & Style Finder

Create a prototype for the app's initial screen featuring the following elements:

A location selector allowing users to choose and change their location.

A search bar dedicated to finding seamstresses.

Replace the existing three tabs with two: "Costureiras" and "Atelies." Selecting either tab navigates to a respective page displaying related options below, such as profiles like "Dona Lucia" and "Tia Joana" under the "Costureiras" tab.

Above the search results, include filter capsules to refine the displayed profiles.

Ensure a clean, modern, and user-friendly design approach

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://stitch-find-app.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ebd20d35-2cb1-457f-8583-8988d3608b6c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Supabase

The Supabase client is available from `src/lib/supabase.ts`. Create a project in
[Supabase](https://supabase.com/), copy `.env.example` to `.env.local`, and set:

- `VITE_SUPABASE_URL`: the project's URL.
- `VITE_SUPABASE_ANON_KEY`: the project's public anon/publishable key.

Restart the dev server after changing environment variables. Call
`getSupabaseClient()` from application code when you are ready to query the
database; it reports a clear error if the environment variables are missing.
The client uses a public key, so enable Row Level Security and appropriate
policies on database tables. Never put a `service_role` key in a `VITE_*`
variable or in client-side code.
