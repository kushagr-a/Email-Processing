import "dotenv/config"

export const config = {
    PORT: Number(process.env.PORT) || 3030,
    DB_URL: String (process.env.DATABASE_URL),
    REDIS_URL: String (process.env.REDIS_URL)
}