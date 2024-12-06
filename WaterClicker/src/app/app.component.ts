import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'WaterClicker';
  torch: HTMLElement | null = null;
  ngOnInit(): void {
    this.torch = document.createElement('div');
    this.torch.classList.add('torch');
    this.torch.classList.toggle('dark-mode', true);
    document.body.appendChild(this.torch);
    document.body.classList.add('dark-mode')
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent): void {
    if (this.torch) {
      this.torch.style.left = `${event.pageX}px`;
      this.torch.style.top = `${event.pageY}px`;
    }
    document.body.classList.add('light-area');
  }


}
