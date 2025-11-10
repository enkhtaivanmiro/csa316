import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseInterceptors,  } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { S3Service } from 'src/s3/s3.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService,
      private readonly s3Service: S3Service,
    ){}

    @ApiOperation({ summary: 'Get all active projects' })
    @ApiQuery({ name: 'category_id', required: false, type: Number })
    @Get()
    async findAllActive(@Query('category_id') category_id?: number) {
      return this.projectsService.findAllActive(category_id ? Number(category_id) : undefined);
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
    
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Create project' })
    @UseInterceptors(
      FileFieldsInterceptor([
        { name: 'thumbnail', maxCount: 5 },
        { name: 'file_url', maxCount: 5 },
      ]),
    )
    @Post()
    async createProject(
      @Body() createProjectDto: CreateProjectDto,
      @UploadedFiles() files: {
        thumbnail?: Express.Multer.File[];
        file_url?: Express.Multer.File[];
      },
    ) {
      if (files?.thumbnail?.[0]) {
        const uploadedThumbnail = await this.s3Service.uploadFile(files.thumbnail[0]);
        createProjectDto.thumbnail_url = uploadedThumbnail;
      }

      if (files?.file_url?.[0]) {
        const uploadedFile = await this.s3Service.uploadFile(files.file_url[0]);
        createProjectDto.file_url = uploadedFile;
      }

      return this.projectsService.createProject(createProjectDto);
    }


    @ApiOperation({ summary: 'Get detailed information of a single project' })
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.projectsService.getProject({ id: Number(id) });
    }

    @ApiBody({
      schema: {
        example: {
          title: 'sample title',
          description: 'this is a sample',
          category_id: 'foreign key to category_id',
          file_url: 'link',
          thumbnail_url: 'link',
          is_active: 'boolean true/false'
        }
      }
    })
    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async editProject(@Param('id') id: string, @Body() body: any) {
      return this.projectsService.editProject(+id, body);
    }

    @Get('user/:user_id')
    async getByUser(@Param('user_id') user_id: string) {
      return this.projectsService.userProject(Number(user_id));
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':project_id')
    async deleteProject(@Param('project_id') project_id: string) {
      return this.projectsService.deleteProject(Number(project_id));
    }
}
