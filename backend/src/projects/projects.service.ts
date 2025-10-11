import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Projects } from './projects.entity'
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { CreateProjectDto } from './dto/create-project.dto';
import { GetActiveDto } from './dto/get-active.dto';
import { getProjectDto } from './dto/getSingleProject.dto';


@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Projects)
        private projectsRepository: Repository<Projects>,
    ) {}

    async findAllActive() {
        return this.projectsRepository.find({ where: { is_active: true } });
    }

    async createProject(createProjectDto: CreateProjectDto){
        const project = this.projectsRepository.create(createProjectDto);
        return this.projectsRepository.save(project)
    }

    async getProject(getSingleProject: getProjectDto) {
        const project = await this.projectsRepository.findOne({
            where: { id: getSingleProject.id },
        });

        if (!project) {
            throw new NotFoundException('Project not found');
        }

        return project;
    }
}
