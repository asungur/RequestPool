# Request Pool

![requestpool](https://user-images.githubusercontent.com/14999320/155365008-2abeb6d2-7772-4545-965a-8b705ea7e880.gif)

RequestBin like application. Users can create ephemeral bins that collect requests for 48 hours.
This repository is developed for deploying to a VPS server.

## Development
- Clone this repository.
- Create `.env` folder for DB connection inside `server` folder.
- Run `npm install` from `client` and `server` folders.
- Run `npm run dev` from `server` folder.

## Deployment (VPS)
- Clone this repository.
- Run `npm install` from `client` and `server` folders.
- Create `.env` files inside `server` and `db_cleaner`.
- Build(`npm run build`) `client` react app and move `build` folder to `server` folder.
- Run the application as a background process using `pm2`
- Run the go worker for database clean up as a `systemd` service.
- (Optional) Configure firewall to allow connections from a single port only
- (Optional) Create an Nginx file inside `/etc/nginx/sites-available/` with your domain

## Future work
- Add front-end test
- Configure eslint
- Experiment with WebSockets

## ERD

![image](https://user-images.githubusercontent.com/14999320/152019964-28a79517-bcc6-488c-9a61-aecd6f9a13c0.png)

(`Bins` is a Postgres Table and `Requests` is a Mongo collection. Relationships in this diagram describe logical relationships only)

## Architecture

![image](https://user-images.githubusercontent.com/14999320/155361286-78e9ae0c-5a29-4a3f-bc55-8314f409f0dc.png)

The application is deployed to a DigitalOcean Droplet. It requires additional configuration steps which are described in "Deployment".
The diagram shows a deployed application running from a VPS.

