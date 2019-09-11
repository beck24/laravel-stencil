import { Config } from '@stencil/core';
import * as dotenv from 'dotenv-safe';

declare var process: any;

dotenv.config({
  example: process.env.CI ? '.env.ci.example' : '.env.example'
});

export const config: Config = {
  outputTargets: [{
    type: 'www',
    baseUrl: process.env.APP_BASEURL,
    dir: '../public',
    empty: false,
    serviceWorker: null
  }],
  globalScript: 'src/global/app.ts',
  globalStyle: 'src/global/app.css'
};
