import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.messageService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.messageService.findOne(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(id, updateMessageDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.messageService.delete(id);
  }
}
