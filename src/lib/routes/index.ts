


module.exports = function (fastify:any, opts:any, done:Function) {
    fastify.register(require("./users"), {prefix: "/users"})
    done()
}