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

  static async searchDogIds(params: any) {
    try {
      const response = await Api.get('/dogs/search', params);
      const { resultIds, total } = response.data;
      return { resultIds, total };
    } catch (error) {
      console.log(error);
    }
    return { resultIds: [], total: 0 };
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

  static async searchMatches(dogIds: Array<string>) {
    try {
      const response = await Api.post('/dogs/match', dogIds);
      return response.data.match;
    } catch (error) {
      console.log(error);
    }
    return [];
  }
}
