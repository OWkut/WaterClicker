import { Component, Renderer2, OnInit } from '@angular/core';

const Improvements = {
  Water: {
    upgrades: [
      { id: 1, name: "Augmentation des courants marins", cost: 400, effect: "+20% prod [Auto-Clicker]", repeatable: 5 },
      { id: 2, name: "Agriculture", cost: 13400, effect: "Débloque les fermes et le centre de collecte, -20% prod [Auto-Clicker]" },
      { id: 3, name: "Densité de l'eau", cost: 429050, effect: "+50% prod [Auto-Clicker], +20% prod [Click]", repeatable: 4 },
      { id: 4, name: "Centre d'épuration", cost: 764000, effect: "Débloque l'épurateur" },
      { id: 5, name: "Plancton", cost: 2485000, effect: "+15% prod [Auto-Clicker], Débloque le purificateur d'eau" },
      { id: 6, name: "Voyage vers Encelade", cost: 800000900, effect: "Débloque navette supersonique" },
      { id: 7, name: "Restauration après une marée noire", cost: 32850045000, effect: "+60% prod [Auto-Clicker], +30% prod [Click]", repeatable: 3 },
      { id: 8, name: "Nettoyage des océans", cost: 187548000000, effect: "+80% prod [Click + Prod]", repeatable: 2 },
      { id: 9, name: "Eau pure", cost: 545000000000, effect: "+110% d'eau [Click + Prod]" },
      { id: 10, name: "Droit de l'eau", cost: 85457000000000, effect: "Permet de débloquer 'Corps Parfait'" },
      { id: 11, name: "Équilibre", cost: 999999999999999999999, effect: "+infini [Click + Prod]" }
    ],
    autoClickers: [
      { id: 0, name: "Pipette", production: "+0.1 eau /min" },
      { id: 1, name: "Saut", production: "+5 eau /min" },
      { id: 2, name: "Plongeur", production: "+60 eau /min" },
      { id: 3, name: "Gyres océaniques", production: "+150 eau /min" },
      { id: 4, name: "Ferme à Plancton", production: "+500 eau /min" },
      { id: 5, name: "Nutriments", production: "+860 eau /min" },
      { id: 6, name: "Microbiome marin", production: "+1860 eau /min" },
      { id: 7, name: "Épurateur", cost: "-100 sang /min", production: "+4600 eau /min" },
      { id: 8, name: "Failles tectoniques", production: "+18700 eau /min" },
      { id: 9, name: "Régulation thermique de l’océan", production: "+92000 eau /min" },
      { id: 10, name: "Purificateur d'eau", production: "+320000 eau /min" },
      { id: 11, name: "Navette supersonique", production: "+985000 eau /min" }
    ]
  },
  Blood: {
    upgrades: [
      { id: 1, name: "Augmentation de la circulation sanguine", cost: 950, effect: "+20% prod [Click]", repeatable: 5 },
      { id: 2, name: "Vitamine", cost: 80000, effect: "+1200 /min, Débloque le purificateur d'air" },
      { id: 3, name: "Résistance de la peau", cost: 240000, effect: "+20% prod [Auto-Clicker], +50% prod [Click]", repeatable: 5 },
      { id: 4, name: "Expérience interdite", cost: 1200000, effect: "Débloque la transfusion" },
      { id: 5, name: "Eco-Agriculture", cost: 58000000, effect: "Supprime le malus d'Agriculture, +10% prod [Auto-Clicker]" },
      { id: 6, name: "Exo-squelette", cost: 286000000, effect: "Débloque champ d'extermination de zombie" },
      { id: 7, name: "Cicatrisation des plaies", cost: 7258000000, effect: "+60% prod [Click], +30% prod [Auto-Clicker]", repeatable: 4 },
      { id: 8, name: "Optimisation du corps", cost: 86753000000, effect: "+80% de sang [Click + Prod]", repeatable: 2 },
      { id: 9, name: "Corps parfait", cost: 980000000000, effect: "+110% de sang [Click + Prod]" },
      { id: 10, name: "Humain aquatique", cost: 60980000000000, effect: "Débloque 'Équilibre'" },
      { id: 11, name: "Équilibre", cost: 999999999999999999999, effect: "+infini [Click + Prod]" }
    ],
    autoClickers: [
      { id: 1, name: "Seringue", production: "+5 sang /min" },
      { id: 2, name: "Infirmier", production: "+60 sang /min" },
      { id: 3, name: "Centre de collecte", production: "+150 sang /min" },
      { id: 4, name: "Purificateur d'air", production: "+500 sang /min" },
      { id: 5, name: "Acides aminés", production: "+860 sang /min" },
      { id: 6, name: "Microbiome intestinal", production: "+1860 sang /min" },
      { id: 7, name: "Transfusion", cost: "-100 eau /min", production: "+4600 sang /min" },
      { id: 8, name: "Articulations", production: "+18700 sang /min" },
      { id: 9, name: "Régulation température corporelle", production: "+92000 eau /min" },
      { id: 10, name: "Cœur", production: "+320000 eau /min" },
      { id: 11, name: "Champ d'extermination zombie", production: "+985000 eau /min" }
    ]
  }
};

@Component({
  selector: 'app-clicker',
  standalone: true,
  imports: [],
  templateUrl: './clicker.component.html',
  styleUrls: ['./clicker.component.scss']
})
export class ClickerComponent implements OnInit {
  imageSource = '../../assets/Images/eau.png';
  score: number = 0;
  type: string = 'eau';
  autoClickers: { id: number; name: string; production: string; cost?: string }[] = [];

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    document.body.classList.add('dark-mode');
    this.score = parseInt(localStorage.getItem('Gouttes') || '0', 10);
    this.updateAutoClickers();
  }

  toggleImage(event: Event): void {
    this.type = (event.target as HTMLInputElement).checked ? 'sang' : 'eau';
    this.imageSource = `../../assets/Images/${this.type}.png`;
    this.updateAutoClickers();
  }

  updateAutoClickers(): void {
    this.autoClickers = this.type === 'eau' ? Improvements.Water.autoClickers : Improvements.Blood.autoClickers;
  }

  increment(): void {
    this.score++;
    localStorage.setItem('Gouttes', this.score.toString());
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
}

