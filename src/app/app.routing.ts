import { Routes, RouterModule } from '@angular/router';

import { LoginComponent, HomeComponent, PageNotFoundComponent } from './public';

export const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent
	},

	{
		path: '',
		loadChildren: () => import('./public/public.module').then((m) => m.PublicModule)
		/* canActivate: [ AuthGuard ] */
	},

	{
		path: 'admin',
		loadChildren: () => import('./protected/protected.module').then((m) => m.ProtectedModule)
		/* canActivate: [ AuthGuard ] */
	},

	{
		path: '**',
		component: PageNotFoundComponent
	}

	// otherwise redirect to home
	/*  { path: '**', redirectTo: '' } */
];

export const appRoutingModule = RouterModule.forRoot(routes);
//export const ComponentFromR=[];
