import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/Core';
import { DashboardComponent } from './components/dashboard.component';
import { ErrorComponent } from './components/error.component';

const appRoutes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: '**', component: ErrorComponent}
];
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes); 