import 'reflect-metadata';
import express, { Express } from 'express';
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { doctorsRouter } from './routes/doctors.routes';
import { patientsRouter } from './routes/patients.routes';
import { medicalRecordsRouter } from './routes/medicalRecords.routes';
import { appointmentsRouter } from './routes/appointments.routes';
import { validateRequestBody } from './utils/middleware'

export const app: Express = express();
export const port: number = Number(process.env.APP_PORT) || 3001;

// Swagger definition
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Medical API",
            version: "1.0.0",
            description: "API for managing patients, medical records, and appointments",
        },
        servers: [
            { url: "http://localhost:3001", description: "Local server" }
        ],
        components: {
            schemas: {
                Patient: {
                    type: "object",
                    required: ["name", "age", "gender", "contact"],
                    properties: {
                        name: { type: "string", description: "Full name of the patient" },
                        age: { type: "integer", description: "Age of the patient" },
                        gender: { type: "string", enum: ["Male", "Female", "Other"], description: "Gender of the patient" },
                        contact: {
                            type: "object",
                            properties: {
                                phone: { type: "string", description: "Phone number" },
                                email: { type: "string", description: "Email address" }
                            }
                        },
                        createdAt: { type: "string", format: "date-time", description: "Timestamp of patient creation" }
                    },
                    example: {
                        name: "John Doe",
                        age: 30,
                        gender: "Male",
                        contact: { phone: "+123456789", email: "johndoe@example.com" },
                        createdAt: "2024-04-01T12:00:00Z"
                    }
                },
                MedicalRecord: {
                    type: "object",
                    required: ["patientId", "diagnosis", "medications", "treatments", "recordDate"],
                    properties: {
                        patientId: { type: "string", description: "ID of the patient associated with this record" },
                        diagnosis: { type: "string", description: "Diagnosis description" },
                        medications: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    name: { type: "string", description: "Medication name" },
                                    dosage: { type: "string", description: "Dosage of the medication" }
                                }
                            }
                        },
                        treatments: {
                            type: "array",
                            items: { type: "string" },
                            description: "List of treatments"
                        },
                        recordDate: { type: "string", format: "date-time", description: "Date of the medical record" }
                    },
                    example: {
                        patientId: "661f1c2b0a5f5b00123abcd1",
                        diagnosis: "Hypertension",
                        medications: [
                            { name: "Lisinopril", dosage: "10mg daily" }
                        ],
                        treatments: ["Regular exercise", "Low-sodium diet"],
                        recordDate: "2024-04-01T12:00:00Z"
                    }
                },
                Appointment: {
                    type: "object",
                    required: ["patientId", "date", "reason"],
                    properties: {
                        patientId: { type: "string", description: "ID of the patient for this appointment" },
                        date: { type: "string", format: "date-time", description: "Date and time of the appointment" },
                        reason: { type: "string", description: "Reason for the appointment" },
                        notes: { type: "string", nullable: true, description: "Optional notes for the appointment" }
                    },
                    example: {
                        patientId: "661f1c2b0a5f5b00123abcd1",
                        date: "2024-04-05T10:00:00Z",
                        reason: "Routine check-up",
                        notes: "Patient requested morning appointment"
                    }
                }                                
            }
        }        
    },
    apis: ["./src/controllers/*.ts"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Function to setup Swagger in Express
export function setupSwagger(app: Express) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

app.use(express.json())
setupSwagger(app);
app.use(validateRequestBody);
app.use('/doctors', doctorsRouter);
app.use('/patients', patientsRouter);
app.use('/medical-records', medicalRecordsRouter);
app.use('/appointments', appointmentsRouter);
