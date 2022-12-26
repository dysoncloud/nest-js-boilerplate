import { Module, Provider } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { AuthModuleContants } from "./constants";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";

const authServiceProvider: Provider = {
  provide: AuthModuleContants.AUTH_SERVICE,
  useClass: AuthService,
};

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: AuthModuleContants.jwtConstants.secret, // TODO: move from constants to config
      signOptions: { expiresIn: "1d" }, // TODO: move to config
    }),
  ],
  controllers: [AuthController],
  providers: [authServiceProvider, JwtStrategy],
})
export class AuthModule {}
