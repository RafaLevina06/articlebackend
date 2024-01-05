import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function seed(){

    const users = await prisma.user.createMany({
      data: [
        {
          name:'user1',
          email:'user1@gmail.com',
          password:'user1',
          description:'this is user 1',
        },
        {
          name:'user2',
          email:'user2@gmail.com',
          password:'user2',
          description:'this is user 2',
        }
      ]
    })

    const articles = await prisma.article.createMany({
      data: [
        {
          userId:1,
          name:'this is article 1',
          content:'this is content of article 1'
        },
        {
          userId:2,
          name:'this is article 2',
          content:'this is content of article 2'
        }
      ]
    })
    
    console.log({
        users,
        articles
    })
}

seed()
.then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
})