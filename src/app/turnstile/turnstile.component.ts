import { Component, ElementRef, Inject, NgZone, OnInit , ViewChild} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserForm } from '../interface/UserForm';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';
import { SiteVerifyRequest } from '../interface/SiteVerifyReq';
import { CaptchaService } from '../services/captcha.service';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { DOCUMENT } from '@angular/common';

declare global {
  interface Window {
    onloadTurnstileCallback: () => void;
    turnstile:any
  }
}

const SCRIPT_ID = 'id-turnstile';  
const CALLBACK_NAME = 'onloadTurnstileCallback';


let components = [
  ReactiveFormsModule, 
  MatButtonModule, 
  MatCardModule, 
  MatFormFieldModule, 
  MatInputModule,
  MatToolbarModule,
  MatIcon
]


@Component({
  selector: 'app-turnstile',
  imports: [...components],
  templateUrl: './turnstile.component.html',
  styleUrl: './turnstile.component.scss'
})
export class TurnstileComponent implements OnInit {

  formTurnstile: FormGroup<UserForm> = new FormGroup<UserForm>(
    {
      dni: new FormControl('', 
        {
          validators: [Validators.minLength(7), Validators.maxLength(10), Validators.required],
          updateOn: 'blur'
        }
      )
    }
  );


  urlHome: string;
  siteKeyTurnstile!: string;
  validCaptcha: boolean = false;
  @ViewChild('captcha') idTurnstile!: ElementRef;


  constructor(  
    private snackBar: MatSnackBar,
    private captchaService: CaptchaService,
    @Inject(DOCUMENT) private document: Document,
    private zone: NgZone,
  ){
    this.urlHome = environment.urlHome;
    this.siteKeyTurnstile = environment.turnstile.siteKey;
  }


  ngOnInit(): void {

    this.loadTurntileScript();
  
  }





  submit(){

    
    if (this.validCaptcha){

      this.snackBar.open('Se enviara datos a backed .... por implementar .','Info')
    }

    else {

      this.snackBar.open('No es un acceso valido.','Alert')

    }



  }



  loadTurntileScript(){


    window[CALLBACK_NAME] = ()  => {

      window.turnstile.render('#captcha', {
        sitekey: `${environment.turnstile.siteKey}`,
        callback: (token:string) => {

          this.zone.run(()=>{
            if (token){
      
              let req: SiteVerifyRequest = {} as SiteVerifyRequest;
              req.secret = environment.turnstile.siteKey;
              req.response = token;
  
              this.captchaService.validateTurnstile(req)
              .subscribe(
                {
                  next:(val: { success: any; })=>{
  
                      if (val.success){

                        this.validCaptcha = true;

                        this.snackBar.open('Se valido captcha.','Info')
                      }
                      else {
                        this.snackBar.open('Error de captcha.','Error')
                      }
                  },
                  error:(error: any)=>{
                    this.snackBar.open('Error desconocido de captcha.','Error')
                  }
                })
              
            }
          })

        },
      });
    }

    const script = document.createElement("script");
    script.src = `https://challenges.cloudflare.com/turnstile/v0/api.js?onload=${CALLBACK_NAME}`;
    script.id = SCRIPT_ID;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);



  }


  //Get el control DNI del form
  get dni(){
    return this.formTurnstile.get('dni')
  }


  openLink(){
    this.document.location.href = this.urlHome;
  }


  get checkForm(){
    return this.validCaptcha && this.formTurnstile.valid
  }



}
