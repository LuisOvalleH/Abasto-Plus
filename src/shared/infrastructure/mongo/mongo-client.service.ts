import { inject, injectable } from 'inversify';
import { Db, MongoClient } from 'mongodb';
import { TYPES } from '../di/types';

@injectable()
export class MongoClientService {
  private readonly client: MongoClient;
  private readonly dbName: string;

  constructor(
    @inject(TYPES.MongoUri) uri: string,
    @inject(TYPES.MongoDbName) dbName: string
  ) {
    this.client = new MongoClient(uri);
    this.dbName = dbName;
  }

  public async connect(): Promise<void> {
    await this.client.connect();
  }

  public async disconnect(): Promise<void> {
    await this.client.close();
  }

  public getDb(): Db {
    return this.client.db(this.dbName);
  }
}
