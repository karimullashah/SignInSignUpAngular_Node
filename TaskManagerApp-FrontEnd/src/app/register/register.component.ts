import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { FormGroup,FormControl } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signupForm = new FormGroup({
    name  :new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    age : new FormControl('')
  });
  constructor(private authService : AuthService) { }

  ngOnInit() {
  }

  onRegister(){
    console.log(this.signupForm.value)
    const data = this.signupForm.value
    this.authService.signUp(data)
  }
}
