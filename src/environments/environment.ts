const environment = {
    environment: String(process.env.NODE_ENV),
    port: Number(process.env.SERVER_PORT),
    secret: String(process.env.SERVER_SECRET),
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        user: process.env.REDIS_USER,
        password: process.env.REDIS_PASSWORD,
        database: process.env.REDIS_DATABASE
    },
    database: {
        security: {
            dialect: process.env.DATABASE_DIALECT,
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE
        }
    }
}

export { environment };