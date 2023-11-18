import {createPool} from 'mysql2/promise'

export const Pool = createPool({
        host: "localhost",
        user: "root",
        password: "",
        port: 3306,
        database: "alexa_soft"
});