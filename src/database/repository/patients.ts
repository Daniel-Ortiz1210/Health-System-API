import { Repository, ObjectId } from "typeorm";
import { DatabaseConnection } from "../connection";
import { Patient } from "../entity/patients";
import "reflect-metadata";

/**
 * Repository class for managing Patient entity interactions.
 */
class PatientRepository {
    private repository: Repository<Patient>;

    constructor() {
        DatabaseConnection.getInstance().connect()
        this.repository = DatabaseConnection.getInstance().getDataSource().getRepository(Patient);
    }

    /**
     * Retrieves all patients from the database.
     * @returns {Promise<Patient[]>} A list of all patients.
     */
    async getAll(): Promise<Patient[]> {
        return this.repository.find();
    }

    /**
     * Retrieves a patient by ID.
     * @param {string} id - The ID of the patient.
     * @returns {Promise<Patient | null>} The patient object if found, otherwise null.
     */
    async getById(id: string): Promise<Patient | null> {
        const oId = new ObjectId(id);
        return this.repository.findOneBy({ id: oId });
    }

    /**
     * Creates and saves a new patient record.
     * @param {Partial<Patient>} patientData - The data for the new patient.
     * @returns {Promise<Patient>} The created patient object.
     */
    async create(patientData: Partial<Patient>): Promise<Patient> {
        const patient = this.repository.create(patientData);
        return this.repository.save(patient);
    }

    /**
     * Updates an existing patient record.
     * @param {string} id - The ID of the patient to update.
     * @param {Partial<Patient>} updateData - The updated patient data.
     * @returns {Promise<Patient | null>} The updated patient object if found, otherwise null.
     */
    async update(id: string, updateData: Partial<Patient>): Promise<Patient | null> {
        const patient = await this.getById(id);
        if (!patient) return null;

        this.repository.merge(patient, updateData);
        return this.repository.save(patient);
    }

    /**
     * Deletes a patient record by ID.
     * @param {string} id - The ID of the patient to delete.
     * @returns {Promise<boolean>} True if deletion was successful, false otherwise.
     */
    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
    }

export default new PatientRepository();
