import { Api } from '../api';

export class Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;

  static async fetchBreeds() {
    try {
      const response = await Api.get('/dogs/breeds');
      return response.data;
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  static async searchDogIds() {
    try {
      const response = await Api.get('/dogs/search');
      const resultIds = response.data.resultIds ?? [];
      return resultIds;
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  static async searchDogs(dogIds: Array<string>) {
    try {
      const response = await Api.post('/dogs', dogIds);
      const results = response.data ?? [];
      return results;
    } catch (error) {
      console.log(error);
    }
    return [];
  }
}
