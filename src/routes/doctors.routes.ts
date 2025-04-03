import { Router } from "express";
import DoctorsController from '../controllers/doctors.controller'; 

export const doctorsRouter = Router();

doctorsRouter.get('/', DoctorsController.getAllDoctors);
doctorsRouter.get('/:id', DoctorsController.getDoctorById);
doctorsRouter.post('/', DoctorsController.createDoctor);
doctorsRouter.put('/:id', DoctorsController.updateDoctor);
doctorsRouter.delete('/:id', DoctorsController.deleteDoctor);
