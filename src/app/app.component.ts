import { Component, OnInit, ViewChild, AfterViewInit, HostListener, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import {ContactComponent} from './contact/contact.component';
import {AdminloginComponent} from './adminlogin/adminlogin.component';
import {Router} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {UserloginComponent} from './userlogin/userlogin.component';
import {SharedService} from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isContactVisible: boolean;
  isLoginVisible: boolean;
  disableMenu: boolean;

  constructor(private dialog: MatDialog, private router: Router, private sharedService: SharedService) {
    this.sharedService.disableService.subscribe(value => {
      if (value === true) {
        this.disableMenu = true;
      } else {
        this.disableMenu = false;
      }
    });
  }

  ngOnInit() {
    const mainNav = document.getElementById('js-menu');
    const navBarToggle = document.getElementById('js-navbar-toggle');
    navBarToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });

  }

  openModal() {
    this.isContactVisible = true;
    const dialogRef = this.dialog.open(ContactComponent, {hasBackdrop: false});
    dialogRef.afterClosed().subscribe(result => {
      this.isContactVisible = false;
    });
  }

  openAdminLogin() {
    this.isLoginVisible = true;
    const dialogRef = this.dialog.open(AdminloginComponent, {hasBackdrop: false});
    dialogRef.afterClosed().subscribe(result => {
      this.isLoginVisible = false;
    });
  }

  openUserLogin() {
    const dialogRef = this.dialog.open(UserloginComponent, {hasBackdrop: false});
    dialogRef.afterClosed().subscribe(result => {
      this.isLoginVisible = false;
    });
  }

  navigation(page) {
    if (page === 'home') {
      this.router.navigate(['home']);
    } else if (page === 'online') {
      this.router.navigate(['online-bestellen']);
    }
  }

}

