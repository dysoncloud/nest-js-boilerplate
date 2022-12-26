import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { PasswordResetDto } from "../dto/password-reset.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { IUserService } from "./interfaces/user-service.interface";
import * as argon2 from "argon2";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import * as crypto from "node:crypto";
import { MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { UserNotFound } from "../exceptions";

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly config: ConfigService,
    private readonly mailerService: MailerService,
    @InjectRepository(User) private readonly userRepository: UserRepository,
  ) {}

  async getProfile() {
    /*
    return {
        name: "kshitij",
        age: 31,
        email: "kkumar.kumar326@gmail.com"
    }*/
    // TODO: just added to check proper response
    throw new UserNotFound();
  }

  async createUser(user: CreateUserDto) {
    const emailVerificationToken = crypto.randomBytes(30).toString("hex");
    const insertUser: User = plainToInstance(User, {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: await argon2.hash(user.password),
      email_verification_token: emailVerificationToken,
    });

    await this.mailerService.sendMail({
      to: user.email,
      subject: "'Dyson Cloud email verification!'",
      template: "./email-verification.template.hbs",
      context: {
        name: user.first_name,
        url: `http://${this.config.get("APP_URL")}:${this.config.get(
          "APP_PORT",
        )}/v1/user/activate?user=${user.email}&token=${emailVerificationToken}`, // TODO: link failing, use config properly
      },
    });

    return this.userRepository.insert(insertUser);
  }

  async updateUser(user: UpdateUserDto) {}
  async deleteUser() {}
  async activate(email: string, token: string) {}
  async passwordResetRequest(email: string) {}
  async passwordReset(email: string, token: string, input: PasswordResetDto) {}
  async login(email: string, password: string) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { email },
    });
  }
}
