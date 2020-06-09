import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Participant } from './interfaces/participant';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  url = "https://localhost:44320/api/";

  getActivitiesList(){
    return this.http.get(this.url + 'activities')
  }

  registerParticipant(participant: Participant){
    const body = {
      firstName: participant.firstName,
      lastName: participant.lastName,
      email: participant.email,
      activity: participant.activity
    }
    return this.http.post(this.url + 'users', body)
  }

  getParticipantsByActivity(activity: string){
    return this.http.get(this.url + 'users/participants?activity=' + activity)
  }

}
