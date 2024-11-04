import {
	ApplicationConfig,
	provideExperimentalZonelessChangeDetection,
	provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideExperimentalZonelessChangeDetection(),
		// provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
	],
};
