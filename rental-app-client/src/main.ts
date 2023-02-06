import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
registerLicense(
  'ORg4AjUWIQA/Gnt2VVhkQlFacldJXnxOYVF2R2BJeVRxcl9HZ0wxOX1dQl9gSXxTc0RrWHZceX1UT2A='
);
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
