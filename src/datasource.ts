import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "./entities/User";
import { Url } from "./entities/Url";
import { Logs } from "./entities/Logs";

dotenv.config();

const { DB_URL, DB_SSL } = process.env;

export const AppDataSource = new DataSource({
    type: "postgres",
    url: DB_URL,
    ssl: {
        rejectUnauthorized: false,
        ca: DB_SSL,
    },

    synchronize: true,
    logging: false,
    entities: [User, Url, Logs],
    migrations: [],
    subscribers: [],
});

export async function getRepo(repo: any) {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    return AppDataSource.getRepository(repo);
}