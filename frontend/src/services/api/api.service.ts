import { EnvironmentConfigService } from '../../services/environment/environment-config.service';

class APIServiceInstance {
  private API_URL: string = EnvironmentConfigService.getInstance().get('API_URL');
  private BASE_URL: string = EnvironmentConfigService.getInstance().get('BASE_URL');
  private API_CLIENT_ID: string = EnvironmentConfigService.getInstance().get('API_CLIENT_ID');
  private API_CLIENT_SECRET: string = EnvironmentConfigService.getInstance().get('API_CLIENT_SECRET');

  public async getTest() {
    try {
      let response = await fetch(this.API_URL + '/test');
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    } catch (err) {
      throw new Error(err);
    }
  }

  public async login(email, password) {
    try {
      let data = {
          'grant_type': 'password',
          'client_id': this.API_CLIENT_ID,
          'client_secret': this.API_CLIENT_SECRET,
          'username': email,
          'password': password,
          'scope': '',
      };

      let response = await fetch(this.BASE_URL + '/oauth/token', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    } catch (err) {
      throw new Error(err);
    }
  }

  public async getUser(token) {
    try {
      console.log('getting user with token', token);
      let response = await fetch(this.API_URL + '/user', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
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
