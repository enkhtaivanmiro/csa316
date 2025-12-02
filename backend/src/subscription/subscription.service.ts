import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription, SubscriptionStatus } from './entities/subscription.entity';
import { User } from '../users/users.entity';
import { Project } from '../projects/projects.entity';
import {
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
  UpdateStatusDto,
  RenewSubscriptionDto,
  BulkCreateSubscriptionDto,
  SubscriptionQueryDto,
} from './dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createDto: CreateSubscriptionDto) {
    const user = await this.userRepository.findOne({
      where: { id: createDto.user_id },
    });
    if (!user) {
      throw new BadRequestException(
        `User with ID ${createDto.user_id} does not exist`,
      );
    }

    const project = await this.projectRepository.findOne({
      where: { id: createDto.project_id },
    });
    if (!project) {
      throw new BadRequestException(
        `Project with ID ${createDto.project_id} does not exist`,
      );
    }

    const existingSubscription = await this.subscriptionRepository.findOne({
      where: {
        user_id: createDto.user_id,
        project_id: createDto.project_id,
        status: SubscriptionStatus.ACTIVE,
      },
    });

    if (existingSubscription) {
      throw new ConflictException(
        'User already has an active subscription to this project',
      );
    }

    const subscription = this.subscriptionRepository.create(createDto);
    return this.subscriptionRepository.save(subscription);
  }

  async findAll(query: SubscriptionQueryDto) {
    const {
      user_id,
      project_id,
      status,
      page = 1,
      limit = 10,
    } = query;

    const queryBuilder = this.subscriptionRepository.createQueryBuilder('subscription');

    if (user_id) {
      queryBuilder.andWhere('subscription.user_id = :user_id', { user_id });
    }

    if (project_id) {
      queryBuilder.andWhere('subscription.project_id = :project_id', { project_id });
    }

    if (status) {
      queryBuilder.andWhere('subscription.status = :status', { status });
    }

    const [data, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id },
    });

    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }

    return subscription;
  }

  async update(id: number, updateDto: UpdateSubscriptionDto) {
    const subscription = await this.findOne(id);

    Object.assign(subscription, updateDto);
    return this.subscriptionRepository.save(subscription);
  }

  async updateStatus(id: number, statusDto: UpdateStatusDto) {
    const subscription = await this.findOne(id);

    subscription.status = statusDto.status;
    await this.subscriptionRepository.save(subscription);

    return {
      id: subscription.id,
      status: subscription.status,
      updated_at: new Date(),
    };
  }

  async renew(id: number, renewDto: RenewSubscriptionDto) {
    const subscription = await this.findOne(id);

    subscription.renewal_date = new Date(renewDto.renewal_date);
    subscription.status = SubscriptionStatus.ACTIVE;

    return this.subscriptionRepository.save(subscription);
  }

  async cancel(id: number) {
    const subscription = await this.findOne(id);

    subscription.status = SubscriptionStatus.EXPIRED;
    await this.subscriptionRepository.save(subscription);

    return {
      id: subscription.id,
      status: subscription.status,
      cancelled_at: new Date(),
    };
  }

  async remove(id: number) {
    const subscription = await this.findOne(id);
    await this.subscriptionRepository.remove(subscription);
    return;
  }

  async checkStatus(id: number) {
    const subscription = await this.findOne(id);

    const now = new Date();
    const renewalDate = new Date(subscription.renewal_date);
    const daysUntilRenewal = Math.ceil(
      (renewalDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );

    return {
      id: subscription.id,
      status: subscription.status,
      is_active: subscription.status === SubscriptionStatus.ACTIVE,
      days_until_renewal: daysUntilRenewal,
    };
  }

  async bulkCreate(bulkDto: BulkCreateSubscriptionDto) {
    const createdSubscriptions: Subscription[] = [];
    const errors: Array<{ subscription: CreateSubscriptionDto; error: string }> = [];

    for (const subDto of bulkDto.subscriptions) {
      try {
        const subscription = await this.create(subDto);
        createdSubscriptions.push(subscription);
      } catch (error) {
        errors.push({
          subscription: subDto,
          error: error.message,
        });
      }
    }

    return {
      created: createdSubscriptions.length,
      failed: errors.length,
      data: createdSubscriptions,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  async findByUser(userId: number) {
    const subscriptions = await this.subscriptionRepository.find({
      where: { user_id: userId },
    });

    return { data: subscriptions };
  }

  async findByProject(projectId: number) {
    const subscriptions = await this.subscriptionRepository.find({
      where: { project_id: projectId },
    });

    return { data: subscriptions };
  }
}