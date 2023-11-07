import { Injectable } from '@angular/core';
import * as rsa from 'my-rsa-implementation';

@Injectable({
  providedIn: 'root'
})
export class ServerConnectionService {
  readonly baseUrl
  e : any
  n : any
  constructor() { 
    this.baseUrl = 'http://localhost:3000'
	this.e = 0n
	this.n = 0n
  }

  async getKey(): Promise<void> {
	await fetch(this.baseUrl + '/key', {
		method: 'GET',
      	headers: {
        	"Content-Type": "application/json"
      	},
	}).then(response =>
		response.json()
	).then(data => {
		this.e = data.msg.e;
		this.n = data.msg.n;
		rsa.RsaPublicKey.fromJSON(data.msg);
	});
  }

  async postJson<RequestType, ResponseType>(path: string, json: RequestType): Promise<ResponseType> {
	// console.log(this.e);
	// console.log(this.n);
    const response = await fetch(this.baseUrl + path, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
	//   body: rsa.encrypt(BigInt(JSON.stringify(json)), this.e, this.n)
	  body: JSON.stringify(json)
    })
    return await response.json()
  }
}