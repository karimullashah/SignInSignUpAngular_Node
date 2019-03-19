import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { FormGroup,FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  

  constructor(private authService : AuthService){}
  
  ngOnInit(){
    
  }
  
  onLogin() {
    console.log(this.loginForm.value);
    const data = this.loginForm.value;
    this.authService.login(data.email,data.password);
  }


 
}
