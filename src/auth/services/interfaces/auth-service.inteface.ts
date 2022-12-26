import { LoginDto } from "src/auth/dto/login.dto";

export interface IAuthService {
  login(input: LoginDto);
}
