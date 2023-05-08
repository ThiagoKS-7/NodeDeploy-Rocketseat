
import { PrismaClient } from "@prisma/client"
import fastify from "fastify"
import { z } from "zod"

const prisma = new PrismaClient()
const app = fastify()

app.get("/users", async () =>{
    const users = await prisma.user.findMany()
    return {users}
})

app.post("/users", async (request, reply) =>{
    //schema validation  https://zod.dev/?id=basic-usage
    const createUserSchema = z.object({
        name: z.string(),
        email: z.string().email(),
    })
    try {
        const {name, email} = createUserSchema.parse(request.body)
        await prisma.user.create({data: {name, email}})
        return reply.status(201).send()
    } catch (err) {
        return createUserSchema.safeParseAsync(request.body)
    }
}) 

// Run the server!
const start = async () => {
    try {
        await app.listen({
            host: process.env.HOST,
            port: process.env.PORT ? Number(process.env.PORT) : 3333,
        }).then(() => {
            console.log(`Server listening on http://${process.env.HOST}:${process.env.PORT}`)
        })
    } catch (err) {
      app.log.error(err)
      process.exit(1)
    }
}
start()
