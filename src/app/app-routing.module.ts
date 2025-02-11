// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { MainComponent } from './components_student/main/main.component';
// import { LoginComponent } from './components_admin/login/login.component';
// import { SidenavComponent } from './components_admin/sidenav/sidenav.component';
// import { ContactComponent } from './components_student/contact/contact.component';
// import { EventsComponent } from './components_student/events/events.component';
// import { AuthGuard } from './components_student/auth.guard';
// import { DashboardComponent } from './components_admin/dashboard/dashboard.component';
// import { GADEventsComponent } from './components_admin/gad-events/gad-events.component';
// import { GadDatabasesComponent } from './components_student/gad-databases/gad-databases.component';
// import { GadRosourceComponent } from './components_student/gad-rosource/gad-rosource.component';
// import { RegisterComponent } from './components_admin/register/register.component';
// import { AdminLoginComponent } from './components_admin/admin-login/admin-login.component';
// import { RepositoryComponent } from './components_admin/repository/repository.component';

// const routes: Routes = [
//   // Primary outlet Student
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'main', component: MainComponent },
//   { path: 'events', component: EventsComponent },
//   { path: 'Gad_Databases', component: GadDatabasesComponent},
//   { path: 'Gad_src', component: GadRosourceComponent },
//   { path: 'contact', component: ContactComponent,canActivate:[AuthGuard] },

//   { path: 'admin-log', component: AdminLoginComponent },
//   // Secondary outlet in Admin
//   {
//     path: 'admin',
//     component: SidenavComponent,
//     children: [
//       { path: '', component: SidenavComponent }, // Default content in sidenav
//       { path: 'dashboard', component: DashboardComponent, outlet: 'secondary' },
//       { path: 'GADevents', component: GADEventsComponent, outlet: 'secondary' },
//       { path: 'admin-repo', component: RepositoryComponent, outlet: 'secondary' },
//       { path: 'admin-register', component: RegisterComponent, outlet: 'secondary' },
//     ],
//   },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components_student/main/main.component';
import { LoginComponent } from './components_admin/login/login.component';
import { SidenavComponent } from './components_admin/sidenav/sidenav.component';
import { ContactComponent } from './components_student/contact/contact.component';
import { EventsComponent } from './components_student/events/events.component';
import { AuthGuard } from './components_student/auth.guard';
import { DashboardComponent } from './components_admin/dashboard/dashboard.component';
import { GADEventsComponent } from './components_admin/gad-events/gad-events.component';
import { GadDatabasesComponent } from './components_student/gad-databases/gad-databases.component';
import { GadRosourceComponent } from './components_student/gad-rosource/gad-rosource.component';
import { RegisterComponent } from './components_admin/register/register.component';
import { AdminLoginComponent } from './components_admin/admin-login/admin-login.component';
import { RepositoryComponent } from './components_admin/repository/repository.component';

const routes: Routes = [
  // 🌐 Public Routes
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin-log', component: AdminLoginComponent },

  // 🎓 Student Routes
  { path: 'main', component: MainComponent }, 
  { path: 'events', component: EventsComponent, canActivate: [AuthGuard] },
  { path: 'Gad_Databases', component: GadDatabasesComponent, canActivate: [AuthGuard] },
  { path: 'Gad_src', component: GadRosourceComponent , canActivate: [AuthGuard]},
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },

  // 🛡️ Admin Routes with Secondary Outlet
  {
    path: 'admin',
    component: SidenavComponent,
    children: [
      { path: '', component: SidenavComponent , }, // Default Admin View
      { path: 'dashboard', component: DashboardComponent, outlet: 'secondary' },
      { path: 'GADevents', component: GADEventsComponent, outlet: 'secondary', canActivate: [AuthGuard] },
      { path: 'admin-repo', component: RepositoryComponent, outlet: 'secondary', canActivate: [AuthGuard] },
      { path: 'admin-register', component: RegisterComponent, outlet: 'secondary', canActivate: [AuthGuard] },
    ],
  },

  // 🚨 Fallback Route
  { path: '**', redirectTo: '/login' } // Redirect unknown paths to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

