const routes = require('./routes')
const next = require('next')
const app = next({dev: process.env.NODE_ENV !== 'production'})

const handler = routes.getRequestHandler(app, ({req, res, route, query}) => {
    app.render(req, res, route.page, query)
  })

// Without express
const {createServer} = require('http')
app.prepare().then(() => {
  createServer(handler).listen(3000)
  console.log('Ready on localhost:3000');
})