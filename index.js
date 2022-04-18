const fs = require('fs');
const root = require('app-root-path');

module.exports = class Routes {
    constructor(router, config) {
        this.router = router;
        this.routes = fs.readdirSync(`${root}/routes`).filter(file => file.endsWith('.js'));
        this.methods = ['get', 'delete', 'patch', 'post', 'put']

        this.defaults = {
            api: false,
            protection: false,
            urls: ['/.env'],
            redirect: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }

        this.config = Object.assign({}, this.defaults, config)
    };

    setup() {
        console.time('Loaded routes in')
        let routes = [];

        this.routes.forEach(commandFile => {
            const imported = require(`${root}/routes/${commandFile}`)

            if (!imported.enabled) {
                console.log(`Skipping ${commandFile} - Disabled`)
                return;
            }

            if (imported.name === null) {
                console.log(`Skipping ${commandFile} - Missing name`)
                return;
            }

            imported.routes.forEach(route => {
                let formattedMethod = route.method.toLowerCase()

                if (!route.name) {
                    console.log(`Skipping ${imported.name} - Missing route name`)
                    return
                }

                if (!route.fn) {
                    console.log(`Skipping ${imported.name} - Missing route function`)
                    return
                }

                if (!this.methods.includes(formattedMethod)) {
                    console.log(`Skipping ${route.name} - Invalid HTTP Method`)
                    return;
                }

                // Check for duplicate route names.

                if (route.middleware) {
                    routes.push(this.router[formattedMethod](`${imported.path}/${route.name}`, route.middleware, route.fn))
                } else {
                    routes.push(this.router[formattedMethod](`${imported.path}/${route.name}`, route.fn))
                }


            })
        });

        this.router.get('/api/routes', (req, res, next) => {
            if (this.config.api) {
                let routes = this.list()

                return res.json({
                    routes: routes
                })
            }

            next()
        });

        if (this.config.protection) {
            let _ = this

            this.router.use(function (req, res, next) {
                if (_.config.urls.includes(req.originalUrl)) {
                    return res.redirect(_.config.redirect)
                }

                return next()
            })
        }

        this.router.use(function (req, res, next) {
            if (!req.route) {
                return next({
                    message: `${req.originalUrl} does not exist. See /api/routes for endpoints.`
                });
            }
            next();
        });

        console.timeEnd('Loaded routes in')
        return routes;
    }

    list() {
        let routes = []

        this.routes.forEach(commandFile => {
            const imported = require(`../routes/${commandFile}`)


            if (imported.name && imported.enabled) {
                imported.routes.forEach(route => {
                    routes.push(
                        {
                            method: route.method, name: route.name, path: `${imported.path}/${imported.name}`, function: route.fn, docs: route.docs
                        })
                })
            }
        });

        return routes
    }
}