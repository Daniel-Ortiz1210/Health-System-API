import { Request, Response } from "express";
import AppointmentsRepository from "../database/repository/appointments";

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: API for managing patient appointments
 */
class AppointmentsController {
    /**
     * @swagger
     * /appointments:
     *   get:
     *     summary: Retrieve all appointments
     *     tags: [Appointments]
     *     responses:
     *       200:
     *         description: A list of appointments.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Appointment'
     */
    async getAll(req: Request, res: Response): Promise<void> {
        const appointments = await AppointmentsRepository.getAll();
        res.json(appointments);
    }

    /**
     * Retrieves all appointments associated with a specific patient.
     */
        async getByPatientId(req: Request, res: Response): Promise<void> {
            try {
                const appointments = await AppointmentsRepository.getByPatientId(req.params.patientId);
                res.json(appointments);
            } catch (error) {
                res.status(400).json({ message: "Invalid ObjectId format" });
            }
        }

    /**
     * @swagger
     * /appointments/{id}:
     *   get:
     *     summary: Get an appointment by ID
     *     tags: [Appointments]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The appointment ID
     *     responses:
     *       200:
     *         description: Appointment details
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Appointment'
     *       404:
     *         description: Appointment not found
     */
    async getById(req: Request, res: Response): Promise<void> {
        try {
            const appointment = await AppointmentsRepository.getById(req.params.id);
            
            if (!appointment) {
                res.status(404).json({ message: "Appointment not found" });
            } else {
                res.json(appointment);
            }
        } catch (error) {
            res.status(400).json({ message: "Invalid ObjectId format" });
        }
    }

    /**
     * @swagger
     * /appointments:
     *   post:
     *     summary: Create a new appointment
     *     tags: [Appointments]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Appointment'
     *     responses:
     *       201:
     *         description: Appointment created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Appointment'
     */
    async create(req: Request, res: Response): Promise<void> {
        const newAppointment = await AppointmentsRepository.create(req.body);
        res.status(201).json(newAppointment);
    }

    /**
     * @swagger
     * /appointments/{id}:
     *   put:
     *     summary: Update an appointment by ID
     *     tags: [Appointments]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The appointment ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Appointment'
     *     responses:
     *       200:
     *         description: Appointment updated successfully
     *       404:
     *         description: Appointment not found
     */
    async update(req: Request, res: Response): Promise<void> {
        const updatedAppointment = await AppointmentsRepository.update(req.params.id, req.body);
        
        if (!updatedAppointment) {
            res.status(404).json({ message: "Appointment not found" });
        } else {
            res.json(updatedAppointment);
        }
    }

    /**
     * @swagger
     * /appointments/{id}:
     *   delete:
     *     summary: Delete an appointment by ID
     *     tags: [Appointments]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The appointment ID
     *     responses:
     *       200:
     *         description: Appointment deleted successfully
     *       404:
     *         description: Appointment not found
     */
    async delete(req: Request, res: Response): Promise<void> {
        const success = await AppointmentsRepository.delete(req.params.id);
        if (!success) {
            res.status(404).json({ message: "Appointment not found" });
        } else {
            res.json({ message: "Appointment deleted successfully" });
        }
    }
}

export default new AppointmentsController();
