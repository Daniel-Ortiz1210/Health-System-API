import { Request, Response } from "express";
import PatientRepository from "../database/repository/patients";

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: API for managing patients
 */
class PatientsController {
    /**
     * @swagger
     * /patients:
     *   get:
     *     summary: Retrieve all patients
     *     tags: [Patients]
     *     responses:
     *       200:
     *         description: A list of patients.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Patient'
     */
    async getAll(req: Request, res: Response): Promise<void> {
        const patients = await PatientRepository.getAll();
        res.json(patients);
    }

    /**
     * @swagger
     * /patients/{id}:
     *   get:
     *     summary: Get a patient by ID
     *     tags: [Patients]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The patient ID
     *     responses:
     *       200:
     *         description: Patient details
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Patient'
     *       404:
     *         description: Patient not found
     */
    async getById(req: Request, res: Response): Promise<void> {
        const patient = await PatientRepository.getById(req.params.id);
        if (!patient) {
            res.status(404).json({ message: "Patient not found" });
        } else {
            res.json(patient);
        }
    }

    /**
     * @swagger
     * /patients:
     *   post:
     *     summary: Create a new patient
     *     tags: [Patients]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Patient'
     *     responses:
     *       201:
     *         description: Patient created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Patient'
     */
    async create(req: Request, res: Response): Promise<void> {
        const newPatient = await PatientRepository.create(req.body);
        res.status(201).json(newPatient);
    }

    /**
     * @swagger
     * /patients/{id}:
     *   put:
     *     summary: Update a patient by ID
     *     tags: [Patients]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The patient ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Patient'
     *     responses:
     *       200:
     *         description: Patient updated successfully
     *       404:
     *         description: Patient not found
     */
    async update(req: Request, res: Response): Promise<void> {
        const updatedPatient = await PatientRepository.update(req.params.id, req.body);
        if (!updatedPatient) {
            res.status(404).json({ message: "Patient not found" });
        } else {
            res.json(updatedPatient);
        }
    }

    /**
     * @swagger
     * /patients/{id}:
     *   delete:
     *     summary: Delete a patient by ID
     *     tags: [Patients]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The patient ID
     *     responses:
     *       200:
     *         description: Patient deleted successfully
     *       404:
     *         description: Patient not found
     */
    async delete(req: Request, res: Response): Promise<void> {
        const success = await PatientRepository.delete(req.params.id);
        if (!success) {
            res.status(404).json({ message: "Patient not found" });
        } else {
            res.json({ message: "Patient deleted successfully" });
        }
    }
}

export default new PatientsController();
