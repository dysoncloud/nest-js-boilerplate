import {
  Body,
  Controller,
  Inject,
  Logger,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import { ResponseBuilderInterceptor } from "src/common/interceptors/response-builder.interceptor";
import { AuthModuleContants } from "../constants";
import { LoginDto } from "../dto/login.dto";
import { IAuthService } from "../services/interfaces/auth-service.inteface";

@Controller("/v1/auth")
@UseInterceptors(ResponseBuilderInterceptor)
export class AuthController {
  private readonly logger: Logger = new Logger(AuthController.name);

  constructor(
    @Inject(AuthModuleContants.AUTH_SERVICE)
    private readonly authService: IAuthService,
  ) {}

  // when user clicks on login button
  @Post("login")
  async login(@Body() input: LoginDto) {
    return this.authService.login(input);
  }

  // when user clicks on logout
  @Post("logout")
  async logout() {}
}
