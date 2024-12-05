import { Component, Renderer2, OnInit } from '@angular/core';

@Component({
  selector: 'app-clicker',
  standalone: true,
  imports: [],
  templateUrl: './clicker.component.html',
  styleUrl: './clicker.component.scss'
})
export class ClickerComponent implements OnInit {
  imageSource = '../../assets/Images/eau.png';
  score: number = 0;
  type: string = 'eau';

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.score = parseInt(localStorage.getItem('Gouttes') || '0', 10);
  }

  toggleImage(event: Event): void {
    this.type = (event.target as HTMLInputElement).checked ? 'sang' : 'eau';
    this.imageSource = `../../assets/Images/${this.type}.png`;
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

