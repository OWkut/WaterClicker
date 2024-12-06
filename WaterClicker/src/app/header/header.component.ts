import { DOCUMENT } from '@angular/common';
import { Component, OnInit, HostListener, Renderer2, Inject } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showSubmenu: boolean = false;
  selectedOption: string = 'Francais'; 
  fontFamily: string = 'minecraft';

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) { }
  torch: HTMLElement | null = null;

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

  toggleSubmenu(): void {
    this.showSubmenu = !this.showSubmenu;
  }

  changeFont(font: string): void {
    document.body.style.fontFamily = font; 
    this.selectedOption = font; 
    this.showSubmenu = false;
  }
  
}
