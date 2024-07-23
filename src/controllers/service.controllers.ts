import { Request, Response } from "express";
import Service from "../models/service.models";

class ServiceController {
  public async createService(req: Request, res: Response) {
    try {
      const service = await Service.create({
        ...req.body,
        categoryId: req.params.categoryId,
      });
      res.status(201).json(service);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async getServices(req: Request, res: Response) {
    try {
      const services = await Service.findAll({
        where: { categoryId: req.params.categoryId },
      });
      res.json(services);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async updateService(req: Request, res: Response) {
    try {
      const service = await Service.findByPk(req.params.serviceId);
      if (service) {
        await service.update(req.body);
        res.json(service);
      } else {
        res.status(404).send('Service not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async deleteService(req: Request, res: Response) {
    try {
      const service = await Service.findByPk(req.params.serviceId);
      if (service) {
        await service.destroy();
        res.status(204).send();
      } else {
        res.status(404).send('Service not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new ServiceController();
