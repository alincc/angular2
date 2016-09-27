import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../shared';
import {
  Router
} from '@angular/router';

@Component({

  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    require('./dashboard.component.scss')
  ],
  encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {
  isHideSidebar: boolean = false;

  constructor(private router: Router,
              private authService: AuthService) {

  }

  ngOnInit() {

  }

  logout() {
    this.authService.logout().then(data => {
      this.router.navigate(['/login']);
    });
  }

  toggleSidebar() {
    this.isHideSidebar = !this.isHideSidebar;
  }

  redirect()
  {
    this.isHideSidebar = false;
  }
}
