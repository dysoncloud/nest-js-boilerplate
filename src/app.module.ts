import { Module, Provider, ValidationPipe } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import configuration from "../config";
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "database/data-source";
import { APP_PIPE } from "@nestjs/core";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

const ENV = process.env.NODE_ENV;

const validationPipeProvider: Provider = {
  provide: APP_PIPE,
  useClass: ValidationPipe,
};

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      envFilePath: !ENV ? ".env" : `.${ENV}.env`,
      load: configuration,
      cache: true,
      expandVariables: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      useFactory: (configService: ConfigService) => dataSourceOptions,
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get("MAIL.HOST"),
          port: +config.get("MAIL.PORT"),
          secure: config.get("MAIL.SECURE"),
          auth: {
            user: config.get("MAIL.USER"),
            pass: config.get("MAIL.PASSWORD"),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get("MAIL.NOREPLY")}>`,
        },
        template: {
          dir: "assets/templates/mail",
          adapter: new HandlebarsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [validationPipeProvider],
})
export class AppModule {}
