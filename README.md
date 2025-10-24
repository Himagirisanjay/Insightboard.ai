# InsightBoard AI — Level 1

## Overview
InsightBoard AI extracts action items from meeting transcripts and provides a dashboard to track and visualize progress.

## Tech stack
- Frontend: Next.js (App Router) + TypeScript + Tailwind (optional)
- Charts: Recharts
- LLM: OpenAI (`gpt-4o-mini`)
- Hosting: Vercel

## Features (Level 1)
- Transcript submission
- AI-powered action item generation (server-side via OpenAI)
- Task list with complete/delete
- Progress pie chart (completed vs pending)
- Hosted on Vercel (public URL required)

## Local setup
1. `git clone <repo>`
2. `cd repo`
3. `npm install`
4. Create `.env.local`:
