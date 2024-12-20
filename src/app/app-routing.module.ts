import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { UsersComponent } from "./users/users.component";
import { TenantsComponent } from "./tenants/tenants.component";
import { RolesComponent } from "app/roles/roles.component";
import { ChangePasswordComponent } from "./users/change-password/change-password.component";
import { MainRoutingModule } from "./main/main-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: AppComponent,
        children: [
          {
            path: "dashboard",
            component: DashboardComponent,
            data: { permission: "Pages.Users" },
            canActivate: [AppRouteGuard],
          },
          {
            path: "users",
            component: UsersComponent,
            data: { permission: "Pages.Users" },
            canActivate: [AppRouteGuard],
          },
          {
            path: "roles",
            component: RolesComponent,
            data: { permission: "Pages.Roles" },
            canActivate: [AppRouteGuard],
          },
          {
            path: "tenants",
            component: TenantsComponent,
            data: { permission: "Pages.Tenants" },
            canActivate: [AppRouteGuard],
          },
          {
            path: "update-password",
            component: ChangePasswordComponent,
            canActivate: [AppRouteGuard],
          },
          {
            path: "main",
            loadChildren: () =>
              import("./main/main.module").then((m) => m.MainModule),
            canActivate: [AppRouteGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
