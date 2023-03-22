## REST API for a portfolio publication site

1. All users are able to:
    * signup
    * see image feed (image, image description, portfolio name that contains this image) ordered by creation time
2. Registered user should be able to:
    * login, logout
    * create portfolios
    * have several portfolios
    * upload image in his portfolios
    * delete own profile
    * delete own portfolios
    * delete own images
3. Portfolio:
    * Should contain name, description, images
4. Image:
    * Should contain name, description, comments
5. Key requirements:
    * Should be implemented Error Handler with next statuses 400,
      401, 403 and 404
    * Should be implemented request validation
    * Project should contains db migration files

### Start app

```bash
# install dependencies
$ npm install
   ```

```bash
# create db container
$ docker compose up -d

# or start existing 
$ docker start portfolio-backend-postgres-1

   ```

```bash
# normal mode
$ npm run start

# or watch mode
$ npm run start:dev
   ```

## Open swagger

Open in your browser [http://localhost:3000/portfolio/api](http://localhost:3000/portfolio/api)

### Migrations

```bash
$ npm run migration:new
   ```

```bash
$ npm run migration:run
   ```

```bash
$ npm run migration:revert
   ```