const environment = {
    environment: process.env.NODE_ENV,
    port: process.env.SERVER_PORT,
    redis: {

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