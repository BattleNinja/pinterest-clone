import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
      'password2': new FormControl(null, [Validators.required])
    });
  }

  onRegister() {
    const user = {
      'name': this.registerForm.value.name,
      'email': this.registerForm.value.email,
      'username': this.registerForm.value.username,
      'password': this.registerForm.value.password,
      'password2': this.registerForm.value.password2
    };
    this.authService.registerUser(user).subscribe((res) => {
      console.log(res);
      if (res.success) {
        this.router.navigate(['login']);
      } else {
        this.registerForm.reset();
      }

    });

  }

}
