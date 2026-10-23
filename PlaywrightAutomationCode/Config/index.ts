//Generate dbConfig

import * as dotenv from 'dotenv'

import * as path from 'path';

import * as process from 'process'

const env= process.env.ENV_NAME || 'local'.toLowerCase();

const envPath=path.resolve(process.cwd(),`.env.${env}`)

dotenv.config({path:envPath , override:true, quiet:true})

export const dbConfig={
    host:process.env.DB_HOST,
    port:Number(process.env.DB_PORT),
    database:process.env.DB_NAME,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD
}
