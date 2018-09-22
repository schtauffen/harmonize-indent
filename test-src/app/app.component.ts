import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <ul>
        <li *ngFor="let message of mail.messages">
          {{message.value}}
        </li>
      </ul>
      <app-simple-form
        *ngFor="let message of mail.messages"
        [message]="message.value"
        (update)="onUpdate(message.id, $event.value)"
      ></app-simple-form>
    </div>
  `,
  styles: [`
    app-simple-form {
      margin-bottom: 10px;
    }
  `]
})
export class AppComponent {
  title = 'let us get started';

  // onUpdate = this.mail::update
  onUpdate(id, value) {
    this.mail.update(id, value);
  }

  constructor(
    @Inject('mail') public mail
  ) {}
}
