import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './login/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = environment.apiURL + '/api/users'
  tokenUrl: string = environment.apiURL + environment.getTokenUrl
  clientId: string = environment.clientId
  clientSecret: string = environment.clientSecret
  jwtHelper: JwtHelperService = new JwtHelperService()

  constructor(
    private httpClient: HttpClient
  ) { }

  getToken() {
    const tokenString =localStorage.getItem('access_token')
    if (tokenString) {
      const token = JSON.parse(tokenString)
      const jwt = token.access_token
      return jwt
    }
    return null
  }

  isAuthenticated(): boolean {
    const token = this.getToken()
    if (token) {
      const expirated = this.jwtHelper.isTokenExpired(token)
      if (expirated) {
        this.endSession()
      }
      return !expirated
    }
    return false
  }

  requestLogin(username: string, password: string): Observable<any> {
    const params = new HttpParams()
                    .set('username', username)
                    .set('password', password)
                    .set('grant_type', 'password')
    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.httpClient.post<any>(this.tokenUrl, params.toString(), {headers})
  }

  endSession() {
    localStorage.removeItem('access_token')
  }

  getUserAuthenticated(): string {
    const token = this.getToken()
    if (token) {
      const tokenDecode = this.jwtHelper.decodeToken(token)
      return tokenDecode.user_name
    }
    return ''
  }

  register(user: User): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl, user)
  }

}