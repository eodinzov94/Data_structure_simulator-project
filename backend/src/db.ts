import {Sequelize} from 'sequelize'

export const sequelize  = new Sequelize(
    process.env.DB_NAME || 'avds',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || '12345',
    {
        dialect: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: 5432
    }
)