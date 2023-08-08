import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().required(),
  JWT_SECRET: Joi.string().min(16).required(),
  MARIADB_HOST: Joi.string().required(),
  MARIADB_USER: Joi.string().required(),
  MARIADB_PASSWORD: Joi.string().allow('', null),
  MARIADB_DB: Joi.string().required(),
  MARIADB_PORT: Joi.number().required(),
  RABBIT_HOST: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
});

export const config = () => ({
  host: {
    port: Number(process.env.PORT),
    jwtSecret: process.env.JWT_SECRET,
  },

  mariadb: {
    type: 'mysql',
    host: process.env.MARIADB_HOST,
    port: Number(process.env.MARIADB_PORT),
    username: process.env.MARIADB_USER,
    password: process.env.MARIADB_PASSWORD,
    database: process.env.MARIADB_DB,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  },

  redis: {
    host: process.env.REDIS_HOST,
  },

  rabbit: {
    host: process.env.RABBIT_HOST,
  },
});
