import { Component } from '@angular/core';
import { ClickerComponent } from '../clicker/clicker.component';
import { HeaderComponent } from '../header/header.component';
import { CaptchaComponent } from '../captcha/captcha.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ClickerComponent,HeaderComponent, CaptchaComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  captchaValidate: boolean = false;

  receiveFromCaptcha(captcha: boolean) {
    this.captchaValidate = captcha;
    console.log('Variable reçue dans HomeComponent:', this.captchaValidate);
  }
}
