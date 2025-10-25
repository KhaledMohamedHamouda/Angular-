import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';

const bootstrap = (context: unknown) => bootstrapApplication(App, config, context as import('@angular/platform-browser').BootstrapContext | undefined);

export default bootstrap;
