import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms'
import { ServerConnectionService } from './server-connection.service'

/**
 * Let us define to type of JSON messages we can receive and send.
 */
interface RequestMsg {
  name: string | null | undefined // and optional request field
}
interface ResponseMsg {
  msg: string
  error?: string
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-client';
  serverConnectionService: ServerConnectionService = inject(ServerConnectionService)
  serverResponse: string = ''

  applyForm = new FormGroup({
    name: new FormControl('')
  });

  async sendMessage() {
    const response = await this.serverConnectionService.postJson<RequestMsg, ResponseMsg>('/hello', { 
      name: this.applyForm.value.name
    })
    this.serverResponse = response.error ?? response.msg
  }

  async getKey() {
	const response = await this.serverConnectionService.getKey();
	console.log(response);
  }
}