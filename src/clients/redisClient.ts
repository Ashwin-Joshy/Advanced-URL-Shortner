import { createClient } from 'redis';
import * as dotenv from "dotenv";

dotenv.config()
const redisUsername = process.env.REDIS_USERNAME || 'default';
const redisPassword = process.env.REDIS_PASSWORD || '';
const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort:number = parseInt(process.env.REDIS_PORT || "6379") 
const redisClient = createClient({
    username: redisUsername,
    password: redisPassword,
    socket: {
        host: redisHost,
        port: redisPort
    }
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

redisClient.connect();

export default redisClient;
