import { Router } from "express";
import MedicalRecordsController from "../controllers/medicalRecords.controller";

export const medicalRecordsRouter = Router();

medicalRecordsRouter.get('/', MedicalRecordsController.getAll);
medicalRecordsRouter.get('/:id', MedicalRecordsController.getById);
medicalRecordsRouter.get('/patients/:patiendId', MedicalRecordsController.getByPatientId);
medicalRecordsRouter.post('/', MedicalRecordsController.create);
medicalRecordsRouter.put('/:id', MedicalRecordsController.update);
medicalRecordsRouter.delete('/:id', MedicalRecordsController.delete);
