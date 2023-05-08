import { PrismaClient } from "@prisma/client"
import { z } from "zod"
const prisma = new PrismaClient()


module.exports = function (fastify:any, opts:any, done:any) {
    
    fastify.get("/", async () =>{
        const users = await prisma.user.findMany()
        return {users}
    })

    fastify.post("/", async (request:any, reply:any) =>{
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

    done()
}