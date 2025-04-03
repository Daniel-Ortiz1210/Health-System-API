import { Router } from "express";
import AppointmentsController from "../controllers/appointments.controller";
import { app } from "../app";

export const appointmentsRouter = Router();

appointmentsRouter.get('/', AppointmentsController.getAll);
appointmentsRouter.get('/:id', AppointmentsController.getById);
appointmentsRouter.post('/', AppointmentsController.create);
appointmentsRouter.put('/:id', AppointmentsController.update);
appointmentsRouter.delete('/:id', AppointmentsController.delete);
