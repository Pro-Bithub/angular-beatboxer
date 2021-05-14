import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AppSettings } from '../settings/app.settings';

import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { videos } from '../model/videos';
import { Events } from '../model/events';
import { Community } from '../model/community';
import { User } from '../model/user';

@Injectable({
	providedIn: 'root'
})
export class AdminService {
	constructor(private http: HttpClient) {}
	private _list: videos[] = [];
	private _observableList: BehaviorSubject<videos[]> = new BehaviorSubject([]);
	private _list_events: Events[] = [];
	private _observableList_events: BehaviorSubject<Events[]> = new BehaviorSubject([]);
	private _list_Community: Community[] = [];
	private _observableList_Community: BehaviorSubject<Community[]> = new BehaviorSubject([]);

	get observableListevents(): Observable<Events[]> {
		return this._observableList_events.asObservable();
	}
	get observableList(): Observable<videos[]> {
		return this._observableList.asObservable();
	}
	get observableListCommunity(): Observable<Community[]> {
		return this._observableList_Community.asObservable();
	}

	add(videos: videos) {
		this._list.push(videos);
		this._observableList.next(this._list);
	}

	addEvents(events: Events) {
		this._list_events.push(events);
		this._observableList_events.next(this._list_events);
	}

	addEventsCommunity(community: Community) {
		this._list_Community.push(community);
		this._observableList_Community.next(this._list_Community);
	}

	GetCommunity(): Observable<Community[]> {
		this.addEventsCommunity({
			id: '1',
			urlphoto: '../../../../assets/img/p1.jpg',
			name: 'Reynard Johnson',
			date: '2020-01-30'
		});
		this.addEventsCommunity({
			id: '1',
			urlphoto: '../../../../assets/img/p2.jpg',
			name: 'Tasha Gross',
			date: '2020-02-30'
		});

		this.addEventsCommunity({
			id: '1',
			urlphoto: '../../../../assets/img/p3.jpg',
			name: 'Naomi Ramos',
			date: '2020-04-30'
		});

		this.addEventsCommunity({
			id: '1',
			urlphoto: '../../../../assets/img/p4.jpg',
			name: 'Laurel Fraley',
			date: '2020-04-30'
		});
		this.addEventsCommunity({
			id: '1',
			urlphoto: '../../../../assets/img/p1.jpg',
			name: 'Reynard Johnson',
			date: '2020-01-30'
		});
		this.addEventsCommunity({
			id: '1',
			urlphoto: '../../../../assets/img/p2.jpg',
			name: 'Tasha Gross',
			date: '2020-02-30'
		});

		this.addEventsCommunity({
			id: '1',
			urlphoto: '../../../../assets/img/p3.jpg',
			name: 'Naomi Ramos',
			date: '2020-04-30'
		});

		this.addEventsCommunity({
			id: '1',
			urlphoto: '../../../../assets/img/p4.jpg',
			name: 'Laurel Fraley',
			date: '2020-04-30'
		});
		this.addEventsCommunity({
			id: '1',
			urlphoto: '../../../../assets/img/p1.jpg',
			name: 'Reynard Johnson',
			date: '2020-01-30'
		});
		this.addEventsCommunity({
			id: '1',
			urlphoto: '../../../../assets/img/p2.jpg',
			name: 'Tasha Gross',
			date: '2020-02-30'
		});

		this.addEventsCommunity({
			id: '1',
			urlphoto: '../../../../assets/img/p3.jpg',
			name: 'Naomi Ramos',
			date: '2020-04-30'
		});

		this.addEventsCommunity({
			id: '1',
			urlphoto: '../../../../assets/img/p4.jpg',
			name: 'Laurel Fraley',
			date: '2020-04-30'
		});
		this.addEventsCommunity({
			id: '1',
			urlphoto: '../../../../assets/img/p1.jpg',
			name: 'Reynard Johnson',
			date: '2020-01-30'
		});
		this.addEventsCommunity({
			id: '1',
			urlphoto: '../../../../assets/img/p2.jpg',
			name: 'Tasha Gross',
			date: '2020-02-30'
		});

		this.addEventsCommunity({
			id: '1',
			urlphoto: '../../../../assets/img/p3.jpg',
			name: 'Naomi Ramos',
			date: '2020-04-30'
		});

		this.addEventsCommunity({
			id: '1',
			urlphoto: '../../../../assets/img/p4.jpg',
			name: 'Laurel Fraley',
			date: '2020-04-30'
		});

		return this._observableList_Community;
	}

	Getevents(): Observable<Events[]> {
		/* 	this.addEvents({
			title: '2021 Austrian Beatbox Championships'
		});

		this.addEvents({
			title: '2021 Czech Beatbox Championships'
		});
		this.addEvents({
			title: '2021 Danish Beatbox Championships'
		});
		this.addEvents({
			title: '2021 French Beatbox Championships'
		});
		this.addEvents({
			title: '2021 Germany Beatbox Championships'
		});
		this.addEvents({
			title: '2021 Greek Beatbox Championships'
		});

		this.addEvents({
			title: '2021 Irish Beatbox Championships'
		});
		this.addEvents({
			title: '2021 Italian Beatbox Championships'
		});

		this.addEvents({
			title: '2021 Polish Beatbox Championships'
		});

		this.addEvents({
			title: '2021 Portugal Beatbox Championships'
		});

		this.addEvents({
			title: '2021 Russian Beatbox Championships'
		});
		this.addEvents({
			title: '2021 UK Beatbox Championships'
		});
		this.addEvents({
			title: '2021 Welsh Beatbox Championships'
		});
		this.addEvents({
			title: '2021 American Beatbox Championships'
		});
		this.addEvents({
			title: '2021 Canadian Beatbox Championships'
		});

		this.addEvents({
			title: '2021 Mexican Beatbox Championships'
		});
		this.addEvents({
			title: '2021 Great North Beatbox Battle'
		});
		this.addEvents({
			title: '2021 Midwest Beatbox Battle'
		});
		this.addEvents({
			title: '2021 East Coast Beatbox Battle'
		});
		this.addEvents({
			title: '2021 Legends Beatbox Championships'
		});
		this.addEvents({
			title: '2021 CrossRoads Beatbox Battle'
		});

		return this._observableList_events; */
		return this.http.get<any>(AppSettings.App_URL + '/events');
	}

	send_event_req(data: any): Observable<string> {
		let parm = {
			name: data.name,
			email: data.email,
			eventname: data.eventname,
			date: data.date,
			city: data.city,
			country: data.country
		};

		/*     let EmprintAdmin = { 'fingerPrint': hashcode } */
		return this.http.post<string>(AppSettings.App_URL + '/req-events', parm, {
			headers: new HttpHeaders({
				Authorization: '{data}',
				'Content-Type': 'application/json'
			}),
			responseType: 'text' as 'json'
		});
	}

	GetUserBYid(id): Observable<User> {
		return of({
			id: '1',
			urlphoto: '../../../../assets/img/p1.jpg',
			name: 'Reynard Johnson',
			date: '2020-01-30'
		});

		//	 this._observable_User;
	}
	GetVideosBYiduser(id): Observable<videos[]> {
		return this.GetVideos();
	}
	GetVideos(): Observable<videos[]> {
		/* 		for (let index = 0; index < 10; index++) {
			this.add({
				url: 'http://www.youtube.com/embed/7lqXobo6eEA',
				title: 'title' + index,
				desc:
					'Imagine two musically talented beatboxers recreating and remixing each other’s song into one performance.  Check this one out!! Bigman and Gene’s latest remix piece “BIGENE” BEATBOX PLANET' +
					index
			});
		}
		return this._observableList; */
		return this.http.get<any>(AppSettings.App_URL + '/videos');
	}

	checkadmin() {
		return this.http.get<any>(AppSettings.App_URL + '/admin/login', {
			headers: new HttpHeaders({
				Authorization: '{data}',
				'Content-Type': 'application/json'
			}),
			responseType: 'text' as 'json'
		});
	}
	checkfingeradmin() {
		return this.http.get<any>(AppSettings.App_URL + '/admin/checkfinger', {
			headers: new HttpHeaders({
				Authorization: '{data}',
				'Content-Type': 'application/json'
			}),
			responseType: 'text' as 'json'
		});
	}
	insertEmployerAndEmpriente(data: any) {
		let role = 'ROLE_EMPLOYER';
		if (data.roles != null) role = 'ROLE_' + data.roles;
		let Userwithhashcode = {
			fingerPrint: data.finger,
			admin: {
				cin: data.cin,
				laboName: data.laboName,
				username: data.username,
				password: data.password,
				roles: [ role ],
				personne: {
					nom: data.name,
					prenom: data.lastName,

					tele: data.tele
				}
			}
		};

		return this.http.post(AppSettings.App_URL + '/admin/insertEmployerAndEmpriente', Userwithhashcode, {
			headers: new HttpHeaders({
				Authorization: '{data}',
				'Content-Type': 'application/json'
			}),
			responseType: 'text'
		});
		/* .pipe(catchError(this.errorHandler)); */
	}
	UpdateEmployerAndEmpriente(data: any, infomodal) {
		let role = 'ROLE_EMPLOYER';
		if (data.roles != null) role = data.roles;
		let Userwithhashcode = {
			id: infomodal.id,
			fingerPrint: data.finger,
			admin: {
				id: infomodal.admin.id,

				cin: data.cin,
				laboName: data.laboName,
				username: data.username,
				password: data.password,
				roles: [ role ],
				personne: {
					id: infomodal.admin.personne.id,
					nom: data.name,
					prenom: data.lastName,
					tele: data.tele,
					adresse: infomodal.admin.personne.adresse
				}
			}
		};

		return this.http.post(AppSettings.App_URL + '/admin/UpdateEmployerAndEmpriente', Userwithhashcode, {
			headers: new HttpHeaders({
				Authorization: '{data}',
				'Content-Type': 'application/json'
			}),
			responseType: 'text'
		});
	}

	deleteuserbyid(id) {
		return this.http.get<any>(AppSettings.App_URL + '/admin/delete/' + id);
	}
}
