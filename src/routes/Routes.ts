import express, { Router } from 'express';
import { ArticleController } from '../controller/ArticleController';
import { AuthController } from '../controller/AuthController';

export const Routes: Router = express.Router();

// ARTICLE ROUTE
Routes.get('/', ArticleController.viewArticle)
Routes.get('/:id', ArticleController.getArticleById)
Routes.post('/', ArticleController.createArticle)
Routes.patch('/:id', ArticleController.updateArticle)
Routes.delete('/:id', ArticleController.deleteArticle)

// AUTH ROUTE
Routes.post('/login', AuthController.authLogin)
Routes.post('/user', AuthController.authUserById)
Routes.post('/register', AuthController.authRegister)