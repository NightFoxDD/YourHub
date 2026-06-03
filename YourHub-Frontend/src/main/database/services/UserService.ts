import { User } from '../../../shared/types';

export class UserService {

  static async getAllUsers(): Promise<User[]> {
    try {
      console.log("Pobieranie użytkowników z backendu Java...");
      return [];
    } catch (error) {
      console.error("Błąd podczas pobierania użytkowników:", error);
      throw error;
    }
  }
}
