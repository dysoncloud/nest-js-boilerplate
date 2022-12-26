import { Inject, Injectable, Logger } from "@nestjs/common";
import { UserModuleConstants } from "src/user/constants";
import { IUserService } from "src/user/services/interfaces/user-service.interface";
import { LoginDto } from "../dto/login.dto";
import { IAuthService } from "./interfaces/auth-service.inteface";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";
import { UserNotFound } from "src/user/exceptions";
import { InvalidCredentials } from "../exceptions";

@Injectable()
export class AuthService implements IAuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  constructor(
    @Inject(UserModuleConstants.USER_SERVICE)
    private readonly userService: IUserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(input: LoginDto) {
    const user = await this.userService.findByEmail(input.email);

    if (user) {
      if (await argon2.verify(user.password, input.password)) {
        const payload = { user: user.user_id };

        return {
          access_token: this.jwtService.sign(payload),
        };
      } else {
        throw new InvalidCredentials();
      }
    } else {
      throw new UserNotFound();
    }
  }
}
