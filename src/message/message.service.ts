import { Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  private lastId = 1;
  private messages: Message[] = [
    {
      id: 1,
      text: 'test',
      from: 'Joana',
      to: 'João',
      read: false,
      date: new Date(),
    },
  ];

  findAll() {
    return this.messages;
  }

  findOne(id: string) {
    return this.messages.find((item) => item.id === +id);
  }

  create(body: CreateMessageDto) {
    this.lastId++;
    const id = this.lastId;
    const newMessage = {
      id,
      ...body,
      read: false,
      date: new Date(),
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  update(id: string, body: UpdateMessageDto) {
    const messageIndex = this.messages.findIndex((item) => item.id === +id);
    if (messageIndex !== -1) {
      const existMessage = this.messages[messageIndex];
      console.log('exist', existMessage);

      const finalMessage = (this.messages[messageIndex] = {
        ...existMessage,
        ...body,
      });
      return finalMessage;
    }
    return 'User not found';
  }

  delete(id: string) {
    const messageIndex = this.messages.findIndex((item) => item.id === +id);
    if (messageIndex !== -1) {
      this.messages.splice(messageIndex, 1);
      return 'User deleted successfully';
    }
    return 'User not found';
  }
}
