import { Component } from '@angular/core';
import { DemineurComponent } from '../demineur/demineur.component';


@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [DemineurComponent],
  templateUrl: './captcha.component.html',
  styleUrl: './captcha.component.scss'
})
export class CaptchaComponent {
  isCaptchaValid(): boolean {
    return localStorage.getItem('captchaValidated') === 'true';
  }

  onSubmit(): void {
    alert('Formulaire soumis !');
    
  }
}
