import { Component, EventEmitter, Output } from '@angular/core';
import { DemineurComponent } from '../demineur/demineur.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [DemineurComponent, CommonModule],
  templateUrl: './captcha.component.html',
  styleUrl: './captcha.component.scss'
})
export class CaptchaComponent {
  isVisible = false;
  gameStatus: string = '';

  @Output() action = new EventEmitter<void>();
  @Output() gameVictory = new EventEmitter<boolean>();

  onGameResult(result: any) {
      this.gameVictory.emit(result);
  }

  openPopup(): void {
    this.isVisible = true;
  }

  closePopup(): void {
    this.isVisible = false;
  }

  onAction(): void {
    this.action.emit();
    this.closePopup();
  }

  isCaptchaValid(): boolean {
    return localStorage.getItem('captchaValidated') === 'true';
  }

  onSubmit(): void {
    alert('Formulaire soumis !');
    
  }
}
