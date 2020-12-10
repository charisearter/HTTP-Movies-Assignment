# HTTP Movies
# -- Okay, 3rd time is a charm. It turns out that the errors that happened before are because the codebase changed, so my previous version - old code base (that worked on my MAC) won't work on my PC. So there are a few slight changes. Easy enough. Let's start.

## Instructions

- **Fork** this repository, then clone your fork.
[x]- Run `npm install` to download dependencies.
[x]- Run the server using `npm start`.
[x]- In a separate terminal cd into the `client` folder and run `npm install` to download dependencies.
# -- You don't have to do npm audit fix, but I do just in case. I don't go further than that.
[x]- Still inside the `client` folder run `npm start` to run the client application.
[x]- Make your own branch and push it up to git ( Need to make new terminal for this. )

### Part 1 - Updating A Movie:

- Add a route at the path `/update-movie/:id`
- Create a component with a form to update the chosen movie
- Add a button in the movie component that routes you to your new route with the movies's id as the URL param
- The form should make a PUT request to the server when submitted
- When the call comes back successfully, reset your form state and route the user to `/movies` where they will see the updated movie in the list

Movie object format:

```
{
  id: 5,
  title: 'Tombstone',
  director: 'George P. Cosmatos',
  metascore: 89,
  stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
}
```

### Part 2 - Deleting A Movie:

- Add a delete button in the movie component that makes a DELETE request
- When the call comes back successfully, route the user to `/movies` where they will see the updated movie list without the deleted movie

### Part 3 (Stretch) - Adding A Movie:

- Add a route at the path `/add-movie`
- Create a component with a form to add a new movie
- Each created movie should have the following format (notice the array of strings - this will test your JS skills, so work through it methodically)
- The form should make a POST request to the server when submitted
- When the call comes back successfully, reset your form state and route the user to `/movies`

Movie object format:

```
{
  id: 5,
  title: 'Tombstone',
  director: 'George P. Cosmatos',
  metascore: 89,
  stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
}
```

## Stretch Problem

- See Part 3 above (Adding movies with a POST request)
- Style the app!
