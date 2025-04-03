import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm";

@Entity({
    name: 'patients',
    database: 'medicalSystemDB'
})
export class Patient {
    @ObjectIdColumn()
    id: ObjectId;

    @Column({ type: "string", nullable: false })
    name: string;

    @Column({ type: "number", nullable: false })
    age: number;

    @Column({ type: "string", nullable: false })
    gender: string;

    @Column({ type: "json", nullable: false })
    contact: {
        phone: string;
        email: string;
    };

    @Column({ type: "date", nullable: false })
    createdAt: Date;
}
