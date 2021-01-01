import { Options, Sequelize } from "sequelize";

import { environment } from "@environments/environment";

class Database {
    public connection: Sequelize;

    constructor() {
        this.connection = new Sequelize({
            dialect: environment.database.security.dialect,
            host: environment.database.security.host,
            port: environment.database.security.port,
            username: environment.database.security.username,
            password: environment.database.security.password,
            database: environment.database.security.database,
            difine: {
                timestamps: false
            },
            dialectOptions: {
                typeCast: (field: any, next: any) => {
                    if (field.type == "DATETIME" || field.type == "TIMESTAMP") {
                        return new Date(field.string() + "Z");
                    }
                    return next();
                }
            },
            logging: false,
            timezone: "-03:00"
        } as Options);
    }
}

export const database: Database = new Database();