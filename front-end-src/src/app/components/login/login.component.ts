import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }

  onLogin() {
    // console.log(this.loginForm.value);
    const user = {
      'email': this.loginForm.value.email,
      'password': this.loginForm.value.password
    };
    this.authService.loginUser(user).subscribe(
      (success) => {
        if (success) {
          this.router.navigate(['']);
        } else {
          this.loginForm.reset();
        }
      }
    );
  }

}
