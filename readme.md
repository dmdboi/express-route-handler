# Express Route Manager

Dynamically load route files from the ``./routes`` directory into your Express app.  

## Usage

app.js
```
const routes = new Routes(router, { api: true })
app.use(routes.get())
```

routes/index.js
```
const index = {
  name: "index",
  path: "/api",
  enabled: true,
  routes: [
    {
      name: 'users', 
      method: 'get', 
      fn: wrapper(indexController.home), 
      docs: "https://google.com/"
    }
  ]
}
```

## Options

// Toggles /api/routes which returns all routes and link to documentation.
```
api: true
```