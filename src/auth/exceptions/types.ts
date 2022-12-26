import { createCustomErrorType } from "src/common/types/application-error.types";
import { ErrorList } from "./error-list.exceptions";

const errors = Object.values(ErrorList);

const AuthModuleErrors: any = {};
errors.forEach((error) => {
  AuthModuleErrors[error.error] = createCustomErrorType(
    error.error,
    error.message,
    error.code,
  );
});

export { AuthModuleErrors };
