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
$ npm install
   ```

```bash
$ docker compose up -d
   ```

```bash
$ npm run start
   ```

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