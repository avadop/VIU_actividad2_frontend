import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MainPageComponent } from "./components/main-page/main-page.component";

const appRoutes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'main-page', component: MainPageComponent},
];

export const routing: ModuleWithProviders<Object> = RouterModule.forRoot(appRoutes);
