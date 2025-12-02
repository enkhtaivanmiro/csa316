import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './projects.entity';
import { S3Module } from 'src/s3/s3.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    S3Module
  ],
  providers: [ProjectsService],
  controllers: [ProjectsController]
})
export class ProjectsModule {}
