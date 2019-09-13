import { EnvironmentConfigService } from '../../services/environment/environment-config.service';

class APIServiceInstance {
  private API_URL: string = EnvironmentConfigService.getInstance().get('API_URL');

  public async getTest() {
    try {
      let response = await fetch(this.API_URL + 'test');
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return await response.json();
      } catch (err) {
        throw new Error(err);
      }
  }
}

export const APIService = new APIServiceInstance();
