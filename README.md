# Chitter

This is a simplified clone of Twitter, including authorisation, posting tweets, commenting and liking. The motivations for completing this project were as follows:

- to learn Typescript, which I had never used before
- to reinforce my React knowledge, and learn to use React with Typescript
- to produce a simple full stack project
- to use a PostgreSQL database with JavaScript
- to learn to use Circle CI in conjunction with Netlify for the front end

I specifically chose to implement this project as two separate repositories, one for the back end and one for the front end. These contain the project's code and can be found here:

- [front end](https://github.com/PhilipVigus/chitter-typescript-frontend)
- [back end](https://github.com/PhilipVigus/chitter-typescript-frontend)

## Technologies used

| Purpose | Technology |
|:--------|:-----------|
| Language | Typescript |
| Front end | React |
| Back end | Express |
| Database | PostgreSQL |
| Testing | Jest, React Testing Library (front end), Jest, Supertest (back end) |
| CI/CD | Circle CI, Netlify (front end), Heroku (back end) |

## Getting started

```bash
# clone the repositories to your local machine with either
# if you're using ssh
git clone git@github.com:PhilipVigus/chitter-typescript-backend.git
git clone git@github.com:PhilipVigus/chitter-typescript-frontend.git

# if you're using https
git clone git@github.com:PhilipVigus/chitter-typescript-backend.git
git clone git@github.com:PhilipVigus/chitter-typescript-frontend.git

# install project dependencies in each repository's root folder
yarn install
```

### Back end

You must have PostgreSQL installed on your machine in order to run the back end locally. You also need to create a .env in the project root with the following variables. All other database connection settings are assumed to be defaults:

```
DB_PASSWORD=<your_password>
DB_USERNAME=<your_username>
```

You need to create two databases on your local machine, chitter_test and chitter_dev. Once created you then need to run the SQL commands found in the db/migrations folder on each database to set up the database structure.

### Front end

You need to create a .env in the project root with the following variable:

```
REACT_APP_BACKEND_URL=http://localhost:5000
```

### Starting the app locally

Assuming everything is set up as specified above, you can start the app as follows:

```bash
# back end root folder
yarn dev:start

# front end root folder
yarn start
```

### Testing

```bash
# back or front end root folder
# interactive
yarn test

# coverage statistics
yarn testWithCoverage

```
