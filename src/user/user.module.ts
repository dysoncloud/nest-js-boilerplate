import { Module, Provider } from "@nestjs/common";
import { UserModuleConstants } from "./constants";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./repositories/user.repository";
import { User } from "./entities/user.entity";

const userServiceProvider: Provider = {
  provide: UserModuleConstants.USER_SERVICE,
  useClass: UserService,
};

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
  controllers: [UserController],
  providers: [userServiceProvider],
  exports: [userServiceProvider],
})
export class UserModule {}
