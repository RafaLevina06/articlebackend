import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export class ArticleController {
    static async viewArticle(req:Request, res:Response){
        try {
            const data = await prisma.article.findMany({
                include: {
                    User: true
                },
            })

            res.status(200).send(data)
        } catch (error) {
            console.error('Error retrieving article:', error)
            res.status(500).json({ message: 'Internal Server Error' })
        } 
    }

    static async getArticleById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            
            const Article = await prisma.article.findUnique({
                where: { id: parseInt(id) },
                include: {
                    User:true
                }
            });

            if (!Article) {
                return res.status(404).json({ message: 'article not found' });
            }

            res.status(200).json(Article);
        } catch (error) {
            console.error('Error retrieving article by ID:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    
    static async createArticle(req: Request, res: Response) {
        try {
            const { name, userId, content } = req.body
            const newData = await prisma.article.create({
                data: {
                    name,
                    content,
                    userId
                }, 
            })
            res.status(200).json(newData)
        } catch (error) {
            console.error('Error creating menu:', error)
            res.status(500).json(null)
        } 
    }

    static async updateArticle(req: Request, res: Response) {
        try {
            const { id } = req.params
            const existingArticle = await prisma.article.findUnique({
                where: { id: parseInt(id) },
            })
        
            if (!existingArticle) {
                return res.status(404).json({ message: 'article not found' })
            }
        
            const { name, userId, content } = req.body

            const updatedMenu = await prisma.article.update({
                where: { id: parseInt(id) },
                data: {
                    name,
                    content,
                    userId
                },
            })
        
            res.status(200).json({ message: 'article updated successfully', data: updatedMenu })
        } catch (error) {
            console.error('Error updating menu:', error)
            res.status(500).json({ message: 'Internal Server Error' })
        } 
    }

    static async deleteArticle(req: Request, res: Response) {
        try {
            const { id } = req.params
        
            const existingArticle = await prisma.article.findUnique({
                where: { id: parseInt(id) },
            });
        
            if (!existingArticle) {
                return res.status(404).json({ message: 'article not found' })
            }
        
            await prisma.article.delete({
                where: { id: parseInt(id) },
            });
        
            res.status(204).json(null)
        } catch (error) {
            console.error('Error deleting menu:', error);
            res.status(500).json(null)
        } 
    }
}