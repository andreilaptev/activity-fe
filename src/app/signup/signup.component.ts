import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validator, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Participant } from '../classes/participant';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private dataService: DataService, private fb: FormBuilder) { }

  activities: any;
  signedUp: boolean;
  participants: Participant[] = [];
  chosenActivity: string;
  interested: boolean;
  lonely: boolean;

  participantForm: FormGroup;

  ngOnInit() {
    this.participantForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      activity: new FormControl()
    });

    this.dataService.getActivitiesList().subscribe(
      data => this.activities = data);
  }

  onSignUp(): void {
    this.participantForm.value.activity == null
      ? this.chosenActivity = this.activities[0].name
      : this.chosenActivity = this.participantForm.value.activity;
    this.signedUp = true;

    const part = new Participant();

    part.firstName = this.participantForm.value.firstName;
    part.lastName = this.participantForm.value.lastName;
    part.email = this.participantForm.value.email;
    part.activity = this.chosenActivity;

    this.dataService.registerParticipant(part).subscribe();
  }

  onShowParticipants() {
    this.dataService.getParticipantsByActivity(this.chosenActivity).subscribe(
      data => {this.participants = data as Participant[];
      this.interested = true;
      if (this.participants.length === 1) {
          this.lonely = true;
        }
      }
    );
  }

}
