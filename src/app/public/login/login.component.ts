import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../core/Services/login.service';

import { Admin } from '../../core/model/admin';
import { Observable, Subject, of } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Notify } from 'src/app/core/model/notify';
import { AdminService } from 'src/app/core/Services';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	buttonDisabled: boolean = false;
	count: number = 0;
	notify: Notify = null;
	private errorMessage: string;
	loginForm: FormGroup;
	private checkObs$: Observable<string>;
	submitted = false;
	loadingError$ = new Subject<boolean>();
	private hashcode: string;
	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private adminService: AdminService,
		private titleService: Title
	) {
		this.titleService.setTitle('Beatbox - Login');
	}

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			username: [ , Validators.required ],
			password: [ , Validators.required ]
		});
	}

	login() {
		this.submitted = true;
		this.errorMessage = '';
		console.log('this.loginForm.invalid');
		console.log(this.loginForm.invalid);
		if (this.loginForm.invalid) {
			this.errorMessage = 'Login et / ou mot de passe est incorrecte';
			return;
		}
		this.checkObs$ = this.adminService.findOneByUserNameAndpwd(this.loginForm.value);
		this.checkObs$.subscribe(
			(rep) => {
				this.loginForm.reset();
				console.log('rep');
				console.log(rep);
				sessionStorage.setItem('auth-user', rep);
				this.router.navigate([ '/my-profile' ]);
			},
			(error) => {
				console.log(error);
				this.notify = { type: 'danger', message: error.error };
			}
		);

		this.router.navigate([ '/profile-Employser' ]);

		/* let admin: Admin;
		admin = new Admin();
		admin.fingerprintAdmin = this.loginForm.controls.login.value;
		this.loginService.login(admin).pipe().subscribe(
			(data) => {
				if (this.checkadminbynumber(data) == null) {
					this.router.navigate(['/']);
				} else {
					this.router.navigate(['/home']);
				}

				
			},
			(error) => {
				this.errorMessage = 'Login et / ou mot de passe est incorrecte';
			}
		); */
	}

	onSubmit() {
		this.submitted = true;
		this.errorMessage = '';
		console.log('this.loginForm.invalid');
		console.log(this.loginForm.invalid);
		if (this.loginForm.invalid) {
			this.errorMessage = 'Login et / ou mot de passe est incorrecte';
			return;
		}
		this.checkObs$ = this.adminService.findOneByUserNameAndpwd(this.loginForm.value);
		this.checkObs$.subscribe(
			(rep) => {
				if (rep != null && rep.length > 0) {
					this.loginForm.reset();
					console.log('rep');
					console.log(rep);
					/*  */
					if (rep[0]['username'] != undefined && rep[0]['username'] != null) {
						if (rep[0]['username'] == 'admin') {
							this.router.navigate([ '/dashbord' ]);
						} else {
							this.router.navigate([ '/my-profile' ]);
						}
					}
					sessionStorage.setItem('auth-user', JSON.stringify(rep[0]));
				} else {
					this.notify = { type: 'danger', message: 'username or password incorrect !' };
				}
			},
			(error) => {
				console.log(error);
				this.notify = { type: 'danger', message: error.error };
			}
		);

		/* let admin: Admin;
		admin = new Admin();
		admin.fingerprintAdmin = this.loginForm.controls.login.value;
		this.loginService.login(admin).pipe().subscribe(
			(data) => {
				if (this.checkadminbynumber(data) == null) {
					this.router.navigate(['/']);
				} else {
					this.router.navigate(['/home']);
				}

				
			},
			(error) => {
				this.errorMessage = 'Login et / ou mot de passe est incorrecte';
			}
		); */
	}
	get f() {
		return this.loginForm.controls;
	}
}
