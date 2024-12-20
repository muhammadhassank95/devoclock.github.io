import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DefaultsComponent } from "./defaults/defaults-component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "defaults",
        component: DefaultsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntegrationRoutingModule {}
