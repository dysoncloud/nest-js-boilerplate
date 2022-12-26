export class ApplicationGenericError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);

    this.name = this.constructor.name;
    this.code = code;
  }
}

export const createCustomErrorType = (
  klass: string,
  message: any,
  code: number,
): any =>
  ({
    [klass]: class extends ApplicationGenericError {
      // TODO: add message is constructor to set custom messages
      constructor() {
        super(message, code);
      }
    },
  }[klass]);
