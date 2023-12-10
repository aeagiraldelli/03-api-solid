export class CheckInError extends Error {
  constructor(message: string = 'Check In error') {
    super(message);
  }
}