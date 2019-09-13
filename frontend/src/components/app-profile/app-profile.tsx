import { Component, Prop, State, h } from '@stencil/core';
import { sayHello } from '../../helpers/utils';
import { EnvironmentConfigService } from '../../services/environment/environment-config.service';
import { APIService } from '../../services/api/api.service';

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css'
})
export class AppProfile {

  @State() state = false;
  @Prop() name: string;

  formattedName(): string {
    if (this.name) {
      return this.name.substr(0, 1).toUpperCase() + this.name.substr(1).toLowerCase();
    }
    return '';
  }

  async fetchApi() {
    let result = await APIService.getTest();

    console.log(result);

    try {
      let loginResult = await APIService.login('beck24@gmail.com', 'sitka007');

      let token = loginResult.access_token;

      console.log(token);

      let user = await APIService.getUser(token);

      console.log(user);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/" />
          </ion-buttons>
          <ion-title>Profile: {this.name}</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <p>
          {sayHello()}! My name is {this.formattedName()}. My name was passed in through a
          route param!
        </p>

        <p>
          The configured API_URL is { EnvironmentConfigService.getInstance().get('API_URL') }
        </p>

        <ion-item>
          <ion-label>Setting ({this.state.toString()})</ion-label>
          <ion-toggle
            checked={this.state}
            onIonChange={ev => (this.state = ev.detail.checked)}
          />
        </ion-item>
        <ion-button onClick={() => this.fetchApi() }>Fetch API</ion-button>
      </ion-content>
    ];
  }
}
