import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { IndexComponent } from "./components/index/index.component";

const appRoutes: Routes = [
  {path: '', component: IndexComponent},
];

export const routing: ModuleWithProviders<Object> = RouterModule.forRoot(appRoutes);
