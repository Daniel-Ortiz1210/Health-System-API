import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm";


@Entity({
    name: 'doctors',
    database: 'medicalSystemDB'
})
export class Doctor {
    @ObjectIdColumn()
    id: ObjectId;

    @Column({ type: "string", nullable: false })
    name: string;

    @Column({ type: "string", nullable: false })
    specialization: string;

    @Column({ type: "json", nullable: false })
    availability: string[];
};

