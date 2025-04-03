import request from "supertest";
import { app } from '../../app';
import AppointmentsRepository from "../../database/repository/appointments";

jest.mock("../../database/repository/appointments");

describe("AppointmentController", () => {
    it("should return all appointments", async () => {
        (AppointmentsRepository.getAll as jest.Mock).mockResolvedValue([
            { id: "1", patientId: "123", date: "2024-04-01", reason: "Checkup" }
        ]);

        const response = await request(app).get("/appointments");

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
    });

    it("should return an appointment by ID", async () => {
        (AppointmentsRepository.getById as jest.Mock).mockResolvedValue({
            id: "1",
            patientId: "123",
            date: "2024-04-01",
            reason: "Checkup"
        });

        const response = await request(app).get("/appointments/1");

        expect(response.status).toBe(200);
        expect(response.body.reason).toBe("Checkup");
    });

    it("should create a new appointment", async () => {
        const newAppointment = { patientId: "123", date: "2024-05-01", reason: "Follow-up" };
        (AppointmentsRepository.create as jest.Mock).mockResolvedValue({ id: "2", ...newAppointment });

        const response = await request(app).post("/appointments").send(newAppointment);

        expect(response.status).toBe(201);
        expect(response.body.reason).toBe("Follow-up");
    });

    it("should delete an appointment", async () => {
        (AppointmentsRepository.delete as jest.Mock).mockResolvedValue(true);

        const response = await request(app).delete("/appointments/1");

        expect(response.status).toBe(200);
    });

    it("should return 404 when deleting a non-existing appointment", async () => {
        (AppointmentsRepository.delete as jest.Mock).mockResolvedValue(false);

        const response = await request(app).delete("/appointments/999");

        expect(response.status).toBe(404);
    });
});
