import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm";

@Entity({
    name: 'appointments',
    database: 'medicalSystemDB'
})
export class Appointment {
    @ObjectIdColumn()
    id: ObjectId;

    @Column({ type: "string", nullable: false })
    patientId: string;

    @Column({ type: "date", nullable: false })
    date: Date;

    @Column({ type: "string", nullable: false })
    reason: string;

    @Column({ type: "string", nullable: true })
    notes?: string;
}
