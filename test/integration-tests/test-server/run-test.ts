import { closeConnection, initConnection } from '@enigmatis/mongo-driver';
import { config } from 'dotenv';
import * as mongoose from 'mongoose';
import { GraphQLServer } from '../../../src/server/graphql-server';
import { logger } from './server';

export async function startTestServer(server: GraphQLServer) {
    config();
    jest.setTimeout(15000);
    const connectionString =
        ''; // oh no you dont get this connection string
    await initConnection({ connectionString, waitUntilReconnectInMs: 5000 }, logger as any);
    await mongoose.connection.dropDatabase();
    await mongoose.connection.modelNames().forEach(modelName => {
        mongoose.connection.deleteModel(modelName);
    });
    server.start();
}

export async function stopTestServer(server: GraphQLServer) {
    await closeConnection();
    await server.stop();
}
