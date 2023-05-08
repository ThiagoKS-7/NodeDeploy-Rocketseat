import fastify from "fastify"

const app = fastify()

app.get("/", async (request:any, reply:any) =>reply.redirect("/v1/users"))
app.register(require("./lib/routes"), { prefix: '/v1' }) // global route prefix


// Run the server!
const start = async () => {
    try {
        await app.listen({
            host: process.env.HOST || '0.0.0.0',
            port: process.env.PORT ? Number(process.env.PORT) : 3333,
        }).then(() => {
            console.log(`Server listening on http://${process.env.HOST || '0.0.0.0'}:${process.env.PORT ? Number(process.env.PORT) : 3333}`)
        })
    } catch (err) {
      app.log.error(err)
      process.exit(1)
    }
}
start()
