import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { AppSettings } from "../settings/app.settings";

import { Observable, BehaviorSubject, Subject, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { videos } from "../model/videos";
import { Events } from "../model/events";
import { Community } from "../model/community";
import { User } from "../model/user";
import { TokenStorageService } from "./token-storage.service";
import { Router } from "@angular/router";
import { EventsReq } from "../model/eventsReq";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  /* */
  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {
    this.userSubject = new BehaviorSubject<User>(tokenStorageService.getUser());
    this.user = this.userSubject.asObservable();
  }

  /**
   * Show a notification
   *
   * @param {string} type    Notification type
   * @param {string} message Notification message
   */
  public showNotification(type: string, message: string): void {
    /* this.notifierService.notify(type, message); */
  }

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  public get userValue(): User {
    return this.userSubject.value;
  }
  logout() {
    // remove user from local storage and set current user to null
    this.tokenStorageService.signOut(); // {4}
    this.userSubject.next(null);
    this.router.navigate(["/login"]);
  }
  ///

  private _list: videos[] = [];
  private _observableList: BehaviorSubject<videos[]> = new BehaviorSubject([]);
  private _list_events: Events[] = [];
  private _observableList_events: BehaviorSubject<
    Events[]
  > = new BehaviorSubject([]);
  private _list_Community: Community[] = [];
  private _observableList_Community: BehaviorSubject<
    Community[]
  > = new BehaviorSubject([]);

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
    return this.http.get<any>(AppSettings.App_URL + "/users");
    /*  this.addEventsCommunity({
      id: "1",
      urlphoto: "../../../../assets/img/p1.jpg",
      name: "Reynard Johnson",
      date: "2020-01-30",
    });
    this.addEventsCommunity({
      id: "1",
      urlphoto: "../../../../assets/img/p2.jpg",
      name: "Tasha Gross",
      date: "2020-02-30",
    });

    this.addEventsCommunity({
      id: "1",
      urlphoto: "../../../../assets/img/p3.jpg",
      name: "Naomi Ramos",
      date: "2020-04-30",
    });

    this.addEventsCommunity({
      id: "1",
      urlphoto: "../../../../assets/img/p4.jpg",
      name: "Laurel Fraley",
      date: "2020-04-30",
    });
    this.addEventsCommunity({
      id: "1",
      urlphoto: "../../../../assets/img/p1.jpg",
      name: "Reynard Johnson",
      date: "2020-01-30",
    });
    this.addEventsCommunity({
      id: "1",
      urlphoto: "../../../../assets/img/p2.jpg",
      name: "Tasha Gross",
      date: "2020-02-30",
    });

    this.addEventsCommunity({
      id: "1",
      urlphoto: "../../../../assets/img/p3.jpg",
      name: "Naomi Ramos",
      date: "2020-04-30",
    });

    this.addEventsCommunity({
      id: "1",
      urlphoto: "../../../../assets/img/p4.jpg",
      name: "Laurel Fraley",
      date: "2020-04-30",
    });
    this.addEventsCommunity({
      id: "1",
      urlphoto: "../../../../assets/img/p1.jpg",
      name: "Reynard Johnson",
      date: "2020-01-30",
    });
    this.addEventsCommunity({
      id: "1",
      urlphoto: "../../../../assets/img/p2.jpg",
      name: "Tasha Gross",
      date: "2020-02-30",
    });

    this.addEventsCommunity({
      id: "1",
      urlphoto: "../../../../assets/img/p3.jpg",
      name: "Naomi Ramos",
      date: "2020-04-30",
    });

    this.addEventsCommunity({
      id: "1",
      urlphoto: "../../../../assets/img/p4.jpg",
      name: "Laurel Fraley",
      date: "2020-04-30",
    });
    this.addEventsCommunity({
      id: "1",
      urlphoto: "../../../../assets/img/p1.jpg",
      name: "Reynard Johnson",
      date: "2020-01-30",
    });
    this.addEventsCommunity({
      id: "1",
      urlphoto: "../../../../assets/img/p2.jpg",
      name: "Tasha Gross",
      date: "2020-02-30",
    });

    this.addEventsCommunity({
      id: "1",
      urlphoto: "../../../../assets/img/p3.jpg",
      name: "Naomi Ramos",
      date: "2020-04-30",
    });

    this.addEventsCommunity({
      id: "1",
      urlphoto: "../../../../assets/img/p4.jpg",
      name: "Laurel Fraley",
      date: "2020-04-30",
    });
  return this._observableList_Community; */
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
    return this.http.get<any>(AppSettings.App_URL + "/events");
  }

  GeteventsReq(): Observable<EventsReq[]> {
    return this.http.get<any>(AppSettings.App_URL + "/req-events");
  }

  send_event_req(data: any): Observable<string> {
    let parm = {
      name: data.name,
      email: data.email,
      eventname: data.eventname,
      date: data.date,
      city: data.city,
      country: data.country,
    };

    /*     let EmprintAdmin = { 'fingerPrint': hashcode } */
    return this.http.post<string>(AppSettings.App_URL + "/req-events", parm, {
      headers: new HttpHeaders({
        Authorization: "{data}",
        "Content-Type": "application/json",
      }),
      responseType: "text" as "json",
    });
  }

  add_event(data: any): Observable<string> {
    let parm = {
      title: data.title,
      desc: data.desc,
    };

    /*     let EmprintAdmin = { 'fingerPrint': hashcode } */
    return this.http.post<string>(AppSettings.App_URL + "/events", parm, {
      headers: new HttpHeaders({
        Authorization: "{data}",
        "Content-Type": "application/json",
      }),
      responseType: "text" as "json",
    });
  }

  register(data: any): Observable<string> {
    let parm = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      username: data.username,
      password: data.password,
      repassword: data.repassword,
    };

    /*     let EmprintAdmin = { 'fingerPrint': hashcode } */
    return this.http
      .post<string>(AppSettings.App_URL + "/users", parm, {
        headers: new HttpHeaders({
          Authorization: "{data}",
          "Content-Type": "application/json",
        }),
        responseType: "text" as "json",
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes

          sessionStorage.setItem("auth-user", user);

          this.userSubject.next(this.tokenStorageService.getUser());
          return user;
        })
      );
  }

  findOneByUserNameAndpwd(data: any): Observable<string> {
    let parm = {
      username: data.username,
      password: data.password,
    };

    /*     let EmprintAdmin = { 'fingerPrint': hashcode } */
    return this.http
      .post<string>(AppSettings.App_URL + "/users/ByUserNameAndpwd", parm)
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes

          sessionStorage.setItem("auth-user", JSON.stringify(user[0]));

          this.userSubject.next(this.tokenStorageService.getUser());
          return user;
        })
      );
  }

  editerprofileimg(addform: any, iduser: String): Observable<string> {
    /*  {
			headers: new HttpHeaders({
				Authorization: '{data}',
				'Content-Type': 'application/json'
			}),
			responseType: 'text' as 'json'
		} */
    /*     let EmprintAdmin = { 'fingerPrint': hashcode } */
    return this.http.post<any>(
      AppSettings.App_URL + "/users/uploadphoto/" + iduser,
      addform
    );
  }

  editerprofile(data: any): Observable<string> {
    let parm = {
      email: data.email,
      name: data.name,
      username: data.username,
      password: data.password,
      phone: data.phone,
      address: data.address,
      description: data.description,
      twitter: data.twitter,
      instagram: data.instagram,
      facebook: data.facebook,
    };

    /*     let EmprintAdmin = { 'fingerPrint': hashcode } */
    return this.http.put<string>(
      AppSettings.App_URL + "/users/" + data.id,
      parm,
      {
        headers: new HttpHeaders({
          Authorization: "{data}",
          "Content-Type": "application/json",
        }),
        responseType: "text" as "json",
      }
    );
  }

  addvideo(data: any): Observable<string> {
    const userfromUsersessionStorage = this.tokenStorageService.getUser();
    let parm = {
      url: data.url,
      title: data.title,
      desc: data.desc,
      type: data.type,
      iduser: userfromUsersessionStorage.id,
    };

    /*     let EmprintAdmin = { 'fingerPrint': hashcode } */
    return this.http.post<string>(AppSettings.App_URL + "/videos", parm, {
      headers: new HttpHeaders({
        Authorization: "{data}",
        "Content-Type": "application/json",
      }),
      responseType: "text" as "json",
    });
  }
  GetUserBYid(id): Observable<User> {
    /*     return of({
      id: "1",
      urlphoto: "../../../../assets/img/p1.jpg",
      name: "Reynard Johnson",
      createdAt: "2020-01-30",
    }); */
    return this.http.get<User>(AppSettings.App_URL + "/users/" + id);
    //	 this._observable_User;
  }
  GetEventBYid(id): Observable<Events> {
    /*     return of({
      id: "1",
      urlphoto: "../../../../assets/img/p1.jpg",
      name: "Reynard Johnson",
      createdAt: "2020-01-30",
    }); */
    return this.http.get<Events>(AppSettings.App_URL + "/useeventsrs/" + id);
    //	 this._observable_User;
  }

  GetVideosBYiduser(id): Observable<videos[]> {
    return this.http.get<any>(AppSettings.App_URL + "/videos/by/user/" + id);
  }

  deletevideo(id) {
    return this.http.delete<any>(AppSettings.App_URL + "/videos/" + id);
  }
  Deleteuserbyid(id) {
    return this.http.delete<any>(AppSettings.App_URL + "/users/" + id);
  }
  Deleteventbyid(id) {
    return this.http.delete<any>(AppSettings.App_URL + "/events/" + id);
  }
  reqevent(msg, id) {
    return this.http.get<any>(
      AppSettings.App_URL + "/req-events/msg/" + msg + "/" + id
    );
  }

  GetVideos(): Observable<videos[]> {
    /* 		for (let index = 0; index < 10; index++) {
			this.add({
				url: 'http://www.youtube.com/embed/7lqXobo6eEA',
				title: 'title' + index,
				desc:
					'Imagine two musically talented beatboxers recreating and remixing each other???s song into one performance.  Check this one out!! Bigman and Gene???s latest remix piece ???BIGENE??? BEATBOX PLANET' +
					index
			});
		}
		return this._observableList; */
    return this.http.get<any>(AppSettings.App_URL + "/videos");
  }

  findAllAllUsers(): Observable<User[]> {
    /* 		for (let index = 0; index < 10; index++) {
			this.add({
				url: 'http://www.youtube.com/embed/7lqXobo6eEA',
				title: 'title' + index,
				desc:
					'Imagine two musically talented beatboxers recreating and remixing each other???s song into one performance.  Check this one out!! Bigman and Gene???s latest remix piece ???BIGENE??? BEATBOX PLANET' +
					index
			});
		}
		return this._observableList; */
    return this.http.get<any>(AppSettings.App_URL + "/users/info");
  }

  checkadmin() {
    return this.http.get<any>(AppSettings.App_URL + "/admin/login", {
      headers: new HttpHeaders({
        Authorization: "{data}",
        "Content-Type": "application/json",
      }),
      responseType: "text" as "json",
    });
  }
  checkfingeradmin() {
    return this.http.get<any>(AppSettings.App_URL + "/admin/checkfinger", {
      headers: new HttpHeaders({
        Authorization: "{data}",
        "Content-Type": "application/json",
      }),
      responseType: "text" as "json",
    });
  }
  insertEmployerAndEmpriente(data: any) {
    let role = "ROLE_EMPLOYER";
    if (data.roles != null) role = "ROLE_" + data.roles;
    let Userwithhashcode = {
      fingerPrint: data.finger,
      admin: {
        cin: data.cin,
        laboName: data.laboName,
        username: data.username,
        password: data.password,
        roles: [role],
        personne: {
          nom: data.name,
          prenom: data.lastName,

          tele: data.tele,
        },
      },
    };

    return this.http.post(
      AppSettings.App_URL + "/admin/insertEmployerAndEmpriente",
      Userwithhashcode,
      {
        headers: new HttpHeaders({
          Authorization: "{data}",
          "Content-Type": "application/json",
        }),
        responseType: "text",
      }
    );
    /* .pipe(catchError(this.errorHandler)); */
  }
  UpdateEmployerAndEmpriente(data: any, infomodal) {
    let role = "ROLE_EMPLOYER";
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
        roles: [role],
        personne: {
          id: infomodal.admin.personne.id,
          nom: data.name,
          prenom: data.lastName,
          tele: data.tele,
          adresse: infomodal.admin.personne.adresse,
        },
      },
    };

    return this.http.post(
      AppSettings.App_URL + "/admin/UpdateEmployerAndEmpriente",
      Userwithhashcode,
      {
        headers: new HttpHeaders({
          Authorization: "{data}",
          "Content-Type": "application/json",
        }),
        responseType: "text",
      }
    );
  }

  deleteuserbyid(id) {
    return this.http.get<any>(AppSettings.App_URL + "/admin/delete/" + id);
  }
}
