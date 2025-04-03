import { Repository, ObjectId } from "typeorm";
import { DatabaseConnection } from "../connection";
import { MedicalRecord } from "../entity/medicalRecords";

/**
 * Repository class for managing MedicalRecord entity interactions.
 */
class MedicalRecordsRepository {
    private repository: Repository<MedicalRecord>;

    constructor() {
        this.repository = DatabaseConnection.getInstance().getDataSource().getRepository(MedicalRecord);
    }

    /**
     * Retrieves all medical reports from the database.
     * @returns {Promise<MedicalRecord[]>} A list of all medical reports.
     */
    async getAll(): Promise<MedicalRecord[]> {
        return this.repository.find();
    }

    /**
     * Retrieves a medical report by ID.
     * @param {string} id - The ID of the medical report.
     * @returns {Promise<MedicalRecord | null>} The medical report object if found, otherwise null.
     */
    async getById(id: string): Promise<MedicalRecord | null> {
        const objectId = new ObjectId(id);
        return this.repository.findOneBy({ id: objectId });
    }

    /**
     * Retrieves all medical reports for a specific patient.
     * @param {string} patientId - The ID of the patient.
     * @returns {Promise<MedicalRecord[]>} A list of medical reports for the patient.
     */
    async getByPatientId(patientId: string): Promise<MedicalRecord[]> {
        // const objectId = new ObjectId(patientId);
        return this.repository.find({ where: { "patientId": patientId } });
    }

    /**
     * Creates and saves a new medical report record.
     * @param {Partial<MedicalRecord>} reportData - The data for the new medical report.
     * @returns {Promise<MedicalRecord>} The created medical report object.
     */
    async create(reportData: Partial<MedicalRecord>): Promise<MedicalRecord> {
        const report = this.repository.create(reportData);
        return this.repository.save(report);
    }

    /**
     * Updates an existing medical report record.
     * @param {string} id - The ID of the medical report to update.
     * @param {Partial<MedicalRecord>} updateData - The updated medical report data.
     * @returns {Promise<MedicalRecord | null>} The updated medical report object if found, otherwise null.
     */
    async update(id: string, updateData: Partial<MedicalRecord>): Promise<MedicalRecord | null> {
        const report = await this.getById(id);
        if (!report) return null;

        this.repository.merge(report, updateData);
        return this.repository.save(report);
    }

    /**
     * Deletes a medical report record by ID.
     * @param {string} id - The ID of the medical report to delete.
     * @returns {Promise<boolean>} True if deletion was successful, false otherwise.
     */
    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
}

export default new MedicalRecordsRepository();
