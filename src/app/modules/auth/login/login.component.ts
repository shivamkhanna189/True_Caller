import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JwtService } from 'src/app/core/service/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public jwtService :JwtService,
    private router : Router,
    private renderer:Renderer2
    ) { }

  ngOnInit() {
    this.renderer.addClass(document.body,"login-body");
    this.createLoginForm();
  }
  public loginForm :FormGroup
  createLoginForm():void{ 
      this.loginForm = new FormGroup({
        username : new FormControl(),
        password : new FormControl()
      });
  }
  onSubmit(){
    this.jwtService.saveToken(this.loginForm.value.username);
    this.router.navigate(["/home"]);
  }

  /** Remove class from body dynamically */
  ngOnDestroy(){
    this.renderer.removeClass(document.body,"login-body");
  }

}
