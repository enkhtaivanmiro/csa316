import { Body, Controller, Get, Param, Post,  } from '@nestjs/common';
import { ApiOperation, ApiBody } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { getProjectDto } from './dto/getSingleProject.dto';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService){}

    @ApiOperation({ summary: 'Get all active projects'})
    @Get()
    async findAllActive(){
        return this.projectsService.findAllActive();
    }

    @ApiBody({
        schema: {
          example: {
            user_id: "foreign key to user id",
            title: 'sample title',
            description: 'this is a sample',
            category_id: 'foreign key to category_id',
            file_url: 'link',
            thumbnail_url: 'link',
            is_active: 'boolean true/false'
          }
        }
      })
    @ApiOperation({ summary: 'Create project' })
    @Post()
    async createProject(@Body() createProjectDto: CreateProjectDto) {
        return this.projectsService.createProject(createProjectDto);
    }

    @ApiOperation({ summary: 'Get detailed information of a single project' })
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.projectsService.getProject({ id: Number(id) });
    }
}
