import { Request, Response } from "express";
import Category from "../models/category.models";


class CategoryController {
  public async createCategory(req: Request, res: Response) {
    try {
      const category = await Category.create(req.body);
      res.status(201).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async getCategories(req: Request, res: Response) {
    try {
      const categories = await Category.findAll();
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async updateCategory(req: Request, res: Response) {
    try {
      const category = await Category.findByPk(req.params.categoryId);
      if (category) {
        await category.update(req.body);
        res.json(category);
      } else {
        res.status(404).send('Category not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new CategoryController();
