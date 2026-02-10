import Redis from "ioredis";
import {config} from "../config/config.js"

export const redis = new Redis(config.REDIS_URL) // publisher event publish kre gy
export const  subsriber = new  Redis(config.REDIS_URL)