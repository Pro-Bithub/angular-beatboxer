import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../core/Services/login.service';

import { Admin } from '../../core/model/admin';
import { Observable, Subject, of } from 'rxjs';

import { catchError } from 'rxjs/operators';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	buttonDisabled: boolean = false;
	count: number = 0;
	private errorMessage: string;
	loginForm: FormGroup;

	submitted = false;
	loadingError$ = new Subject<boolean>();
	private hashcode: string;
	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private loginService: LoginService,
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
		console.log('this.loginForm.invalid');
		console.log(this.loginForm.invalid);
		// stop here if form is invalid
		if (this.loginForm.invalid) {
			return;
		}

		this.router.navigate([ '/my-profile' ]);
	}
	get f() {
		return this.loginForm.controls;
	}
}
