export class EmailRegisteredError extends Error {
  constructor(message: string = 'E-mail already exists') {
    super(message);
  }
}