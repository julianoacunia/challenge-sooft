import * as process from 'process';

export const configLoader = () => {
  return {
    port: process.env.PORT,
    database: {
      noqsl: {
        url: process.env.MONGODB_URL,
        database: process.env.MONGODB_DATABASE
      }
    }
  }
}