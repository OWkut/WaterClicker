import { Component,OnInit,HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showSubmenu: boolean = false;
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
        torch.classList.toggle('dark-mode', !isDarkMode); // Synchronisation
    }
  }

  toggleSubmenu(): void {
    this.showSubmenu = !this.showSubmenu;
  }
}
