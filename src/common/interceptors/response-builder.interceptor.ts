import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { catchError, map, Observable, of } from "rxjs";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ApiResponse<T> {
  statusCode: number;
  code?: number;
  message?: string;
  data?: any;
}

@Injectable()
export class ResponseBuilderInterceptor<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<ApiResponse<T>> | Promise<Observable<ApiResponse<T>>> {
    const statusCode = context.switchToHttp().getResponse().statusCode;

    return next.handle().pipe(
      map((data) => {
        return {
          statusCode,
          data,
        };
      }),
      catchError((err) => {
        return of({
          statusCode,
          code: err.code,
          message: err.message,
        });
      }),
    );
  }
}
