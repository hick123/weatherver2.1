import { Component, OnInit } from '@angular/core';
import { DataserviceService } from './../dataservice.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormControl, FormGroup } from '@angular/forms';
import { ActivityMood } from './../datamodel';



@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
  providers: [DataserviceService]
})
export class FavoriteComponent implements OnInit {

  actmoodform = new FormGroup({
    activity: new FormControl(),
    mood: new FormControl(),
        weather: new FormControl()

  });
  submitted = false;
  activitymood = new ActivityMood('','','');

  constructor(    
    public dataService:DataserviceService,private dialogRef: MatDialogRef<FavoriteComponent>,
    
) { }

  ngOnInit() {
  }
  
save() {
    this.dialogRef.close(this.actmoodform.value);
}
  close() {
        this.dialogRef.close();
    }

}
