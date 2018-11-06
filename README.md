# Large
### Vue + Express + Sqlite mock blogging platform example project

The name is a joke about another well-known blogging platform. Basically, I wanted to tinker around with the JSON-based editor called [tiptap](https://tiptap.scrumpy.io/).

## Getting started

1. Clone this repo
1. You'll need two shell windows to run the project, and you'll need `node` (v8+), `yarn`, and `npm` installed globally
1. In the first shell `cd <project root>/client && yarn install && yarn start`
1. In the second shell `cd <project root>/server && npm install && npm start`
1. Navigate to `localhost:8082` in your browser
1. Register a user
1. Create a post

## What this project does

1. Allows you to register, create a user (as a joke, it rejects any non-gmail accounts)
1. Create a post
1. Save a post
1. Delete posts
1. Read-only list view of HTML preview of posts from JSON doc representation stored in sqlite db
1. View posts from all users
1. View posts created by the current user
1. Uses vuex to store user & token
1. Login state persists

## What I want to make it do

1. Fix a handful of janky styling issues in the editor views
1. Get passport or similar middleware in there and prevent users from deleting each other's posts, though the communal sharing of all posts is also pretty amusing
1. Errors and error codes by the server are not properly organized and represented by error classes with custom messages / correct status codes as they should be
1. Stretch goal was to send an HTML representation to a 3rd party platform via a `Publish External` type button (probably WP via the WP API plugin), didn't get to that yet

