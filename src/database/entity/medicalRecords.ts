import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm";

@Entity({
    name: 'medicalRecords',
    database: 'medicalSystemDB'
})
export class MedicalRecord {
    @ObjectIdColumn()
    id: ObjectId;

    @Column({ type: "string", nullable: false })
    patientId: string;

    @Column({ type: "string", nullable: false })
    diagnosis: string;

    @Column({ type: "json", nullable: false })
    medications: {
        name: string;
        dosage: string;
    }[];

    @Column({ type: "json", nullable: false })
    treatments: string[];

    @Column({ type: "date", nullable: false })
    recordDate: Date;
}
