/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  login() {
    return 'i am signed in';
  }
  register() {
    return 'i am signed up';
  }
}
