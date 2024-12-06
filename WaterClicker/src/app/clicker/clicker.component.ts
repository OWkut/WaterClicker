import { CommonModule } from '@angular/common';
import { Component, Renderer2, OnInit } from '@angular/core';
import { CaptchaComponent } from '../captcha/captcha.component';

const Improvements = {
  Water: {
    autoClickers: [
      { id: 0, name: "Pipette", cost: 10, production: "0.1" },
      { id: 1, name: "Seau", cost: 500, production: "5" },
      { id: 2, name: "Plongeur", cost: 6000, production: "60" },
      { id: 3, name: "Gyres océaniques", cost: 15000, production: "150" },
      { id: 4, name: "Ferme à Plancton", cost: 50000, production: "500" },
      { id: 5, name: "Nutriments", cost: 86000, production: "860" },
      { id: 6, name: "Microbiome marin", cost: 186000, production: "1860" },
      { id: 7, name: "Épurateur", cost: 460000, production: "4600" },
      { id: 8, name: "Failles tectoniques", cost: 1870000, production: "18700" },
      { id: 9, name: "Régulation thermique de l’océan", cost: 9200000, production: "92000" },
      { id: 10, name: "Purificateur d'eau", cost: 320000, production: "320000" },
      { id: 11, name: "Navette supersonique", cost: 98500000, production: "985000" },
    ],
  },
  Blood: {
    autoClickers: [
      { id: 1, name: "Seringue", cost: 500, production: "5" },
      { id: 2, name: "Infirmier", cost: 600, production: "60" },
      { id: 3, name: "Centre de collecte", cost: 15000, production: "150" },
      { id: 4, name: "Purificateur d'air", cost: 50000, production: "500" },
      { id: 5, name: "Acides aminés", cost: 86000, production: "860" },
      { id: 6, name: "Microbiome intestinal", cost: 186000, production: "1860" },
      { id: 7, name: "Transfusion", cost: 460000, production: "4600" },
      { id: 8, name: "Articulations", cost: 18700, production: "18700" },
      { id: 9, name: "Régulation température corporelle", cost: 9200000, production: "92000" },
      { id: 10, name: "Cœur", cost: 32000000, production: "320000" },
      { id: 11, name: "Champ d'extermination zombie", cost: 98500000, production: "985000" },
    ],
  },
};

@Component({
  selector: 'app-clicker',
  standalone: true,
  imports: [CaptchaComponent, CommonModule],
  templateUrl: './clicker.component.html',
  styleUrls: ['./clicker.component.scss'],
})
export class ClickerComponent implements OnInit {
  imageSource = '../../assets/Images/eau.png';
  score: number = 0;
  gain_passif: number = 0;
  type: string = 'eau';
  autoClickers: { id: number; name: string; cost?: number; production: string; count?: number }[] = [];
  captchaValidate: boolean = false;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    document.body.classList.add('dark-mode');
    this.score = parseInt(localStorage.getItem('Gouttes') || '0', 10);
    this.updateAutoClickers();
    this.gain_passif = this.getAutoClickerProduction()

    setInterval(() => {
      this.addPassiveGain();
    }, 60000);
  }


  toggleImage(event: Event): void {
    this.type = (event.target as HTMLInputElement).checked ? 'sang' : 'eau';
    this.imageSource = `../../assets/Images/${this.type}.png`;
    this.updateAutoClickers();
    this.toggleTheme(event);
  }

  toggleTheme(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const rootElement = document.documentElement;

    if (isChecked) {
      rootElement.classList.add('red-theme');
    } else {
      rootElement.classList.remove('red-theme');
    }
  }

  updateAutoClickers(): void {
    const savedUpgrades = JSON.parse(localStorage.getItem('upgrades') || '[]');
    this.autoClickers =
      this.type === 'eau' ? Improvements.Water.autoClickers : Improvements.Blood.autoClickers;

    this.autoClickers.forEach((autoClicker) => {
      const matchingUpgrade = savedUpgrades.find((item: any) => item.id === autoClicker.id);
      autoClicker.count = matchingUpgrade ? matchingUpgrade.count : 0;
    });
  }

  increment(): void {
    this.score++;
    localStorage.setItem('Gouttes', this.score.toString());
  }

  addUpgrade(autoClicker: any): void {
    if (autoClicker.cost <= this.score) {
      this.score -= autoClicker.cost;
      const savedUpgrades = JSON.parse(localStorage.getItem('upgrades') || '[]');

      const existingUpgrade = savedUpgrades.find((item: any) => item.id === autoClicker.id);

      if (!existingUpgrade) {
        savedUpgrades.push({ id: autoClicker.id, name: autoClicker.name, count: 1 });
      } else {
        existingUpgrade.count += 1;
      }

      localStorage.setItem('upgrades', JSON.stringify(savedUpgrades));

      this.updateAutoClickers();
    }
  }

  generateImage(event: MouseEvent, value: number): void {
    const { clientX: x, clientY: y } = event;

    const newImage = this.createElement('img', `../../assets/Images/${this.type}2.png`, x, y);

    const valueText = this.createElement('p', `+${value}`, x, y - 30, true);

    const imageContainer = document.getElementById('image-container');
    if (imageContainer) {
      this.renderer.appendChild(imageContainer, newImage);
      this.renderer.appendChild(imageContainer, valueText);

      this.animateElement(newImage, imageContainer, 500);

      this.fadeOutElement(valueText, imageContainer, 500);
    }
  }

  private createElement(
    tag: string,
    content: string,
    x: number,
    y: number,
    isText: boolean = false
  ): HTMLElement {
    const element = this.renderer.createElement(tag);

    if (isText) {
      this.renderer.appendChild(element, this.renderer.createText(content));
      this.renderer.addClass(element, 'generated-text');
    } else {
      this.renderer.setAttribute(element, 'src', content);
      this.renderer.addClass(element, 'generated-image');
    }

    this.renderer.setStyle(element, 'position', 'absolute');
    this.renderer.setStyle(element, 'top', `${y}px`);
    this.renderer.setStyle(element, 'left', `${x}px`);
    this.renderer.setStyle(element, 'transform', 'translate(-50%, -50%)');
    return element;
  }

  private animateElement(element: HTMLElement, container: HTMLElement, duration: number): void {
    let currentY = parseInt(window.getComputedStyle(element).top, 10);

    const interval = setInterval(() => {
      currentY += 2;
      this.renderer.setStyle(element, 'top', `${currentY}px`);
    }, 20);

    setTimeout(() => {
      clearInterval(interval);
      this.renderer.removeChild(container, element);
    }, duration);
  }

  private fadeOutElement(element: HTMLElement, container: HTMLElement, duration: number): void {
    setTimeout(() => {
      this.renderer.setStyle(element, 'opacity', '0');
      setTimeout(() => this.renderer.removeChild(container, element), 300);
    }, duration);
  }

  getAutoClickerProduction(): number {
    const savedUpgrades = JSON.parse(localStorage.getItem('upgrades') || '[]');
    console.log('Saved Upgrades:', savedUpgrades);

    let totalProduction = 0;

    for (const upgrade of savedUpgrades) {
      const autoClicker = this.autoClickers.find((item) => item.id === upgrade.id);
      console.log(autoClicker, "AUTO CLICKER")
      if (autoClicker) {
        const production = parseFloat(autoClicker.production) || 0;
        const count = upgrade.count || 0;
        totalProduction += production * count;
      }
    }

    return totalProduction;
  }

  addPassiveGain(): void {
    console.log(this.gain_passif)
    this.score += this.gain_passif;
    localStorage.setItem('Gouttes', this.score.toString());
  }
}


