export class CheckInValidationExpiredError extends Error {
  constructor(message: string = 'Check-in validation time expired.') {
    super(message);
  }
}