import request from "supertest";
import { app } from '../../app';
import MedicalRecordRepository from "../../database/repository/medicalRecords";

jest.mock("../../database/repository/medicalRecords");

describe("MedicalRecordController", () => {
    it("should return all medical records", async () => {
        (MedicalRecordRepository.getAll as jest.Mock).mockResolvedValue([
            { id: "1", patientId: "123", diagnosis: "Flu" }
        ]);

        const response = await request(app).get("/medical-records");

        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ id: "1", patientId: "123", diagnosis: "Flu" }]);
    });

    it("should return a single medical record by ID", async () => {
        (MedicalRecordRepository.getById as jest.Mock).mockResolvedValue({
            id: "1",
            patientId: "123",
            diagnosis: "Flu"
        });

        const response = await request(app).get("/medical-records/1");

        expect(response.status).toBe(200);
        expect(response.body.diagnosis).toBe("Flu");
    });

    it("should return 404 if medical record is not found", async () => {
        (MedicalRecordRepository.getById as jest.Mock).mockResolvedValue(null);

        const response = await request(app).get("/medical-records/999");

        expect(response.status).toBe(404);
    });

    it("should create a new medical record", async () => {
        const newRecord = { patientId: "123", diagnosis: "Covid-19" };
        (MedicalRecordRepository.create as jest.Mock).mockResolvedValue({ id: "2", ...newRecord });

        const response = await request(app).post("/medical-records").send(newRecord);

        expect(response.status).toBe(201);
        expect(response.body.diagnosis).toBe("Covid-19");
    });

    it("should delete a medical record", async () => {
        (MedicalRecordRepository.delete as jest.Mock).mockResolvedValue(true);

        const response = await request(app).delete("/medical-records/1");

        expect(response.status).toBe(200);
    });

    it("should return 404 if trying to delete a non-existing record", async () => {
        (MedicalRecordRepository.delete as jest.Mock).mockResolvedValue(false);

        const response = await request(app).delete("/medical-records/999");

        expect(response.status).toBe(404);
    });
});
