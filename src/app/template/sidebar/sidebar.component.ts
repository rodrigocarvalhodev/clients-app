import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user!: string

  constructor(
    private authService: AuthService
  ) { }
  
  ngOnInit(): void {
    this.user = this.authService.getUserAuthenticated()
  }

  logout() {
    this.authService.endSession()
  }
}
