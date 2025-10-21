import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  throwNotFound() {
    throw new NotFoundException('User not found');
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.UserRepository.create(createUserDto);

    try {
      return await this.UserRepository.save(user);
    } catch (error) {
      console.error('Error saving user:', error);
      throw new Error('Failed to save user');
    }
  }

  async findAll() {
    let user;
    try {
      user = await this.UserRepository.find();
    } catch (error) {
      console.error('Error finding users:', error);
      throw new InternalServerErrorException('Failed to find users');
    }
    return user;
  }

  async findOne(id: number) {
    let user;
    try {
      user = await this.UserRepository.findOne({
        where: { id },
      });
    } catch (error) {
      console.error('Error finding user:', error);
      throw new InternalServerErrorException('Failed to find user');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userData = {
      nome: updateUserDto?.name,
      //TODO SENHA Bcrypt
      password: updateUserDto?.password,
    };
    try {
      const user = await this.UserRepository.preload({
        id,
        ...userData,
      });
      return {
        message: 'User updated successfully',
        data: user,
      };
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async remove(id: number) {
    try {
      const result = await this.UserRepository.delete(id);
      if (result.affected === 0) {
        throw new InternalServerErrorException(`User with id ${id} not found`);
      }

      return {
        message: 'User removed successfully',
        deleted: result,
      };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new InternalServerErrorException('Failed to delete user');
    }
  }
}
