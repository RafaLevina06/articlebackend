import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient()
export class AuthController {

    static async authLogin(req:Request, res:Response) {
        const { email, password } = req.body
        try {
            const find = await prisma.user.findFirst({
                where: {
                    email,
                    password
                }
            })
            if(find !== null) res.status(200).json(find)
            else res.status(401).json(null)
        } catch {
            res.status(500).json(null)
        }
    }

    static async authUserById(req:Request, res:Response) {
      const { id } = req.body
      const currId = parseInt(id)
      try {
          const find = await prisma.user.findUnique({
            where: {
                id:currId
            }
          })
          if(find !== null) res.status(200).json(find)
          else res.status(401).json(null)
      } catch {
          res.status(500).json(null)
      }
  }

    static async authRegister(req: Request, res: Response) {
        const { name, description, email, password } = req.body
    
        if (!name || !description || !email || !password) return res.status(400).json(null)
    
        try {
          const newUser = await prisma.user.create({
            data: {
              name,
              description,
              email,
              password,
            },
          })
    
          res.status(201).json(newUser)
        } catch (error) {
          console.error(error)
          res.status(500).json(null)
        }
    }
}
