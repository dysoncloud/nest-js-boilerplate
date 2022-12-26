import { CreateUserDto } from "src/user/dto/create-user.dto";
import { PasswordResetDto } from "src/user/dto/password-reset.dto";
import { UpdateUserDto } from "src/user/dto/update-user.dto";
import { User } from "src/user/entities/user.entity";

export interface IUserService {
  getProfile();
  createUser(user: CreateUserDto);
  updateUser(user: UpdateUserDto);
  deleteUser();
  activate(email: string, token: string);
  passwordResetRequest(email: string);
  passwordReset(email: string, token: string, input: PasswordResetDto);
  login(email: string, password: string);
  findByEmail(email: string): Promise<User | undefined>;
}
