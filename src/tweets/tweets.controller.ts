
import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tweets')
export class TweetsController {
  constructor(private tweetService: TweetsService) {}

  @Get()
  async findAll() {
    return this.tweetService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  async findByUser(@Param('userId') userId: number) {
    return this.tweetService.findByUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body('content') content: string, @Request() req) {
    const username = req.user.username; 
    return this.tweetService.create(content, username);
  }
}
