import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-clicker',
  standalone: true,
  imports: [],
  templateUrl: './clicker.component.html',
  styleUrl: './clicker.component.scss'
})
export class ClickerComponent {
  imageSource = '../../assets/Images/eau.png';

  toggleImage(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    this.imageSource = isChecked
      ? '../../assets/Images/sang.png'
      : '../../assets/Images/eau.png';
  }

  constructor(private renderer: Renderer2) { }

  generateImage(event: MouseEvent): void {
    const x = event.clientX;
    const y = event.clientY;

    const newImage = this.renderer.createElement('img');
    this.renderer.setAttribute(newImage, 'src', '../../assets/Images/eau.png');
    this.renderer.setStyle(newImage, 'position', 'absolute');
    this.renderer.setStyle(newImage, 'width', '20px');
    this.renderer.setStyle(newImage, 'height', '20px');
    this.renderer.setStyle(newImage, 'top', `${y}px`);
    this.renderer.setStyle(newImage, 'left', `${x}px`);
    this.renderer.setStyle(newImage, 'transform', 'translate(-50%, -50%)');
    this.renderer.setStyle(newImage, 'z-index', '999');
    this.renderer.setStyle(newImage, 'opacity', '0.8');

    const imageContainer = document.getElementById('image-container');
    if (imageContainer) {
      this.renderer.appendChild(imageContainer, newImage);

      let currentY = y;
      const interval = setInterval(() => {
        currentY += 2;
        this.renderer.setStyle(newImage, 'top', `${currentY}px`);
      }, 20);
      setTimeout(() => {
        this.renderer.removeChild(imageContainer, newImage);
      }, 500);
    }
  }
}


