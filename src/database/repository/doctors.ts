import { DatabaseConnection } from "../connection";
import { Repository, ObjectId } from "typeorm";
import { Doctor } from '../entity/doctors';

/**
 * Repositorio para interactuar con la base de datos MongoDB y realizar operaciones CRUD.
 */
export class DoctorsRepository {

    private repository: Repository<Doctor>;

    constructor() {
        this.repository = DatabaseConnection.getInstance().getDataSource().getRepository(Doctor);
    }

    /**
     * Crea un nuevo doctor en la base de datos.
     * 
     * @param createDoctorDto - Datos necesarios para crear un nuevo doctor.
     * @returns El doctor creado.
     */
    async create(createDoctorDto: Partial<Doctor>): Promise<Doctor> {
        const doctor = this.repository.create(createDoctorDto);
        return await this.repository.save(doctor);
    }

    /**
     * Obtiene todos los doctores de la base de datos.
     * 
     * @returns Un array de doctores.
     */
    async findAll(): Promise<Doctor[]> {
        return await this.repository.find();
    }

    /**
     * Busca un doctor por su ID.
     * 
     * @param id - El ID del doctor a buscar.
     * @returns El doctor encontrado o null si no existe.
     */
    async getById(id: string): Promise<Doctor | null> {
        const oId = new ObjectId(id)
        return await this.repository.findOneBy({ id: oId });
    }

    /**
     * Actualiza los datos de un doctor.
     * 
     * @param id - El ID del doctor a actualizar.
     * @param updateDoctorDto - Los nuevos datos del doctor.
     * @returns El doctor actualizado.
     */
    async update(id: string, updateDoctorDto: Partial<Doctor>): Promise<Doctor | null> {
        const oId = new ObjectId(id)
        const doctor = await this.repository.findOneBy({ id: oId });
        if (!doctor) {
            return null; // Si no se encuentra el doctor, retornamos null
        }
        Object.assign(doctor, updateDoctorDto);
        return await this.repository.save(doctor);
    }

    /**
     * Elimina un doctor de la base de datos.
     * 
     * @param id - El ID del doctor a eliminar.
     * @returns `true` si se eliminó con éxito, `false` si no.
     */
    async delete(id: string): Promise<boolean> {
        const oId = new ObjectId(id);
        const result = await this.repository.delete({ id: oId });
        return result.affected != 0;
    }
}

export default new DoctorsRepository();
