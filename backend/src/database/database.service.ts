import { Injectable, Inject } from '@nestjs/common';
import { NeonQueryFunction } from '@neondatabase/serverless';

@Injectable()
export class DatabaseService {
    
  constructor(@Inject('POSTGRES_POOL') private readonly sql: any) {}

  async getTable(name: string): Promise<any[]> {
    return await this.sql(`SELECT * FROM ${name}`);
  }
}