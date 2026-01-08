import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <header class="app-header">
      <h1>Taskify</h1>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .app-header {
      background-color: #1976d2;
      padding: 16px;
      text-align: center;
    }

    .app-header h1 {
      color: white;
      margin: 0;
      font-size: 24px;
      font-weight: 500;
    }

    main {
      padding: 16px;
    }
  `]
})
export class App {
  protected readonly title = signal('Taskify');
}
