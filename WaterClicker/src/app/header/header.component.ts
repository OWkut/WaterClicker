import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showSubmenu: boolean = false;
  selectedOption: string = 'Francais'; // Valeur par défaut
  fontFamily: string = 'sans-serif'; // Police par défaut

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
      torch.classList.toggle('dark-mode', !isDarkMode); // Synchronisation
    }
  }

  toggleSubmenu(): void {
    this.showSubmenu = !this.showSubmenu;
  }

  selectOption(option: string, font: string): void {
    this.selectedOption = option;
    this.fontFamily = font;
    this.applyFontFamily(); // Appliquer la nouvelle police
    this.showSubmenu = false; // Masquer le sous-menu après sélection
  }

  applyFontFamily(): void {
    this.renderer.setStyle(this.document.body, 'font-family', this.fontFamily);
  }
}
