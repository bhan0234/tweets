import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tweet } from './tweets.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class TweetsService {
  constructor(
    @InjectRepository(Tweet)
    private tweetRepository: Repository<Tweet>,
    private userService: UserService, 
  ) {}

  async create(content: string, username: string): Promise<Tweet> {
    // Fetch user by username
    const user = await this.userService.findOne(username);

    if (!user) {
      throw new Error(`User with username '${username}' not found.`);
    }

    // Create new tweet
    const tweet = new Tweet();
    tweet.content = content;
    tweet.user = user;
    return this.tweetRepository.save(tweet);
  }

  async findAll(): Promise<Tweet[]> {
    return this.tweetRepository.find({ relations: ['user'] });
  }

  async findByUser(userId: number): Promise<Tweet[]> {
    return this.tweetRepository.find({ where: { user: { id: userId } }, relations: ['user'] });
  }
}
