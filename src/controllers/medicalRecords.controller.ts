import { Request, Response } from "express";
import MedicalRecordsRepository from "../database/repository/medicalRecords";

/**
 * @swagger
 * tags:
 *   name: MedicalRecords
 *   description: API for managing medical records of patients
 */
class MedicalRecordsController {
    /**
     * @swagger
     * /medical-records:
     *   get:
     *     summary: Retrieve all medical records
     *     tags: [MedicalRecords]
     *     responses:
     *       200:
     *         description: A list of medical records.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/MedicalRecord'
     */

    async getAll(req: Request, res: Response): Promise<void> {
        const records = await MedicalRecordsRepository.getAll();
        res.json(records);
    }

    /**
     * @swagger
     * /medical-records/{id}:
     *   get:
     *     summary: Get a medical record by ID
     *     tags: [MedicalRecords]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The medical record ID
     *     responses:
     *       200:
     *         description: Medical record details
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/MedicalRecord'
     *       404:
     *         description: Medical record not found
     */
    async getById(req: Request, res: Response): Promise<void> {
        try {
            const record = await MedicalRecordsRepository.getById(req.params.id);
            if (!record) {
                res.status(404).json({ message: "Medical record not found" });
            } else {
                res.json(record);
            }
        } catch (error) {
            res.status(400).json({ message: "Invalid ObjectId format" });
        }
    }


    async getByPatientId(req: Request, res: Response): Promise<void> {
        try {
            const records = await MedicalRecordsRepository.getByPatientId(req.params.patientId);
            res.json(records);
        } catch (error) {
            res.status(400).json({ message: "Invalid ObjectId format" });
        }
    }


    /**
     * @swagger
     * /medical-records:
     *   post:
     *     summary: Create a new medical record
     *     tags: [MedicalRecords]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/MedicalRecord'
     *     responses:
     *       201:
     *         description: Medical record created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/MedicalRecord'
     */
    async create(req: Request, res: Response): Promise<void> {
        const newRecord = await MedicalRecordsRepository.create(req.body);
        res.status(201).json(newRecord);
    }

    /**
     * @swagger
     * /medical-records/{id}:
     *   put:
     *     summary: Update a medical record by ID
     *     tags: [MedicalRecords]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The medical record ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/MedicalRecord'
     *     responses:
     *       200:
     *         description: Medical record updated successfully
     *       404:
     *         description: Medical record not found
     */
    async update(req: Request, res: Response): Promise<void> {
        const updatedRecord = await MedicalRecordsRepository.update(req.params.id, req.body);
        if (!updatedRecord) {
            res.status(404).json({ message: "Medical record not found" });
        }

        res.json(updatedRecord);
    }

    /**
     * @swagger
     * /medical-records/{id}:
     *   delete:
     *     summary: Delete a medical record by ID
     *     tags: [MedicalRecords]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The medical record ID
     *     responses:
     *       200:
     *         description: Medical record deleted successfully
     *       404:
     *         description: Medical record not found
     */
    async delete(req: Request, res: Response): Promise<void> {
        const success = await MedicalRecordsRepository.delete(req.params.id);
        if (!success) {
            res.status(404).json({ message: "Medical record not found" });
        } else {
            res.json({ message: "Medical record deleted successfully" });
        }    
    }
}

export default new MedicalRecordsController();
