# Express Route Manager

Dynamically load route files from the ``./routes`` directory into your Express app.  

This package also adds an Error handler for non-existent routes.

## Usage

**app.js**
```
const routes = new Routes(router, { api: true })
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
```

## Route
```
name - Name of the route, appends to the end of the global path, i.e /api/users.
method - HTTP method.
fn - Function to execute when the endpoint is hit.
docs - Endpoint documentation link.
```

## Options

Toggles /api/routes which returns all routes and link to documentation.
```
api: true
```