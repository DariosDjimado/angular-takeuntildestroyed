import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuoteComponent } from './quote/quote.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QuoteComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public showQuote = signal<boolean>(false);

  public toggleQuote(): void {
    this.showQuote.set(!this.showQuote());
  }
}
