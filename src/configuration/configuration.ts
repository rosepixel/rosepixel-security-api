export const configuration = () => {
    return {
        environment: process.env.NODE_ENV,
        host: process.env.SERVER_HOST,
        port: process.env.SERVER_PORT,
        secret: process.env.JWT_SECRET
    }
}