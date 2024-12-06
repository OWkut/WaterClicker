import { Component } from '@angular/core';
import { ClickerComponent } from '../clicker/clicker.component';
import { HeaderComponent } from '../header/header.component';
import { CaptchaComponent } from '../captcha/captcha.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ClickerComponent,HeaderComponent, CaptchaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
