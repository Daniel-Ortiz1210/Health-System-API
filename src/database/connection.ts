import { DataSource } from 'typeorm';
import { Appointment } from './entity/appointments';
import { Patient } from './entity/patients';
import { MedicalRecord } from './entity/medicalRecords';
import 'reflect-metadata';

/**
 * Represents a singleton database connection for the application.
 * This class is responsible for managing the connection to a MongoDB database
 * using the specified configuration options.
 *
 * @remarks
 * The `DatabaseConnection` class follows the singleton design pattern to ensure
 * that only one instance of the database connection exists throughout the application.
 * It provides methods to establish the connection, retrieve the data source, and
 * access the singleton instance.
 */
export class DatabaseConnection {
    private static instance: DatabaseConnection;
    private appDataSource: DataSource;

    /**
     * Private constructor for initializing the database connection.
     * Configures a MongoDB data source with the specified connection options,
     * including authentication, entities, and synchronization settings.
     * 
     * @remarks
     * This constructor is private to enforce the singleton pattern, ensuring
     * that only one instance of the database connection is created.
     */
    private constructor () {
        this.appDataSource = new DataSource({
            url: '',
            type: 'mongodb',
            entities: [Patient, Appointment, MedicalRecord],
            synchronize: true,
        });
    }

    /**
     * Retrieves the singleton instance of the `DatabaseConnection` class.
     * If the instance does not already exist, it initializes a new one.
     *
     * @returns {DatabaseConnection} The singleton instance of the `DatabaseConnection`.
     */
    public static getInstance(): DatabaseConnection {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }

        return DatabaseConnection.instance;
    }

    /**
     * Establishes a connection to the database if it is not already initialized.
     * 
     * @returns {Promise<void>} A promise that resolves when the connection is successfully established.
     * @throws Will log an error message if the database connection fails.
     */
    public async connect(): Promise<void> {
        try {
            if (!this.appDataSource.isInitialized) {
                await this.appDataSource.initialize();
            }

        } catch (error) {
            console.log('Error in the database connection');
        }
    }

    /**
     * Retrieves the application's data source instance.
     *
     * @returns {DataSource} The data source instance used by the application.
     */
    public getDataSource (): DataSource {
        return this.appDataSource;
    }
};
