import { Token } from './../../model/seguranca/token';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AutentificacaoService {
  //public url: string = 'http://localhost:8080';
  //public url: string = 'http://192.168.0.107:8080';
  //public url: string = 'https://sigobra-mt.herokuapp.com';
  //public url: string = 'https://sigobra-teste.herokuapp.com';
  public url: string = 'http://186.192.115.33:8080'; // martins rodrigues ip
  urlToken: string = '/oauth/token';
  token: Token;
  deveAtualizarSenha: boolean = false;
  tokenDecode: any;
  //mobile
  constructor(private http: HttpClient) { }

  getNewTokenRegisto() {
    // https://guardsman.herokuapp.com this.getFormData('robertnegueba12@gmail.com', '1')
    return this.http.post(this.url + this.urlToken, this.getBodyToken('admin', '1'),
      this.getOptionsToken());
  }



  public getHeaderToken() {
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic YW5ndWxhcjphbmd1bGFy'
    });
  }

  public getHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token.token_type + ' ' + this.token.access_token
    });
  }

  public getHeaderPDF() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      //Accept: 'application/pdf',
      'Authorization': this.token.token_type + ' ' + this.token.access_token
    });
  }

  public getOptionsToken() {
    const httpOptions = {
      headers: this.getHeaderToken()
    };
    return httpOptions;
  }

  public getOptions() {
    const httpOptions = {
      headers: this.getHeader()
    };
    return httpOptions;
  }

  public getOptionsPDF() {
    const httpOptions = {
      headers: this.getHeaderPDF(),
      responseType: 'blob' as 'json'
    };
    return httpOptions;
  }

  public getBodyToken(user: string, password: string) {
    const data: string = 'client=angular&username=' + user + '&password=' + password + '&grant_type=password&scoper=white';
    return data;
  }
  getOptionsGet() {
    const options = {
      headers: this.getHeader(),
      responseType: "json"
    };
    return options;
  }
  public getFormData(user: string, password: string) {
    //client=angular2&username=robertnegueba12@gmail.com&password=1&grant_type=password&scoper=white'
    const formData = new FormData();
    formData.append('Content-Type', 'application/x-www-form-urlencoded');
    formData.append('Authorization', 'Basic YW5ndWxhcjphbmd1bGFy');
    formData.append('client', 'angular');
    formData.append('username', user);
    formData.append('password', password);
    formData.append('grant_type', 'password');
    formData.append('scoper', 'white');
    return formData;
  }

  public getParamToken(user: string, password: string) {
    return new HttpParams({
      fromObject: {
        grant_type: 'password',
        username: user,
        password: password,
        scope: 'white',
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.token = null;
  }



}
