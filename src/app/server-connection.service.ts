import { Injectable } from '@angular/core';
import * as rsa from 'my-rsa-implementation';
import * as rsa from 'my-rsa-implementation';

@Injectable({
  providedIn: 'root'
})
export class ServerConnectionService {
	rsa : any;
  readonly baseUrl
  e : any
  n : any
  constructor() { 
    this.baseUrl = 'http://localhost:3000'
  }

  async getKey(): Promise<void> {
	await fetch(this.baseUrl + '/key', {
		method: 'GET',
      	headers: {
        	"Content-Type": "application/json"
      	},
	}).then(response => {
		return response.json();
	}).then(data => {
		this.rsa = new rsa.RsaPublicKey(data.msg.e, data.msg.n);
		console.log(this.rsa.e);
		console.log(this.rsa.n);
	});
  }

  async postJson<RequestType, ResponseType>(path: string, json: RequestType): Promise<ResponseType> {
	console.log(this.rsa.encrypt(json));
    const response = await fetch(this.baseUrl + path, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
	//   body: rsa.encrypt(BigInt(JSON.stringify(json)), this.e, this.n)
	  body: JSON.stringify(this.rsa.encrypt(json).toString())
    })
    return await response.json()
  }
}