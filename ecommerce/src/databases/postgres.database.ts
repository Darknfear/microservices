import { Sequelize } from "sequelize-typescript";
import { DatabaseConfig } from "../config";

const initialDB = async (): Promise<void> => {
    const sequelize = new Sequelize({
      host: DatabaseConfig.host,
      port: DatabaseConfig.port,
      username: DatabaseConfig.username,
      password: DatabaseConfig.password,
      database: DatabaseConfig.database,
      dialect: 'postgres'
    });
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

};

export default initialDB;
