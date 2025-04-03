import { Repository, ObjectId } from "typeorm";
import { DatabaseConnection } from "../connection";
import { Appointment } from "../entity/appointments";

/**
 * Repository class for managing Appointment entity interactions.
 */
class AppointmentsRepository {
    private repository: Repository<Appointment>;

    constructor() {
        this.repository = DatabaseConnection.getInstance().getDataSource().getRepository(Appointment);
    }

    /**
     * Retrieves all appointments from the database.
     * @returns {Promise<Appointment[]>} A list of all appointments.
     */
    async getAll(): Promise<Appointment[]> {
        return this.repository.find();
    }

    /**
     * Retrieves an appointment by ID.
     * @param {string} id - The ID of the appointment.
     * @returns {Promise<Appointment | null>} The appointment object if found, otherwise null.
     */
    async getById(id: string): Promise<Appointment | null> {
        const objectId = new ObjectId(id);
        return this.repository.findOneBy({ id: objectId });
    }

    /**
     * Retrieves all appointments for a specific patient.
     * @param {string} patientId - The ID of the patient.
     * @returns {Promise<Appointment[]>} A list of appointments for the patient.
     */
    async getByPatientId(patientId: string): Promise<Appointment[]> {
        // const objectId = new ObjectId(patientId);
        return this.repository.find({ where: { "patientId": patientId } });
    }

    /**
     * Creates and saves a new appointment record.
     * @param {Partial<Appointment>} appointmentData - The data for the new appointment.
     * @returns {Promise<Appointment>} The created appointment object.
     */
    async create(appointmentData: Partial<Appointment>): Promise<Appointment> {
        const appointment = this.repository.create(appointmentData);
        return this.repository.save(appointment);
    }

    /**
     * Updates an existing appointment record.
     * @param {string} id - The ID of the appointment to update.
     * @param {Partial<Appointment>} updateData - The updated appointment data.
     * @returns {Promise<Appointment | null>} The updated appointment object if found, otherwise null.
     */
    async update(id: string, updateData: Partial<Appointment>): Promise<Appointment | null> {
        const appointment = await this.getById(id);
        if (!appointment) return null;

        this.repository.merge(appointment, updateData);
        return this.repository.save(appointment);
    }

    /**
     * Deletes an appointment record by ID.
     * @param {string} id - The ID of the appointment to delete.
     * @returns {Promise<boolean>} True if deletion was successful, false otherwise.
     */
    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
}

export default new AppointmentsRepository();
