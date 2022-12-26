import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { ResponseBuilderInterceptor } from "src/common/interceptors/response-builder.interceptor";
import { UserModuleConstants } from "../constants";
import { User } from "../decorators/user.decorator";
import { CreateUserDto } from "../dto/create-user.dto";
import { PasswordResetDto } from "../dto/password-reset.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { IUserService } from "../services/interfaces/user-service.interface";

@Controller("/v1/user")
@UseInterceptors(ResponseBuilderInterceptor)
export class UserController {
  private readonly logger: Logger = new Logger(UserController.name);

  constructor(
    @Inject(UserModuleConstants.USER_SERVICE)
    private readonly userService: IUserService,
  ) {}

  // when users requests profile information
  @Get()
  @UseGuards(JwtAuthGuard)
  async getProfile() {
    return this.userService.getProfile();
  }

  // signup user
  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  // when user data is updated
  @Patch()
  @UseGuards(JwtAuthGuard)
  async updateUser(@User() user_id: string, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(user);
  }

  // when user deletes their account
  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteUser() {
    return this.userService.deleteUser();
  }

  // email activation after signup
  @Get("/activate")
  async activate(@Query("email") email: string, @Query("token") token: string) {
    return this.userService.activate(email, token);
  }

  // when user sends data for password reset
  @Post("/password-reset-request")
  async passwordResetRequest(@Body("email") email: string) {
    return this.userService.passwordResetRequest(email);
  }

  // when password reset data is passed
  @Post("/password-reset")
  async passwordReset(
    @Query("email") email: string,
    @Query("token") token: string,
    @Body() input: PasswordResetDto,
  ) {
    return this.userService.passwordReset(email, token, input);
  }
}
