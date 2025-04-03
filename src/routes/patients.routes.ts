import { Router } from 'express';
import PatientsController from '../controllers/patients.controller';

export const patientsRouter = Router();

patientsRouter.get('/', PatientsController.getAll);
patientsRouter.post('/', PatientsController.create);
patientsRouter.get('/:id', PatientsController.getById);
patientsRouter.put('/:id', PatientsController.getById);
patientsRouter.delete('/:id', PatientsController.delete);
