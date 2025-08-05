import dotenv from "dotenv";

dotenv.config();

type PostgressType = {
  Host: string;
  Port: number;
  Username: string;
  Password: string;
  Db: string;
};

type EnvConfiqType = {
  Port: Number;
  Postgress: PostgressType;
};

const envConfig: EnvConfiqType = {
  Port: Number(process.env.PORT) || 9090,
  Postgress: {
    Host: process.env.POSTGRESS_HOST || "localhost",
    Port: Number(process.env.POSTGRESS_PORT) || 5432,
    Username: process.env.POSTGRESS_USERNAME || "root",
    Password: process.env.POSTGRESS_PASSWORD || "root",
    Db: process.env.POSTGRESS_DB || "postgres",
  },
};

export default envConfig;
