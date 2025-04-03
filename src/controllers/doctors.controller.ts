import { Request, Response } from "express";
import DoctorsRepository from "../database/repository/doctors";

class DoctorController {
    /**
     * @swagger
     * /doctors:
     *   get:
     *     summary: Retrieve a list of doctors
     *     tags: [Doctors]
     *     responses:
     *       200:
     *         description: List of doctors
     */
    async getAllDoctors(req: Request, res: Response): Promise<void> {
        try {
            const doctors = await DoctorsRepository.findAll();
            res.status(200).json(doctors);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving doctors" });
        }
    }

    /**
     * @swagger
     * /doctors/{id}:
     *   get:
     *     summary: Get a doctor by ID
     *     tags: [Doctors]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Doctor found
     *       404:
     *         description: Doctor not found
     */
    async getDoctorById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const doctor = await DoctorsRepository.getById(id);
            if (!doctor) {
                res.status(404).json({ message: "Doctor not found" });
            } else {
                res.status(200).json(doctor);
            }
        } catch (error) {
            res.status(500).json({ message: "Error retrieving doctor" });
        }
    }

    /**
     * @swagger
     * /doctors:
     *   post:
     *     summary: Create a new doctor
     *     tags: [Doctors]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *     responses:
     *       201:
     *         description: Doctor created
     */
    async createDoctor(req: Request, res: Response): Promise<void> {
        try {
            const newDoctor = await DoctorsRepository.create(req.body);
            res.status(201).json(newDoctor);
        } catch (error) {
            res.status(500).json({ message: "Error creating doctor" });
        }
    }

    /**
     * @swagger
     * /doctors/{id}:
     *   put:
     *     summary: Update a doctor
     *     tags: [Doctors]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *     responses:
     *       200:
     *         description: Doctor updated
     */
    async updateDoctor(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedDoctor = await DoctorsRepository.update(id, req.body);
            if (!updatedDoctor) {
                res.status(404).json({ message: "Doctor not found" });
            } else {
                res.status(200).json(updatedDoctor);
            }
        } catch (error) {
            res.status(500).json({ message: "Error updating doctor" });
        }
    }

    /**
     * @swagger
     * /doctors/{id}:
     *   delete:
     *     summary: Delete a doctor
     *     tags: [Doctors]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Doctor deleted successfully
     */
    async deleteDoctor(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deleted = await DoctorsRepository.delete(id);
            if (!deleted) {
                res.status(404).json({ message: "Doctor not found" });
            } else {
                res.status(200).json({ message: "Doctor deleted successfully" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error deleting doctor" });
        }
    }

    /**
     * @swagger
     * /doctors/{id}/availability:
     *   get:
     *     summary: Get doctor availability
     *     tags: [Doctors]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Doctor availability retrieved
     */
    async getDoctorAvailability(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const availability = "";
            if (!availability) {
                res.status(404).json({ message: "Doctor not found or no availability set" });
            } else {
                res.status(200).json(availability);
            }
        } catch (error) {
            res.status(500).json({ message: "Error retrieving doctor availability" });
        }
    }
}

export default new DoctorController();
