import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import {RouterModule,Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {Graficas1Component} from './pages/graficas1/graficas1.component';
import {ProgressComponent} from './pages/progress/progress.component';
import {LoginComponent} from './login/login.component';

const appRoutes: Routes=[    
    {path:'register',component: RegisterComponent},       
    {path:'login',component: LoginComponent},    
    {path:'**',component: NopagefoundComponent},
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes,{useHash:true});