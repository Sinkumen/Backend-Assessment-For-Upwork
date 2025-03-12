import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import path from "path";
import configs from "./config";

import { User, Todo } from "../models";

const env = process.env.NODE_ENV || "development";
dotenv.config({ path: path.join(__dirname, "../../.env") });

const configFile = configs[env];
const sequelize: Sequelize = new Sequelize({
  database: configFile.database,
  dialect: configFile.dialect,
  username: configFile.username,
  password: configFile.password,
  host: configFile.host,
  protocol: configFile.protocol,
  dialectOptions: configFile.dialectOptions,
  pool: {
    max: 20,
    min: 5,
    idle: 20000,
    acquire: 60000, // 60 seconds
  },
  retry: { max: 3 },
  models: [User, Todo],
  logging: false,
});

export default sequelize;
