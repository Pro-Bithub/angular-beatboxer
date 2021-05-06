import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../settings/app.settings';
import { Admin } from '../model/admin';
import { Observable } from 'rxjs';
@Injectable({
	providedIn: 'root'
})
export class LoginService {
	constructor(private http: HttpClient) {}

	getPublicContent(): Observable<any> {
		return this.http.get(AppSettings.App_URL + 'all', { responseType: 'text' });
	}

	getUserBoard(): Observable<any> {
		return this.http.get(AppSettings.App_URL + 'user', { responseType: 'text' });
	}

	getModeratorBoard(): Observable<any> {
		return this.http.get(AppSettings.App_URL + 'mod', { responseType: 'text' });
	}

	getAdminBoard(): Observable<any> {
		return this.http.get(AppSettings.App_URL + 'admin', { responseType: 'text' });
	}
}
