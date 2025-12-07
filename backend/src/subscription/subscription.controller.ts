import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { SubscriptionService } from './subscription.service';
import {
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
  UpdateStatusDto,
  RenewSubscriptionDto,
  BulkCreateSubscriptionDto,
  SubscriptionQueryDto,
} from './dto';

@ApiTags('subscription')
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create subscription' })
  @ApiBody({
    schema: {
      example: {
        user_id: 12,
        project_id: 55,
        length: 'monthly',
      },
    },
  })
  create(@Body() createDto: CreateSubscriptionDto) {
    return this.subscriptionService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'List subscriptions with filters' })
  @ApiQuery({ name: 'user_id', required: false, example: 12 })
  @ApiQuery({ name: 'project_id', required: false, example: 55 })
  @ApiQuery({ name: 'status', required: false, example: 'active' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  findAll(@Query() query: SubscriptionQueryDto) {
    return this.subscriptionService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get subscription by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.subscriptionService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update subscription' })
  @ApiBody({
    schema: {
      example: {
        renewal_date: '2025-03-01T00:00:00Z',
        status: 'on_hold',
      },
    },
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateSubscriptionDto,
  ) {
    return this.subscriptionService.update(id, updateDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Partially update subscription' })
  @ApiBody({
    schema: {
      example: {
        status: 'expired',
      },
    },
  })
  partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateSubscriptionDto,
  ) {
    return this.subscriptionService.update(id, updateDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update only status' })
  @ApiBody({
    schema: {
      example: {
        status: 'active',
      },
    },
  })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateStatusDto,
  ) {
    return this.subscriptionService.updateStatus(id, statusDto);
  }

  @Post(':id/renew') //test
  @ApiOperation({ summary: 'Renew subscription' })
  @ApiBody({
    schema: {
      example: {
        length: 'monthly', 
      },
    },
  })
  renew(
    @Param('id', ParseIntPipe) id: number,
    @Body() renewDto: RenewSubscriptionDto,
  ) {
    return this.subscriptionService.renew(id, renewDto);
  }


  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancel subscription' })
  cancel(@Param('id', ParseIntPipe) id: number) {
    return this.subscriptionService.cancel(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete subscription' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.subscriptionService.remove(id);
  }

  @Get(':id/status')
  @ApiOperation({ summary: 'Get current subscription status' })
  checkStatus(@Param('id', ParseIntPipe) id: number) {
    return this.subscriptionService.checkStatus(id);
  }

  @Post('bulk')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Bulk create subscriptions' })
  @ApiBody({
    schema: {
      example: {
        subscriptions: [
          {
            user_id: 12,
            project_id: 55,
            renewal_date: '2025-02-01T00:00:00Z',
          },
          {
            user_id: 15,
            project_id: 55,
            renewal_date: '2025-02-01T00:00:00Z',
          },
        ],
      },
    },
  })
  bulkCreate(@Body() bulkDto: BulkCreateSubscriptionDto) {
    return this.subscriptionService.bulkCreate(bulkDto);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'List subscriptions by user ID' })
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.subscriptionService.findByUser(userId);
  }

  @Get('project/:projectId')
  @ApiOperation({ summary: 'List subscriptions by project ID' })
  findByProject(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.subscriptionService.findByProject(projectId);
  }
}