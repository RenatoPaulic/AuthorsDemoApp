# Authors Demo Application

> Demo application for managing authors and their books.
> Application is created for educational purposes to represent coding skills.
> Intent was just to make a core system around which new code and functionalities could be built.

## Tech Stack

> Server - Node.js
> Client - React
> Database - MongoDB

## Usage

### Change configuration setting

Define variables in /config/config.json

- MONGO_URI - URI to MongoDB which will be used for application data.
- SESSION_SECRET - random string representing secret.
- CLIENT_URL_CORS - URL on which client will be hosted. (e.g. "http://localhost:3000")
- SERVER_PORT - server port. (e.g. 5000)

Define variables in client/src/config/config.json

- SERVER_URL - URL of the server, ports in configurations must match. (e.g. http://localhost:5000)

Default port React application is running is 3000 so CLIENT_URL_CORS need to have value configured on that port. If port 5000 is
used as server port, for local dev:

- client is running on http://localhost:3000
- server is running on http://localhost:5000

### Install server dependencies

```
npm install
```

### Install client dependencies

```
cd client
npm install
```

### Enable database

### Run application (both server and client)

```
npm run app
```

##### Run only server

```
npm run server
```

##### Run only client

```
npm run client
```

> On the first run of the application, default user will be created with admin role
>
> > email: admin.admin@default.com
> > password: admin123

- Version: 1.0.0
- License: MIT
