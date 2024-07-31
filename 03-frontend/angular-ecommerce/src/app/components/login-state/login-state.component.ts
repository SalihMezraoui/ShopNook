import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-state',
  templateUrl: './login-state.component.html',
  styleUrls: ['./login-state.component.css']
})
export class LoginStateComponent implements OnInit {

  isUserAuthenticated: boolean = false;
  fullNameOfUser: string = '';

  constructor(private oktaAuthStateService: OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  ngOnInit(): void
  {
    this.oktaAuthStateService.authState$.subscribe(
     (result) => {
        this.isUserAuthenticated = result.isAuthenticated!;
        this.getUserInfos();
      }
    );
  }

  getUserInfos() {
    if (this.isUserAuthenticated) {
      // Retrieve the details of the currently logged-in user (user's claims)

      // The full name of the user is accessible via a property name

      this.oktaAuth.getUser().then(
        (res) => {
          this.fullNameOfUser = res.name as string;
        }
      );
    }
  }

  logout() 
  {
    // Logs out from Okta and clears the existing tokens.
    this.oktaAuth.signOut();
  }

}
