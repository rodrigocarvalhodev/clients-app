import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from './User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username!: string
  password!: string
  loginError!: boolean
  signingUp!: boolean
  registerSuccessMessage!: string
  errors!: String[] 
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  onSubmit() {
    this.authService.requestLogin(this.username, this.password)
              .subscribe(response => {
                const access_token = JSON.stringify(response)
                localStorage.setItem("access_token", access_token)
                this.errors = []
                console.log(response)
                this.router.navigate(['/home'])
              }, errorResponse => {
                this.errors = ['Usuário e/ou senha incorretos.']
              });
  }

  register() {
    const user: User = new User()
    user.username = this.username
    user.password = this.password
    this.authService.register(user)
            .subscribe(response => {
              this.errors = []
              this.registerSuccessMessage = "Cadastro realizado com sucesso! Efetue o login."
              this.signingUp = false
              this.username = ''
              this.password = ''
            }, errorResponse => {
              this.errors = errorResponse.error.errors
              this.registerSuccessMessage = ''
            })
  }

  prepareSigning(event: { preventDefault: () => void; }) {
    event.preventDefault()
    this.signingUp = true
  }

  cancelSigning(event: { preventDefault: () => void; }) {
    event.preventDefault()
    this.signingUp = false
    this.registerSuccessMessage = ''
    this.username = ''
    this.password = ''
  }
}