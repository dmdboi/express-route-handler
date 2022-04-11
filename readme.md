# Express Route Manager

Dynamically load route files from the ``./routes`` directory into your Express app.  

This package also adds an Error handler for non-existent routes.

## Usage

**app.js**
```
const router = express.Router();
const Routes = require('./utils/routes');

const routes = new Routes(router, { 
  api: true,
  protection: true
})

app.use(routes.get())
```

**routes/index.js**
```
const controller = require('../controllers/users)

const index = {
  name: "index",
  path: "/api",
  enabled: true,
  routes: [
    {
      name: 'users', 
      method: 'get', 
      fn: controller.users,
      docs: "https://google.com/"
    }
  ]
}

module.exports = index;
```

## Route
| *Key* | *Desc* | *Required*  
| --------------- | --------------- | --------------- |
| `name`       | Name of the route, appends to the end of the global path, i.e /api/users.  | Yes 
| `method`     | HTTP method.                                                               | Yes 
| `fn`         | Function to execute when the endpoint is hit.                              | Yes 
| `docs`       | Endpoint documentation link.                                               | No

## Options

| *Option* | *Desc* | *Default*  
| --------------- | --------------- | --------------- |
| `api: true`       | Toggles /api/routes which returns all routes and link to documentation. | ``false``  
| `protection: true`| Redirects all requests from *urls* Array to *redirect* option.          | ``false``  
| `urls: ['/.env']` | Array of URLS to redirect requests away from                            | ``[./env]``  
| `redirect: "/"`   | URL to redirect requests to                                             | [link](https://www.youtube.com/watch?v=dQw4w9WgXcQ)  