import { Injectable } from '@angular/core';

interface IMessage {
  id: number;
  value: string;
}

let n = 0;
class Message implements IMessage {
  public id = n++;

  constructor(
    public value: string
  ) {}
}

@Injectable()
export class MailService {
  messages: IMessage[] = [
    new Message('You\'re now friends with John'),
    new Message('John liked your tweet'),
    new Message('You\'ll never believe what John said...')
  ];

  constructor() { }

  update(id, value) {
    this.messages = this.messages.map(m =>
      m.id === id
        ? { id, value }
        : m
    );
  }
}
