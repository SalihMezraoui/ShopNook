import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-only-members-page',
  templateUrl: './only-members-page.component.html',
  styleUrls: ['./only-members-page.component.css']
})
export class OnlyMembersPageComponent implements OnInit {

  isUserAuthenticated: boolean = false;
  fullNameOfUser: string = '';

  constructor(private oktaAuthStateService: OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  ngOnInit(): void {
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

          // get the email of the user from the login
          const theEmail = res.email;

          // save the email in the browser session storage
          // this.storage.setItem('userEmail', JSON.stringify(theEmail));

        }
      );
    }
  }

}
