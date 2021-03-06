import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any = {};
  hide:boolean=true;
  constructor(
    public api : ApiService,
    public router :Router,
    public auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
  }

  email = new FormControl('',[Validators.required, Validators.email]);
  password= new FormControl('',[Validators.required]);
 
  loading!: boolean;
  login(user: any)
  {
    this.loading=true;
    this.auth.signInWithEmailAndPassword(user.email, user.password).then(res=>{
      this.loading=false;
      this.router.navigate(['admin/product']);
    }).catch(err=>{
      this.loading=false;
      alert('Anda Tidak dapat login');
    })
  }

}

