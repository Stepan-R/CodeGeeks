import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EventService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEventDto: Prisma.EventCreateInput) {
    return this.databaseService.event.create({
      data: createEventDto,
    });
  }

  async findAll() {
    return this.databaseService.event.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.event.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateEventDto: Prisma.EventUpdateInput) {
    return this.databaseService.event.update({
      where: {
        id,
      },
      data: updateEventDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.event.delete({
      where: {
        id,
      },
    });
  }
}
