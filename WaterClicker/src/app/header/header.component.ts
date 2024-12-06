import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, OnInit, HostListener, Renderer2, Inject } from '@angular/core';
import { CaptchaComponent } from '../captcha/captcha.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, CaptchaComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showSubmenu: boolean = false;
  selectedOption: string = 'Francais';
  fontFamily: string = 'minecraft';
  imageSource: string = '../../assets/lune.png';
  etatBtn: string = "lune";
  captchaValidate: boolean = false;

  constructor(
    private renderer: Renderer2,
  ) { }
  torch: HTMLElement | null = null;

  toggleImage(): void {
    if (this.etatBtn == "lune") {
      this.imageSource = "../../assets/soleil.png";
      this.etatBtn = "soleil"
    } else {
      this.etatBtn = "lune"
      this.imageSource = "../../assets/lune.png";
    }
  }

  toggleTheme(): void {
    const isDarkMode = document.body.classList.contains('dark-mode');
    if (isDarkMode) {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    }

    const torch = document.querySelector('.torch');
    if (torch) {
      torch.classList.toggle('dark-mode', !isDarkMode);
    }
  }

  receiveFromCaptcha(captcha: boolean) {
    this.captchaValidate = captcha;
    console.log('Variable reçue dans HomeComponent:', this.captchaValidate);
  }

  toggleSubmenu(): void {
    this.showSubmenu = !this.showSubmenu;
  }

  changeFont(font: string): void {
    document.body.style.fontFamily = font;
    this.selectedOption = font;
    this.showSubmenu = false;
  }

}
