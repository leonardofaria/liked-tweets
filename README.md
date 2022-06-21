# Liked Tweets

This is an application that shows you liked tweets outside Twitter or Tweetbot.

## Workflow

Pipedream -> Supabase -> Liked Tweets app

In Pipedream I monitor new liked tweets and send them to Supabase. The idea is persisting the data so I can easily render in the Next.js and in the future play with different ways to show data.

The Supabase + Next.js app is based on Lee Robinson's post "[Building an Image Gallery with Next.js, Supabase, and Tailwind CSS](https://leerob.io/blog/image-gallery-supabase-tailwind-nextjs)". From Robinson's I also got the Tweet component.

## Build With

- Pipedream
- Next.js
- Tailwind CSS
- Supabase
- Vercel

## Todo

- [X] Pagination
- [] Take care of all `// TODO`
- [] Search
- [] Gallery