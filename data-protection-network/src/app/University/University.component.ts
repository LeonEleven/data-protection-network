/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UniversityService } from './University.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-University',
	templateUrl: './University.component.html',
	styleUrls: ['./University.component.css'],
  providers: [UniversityService]
})
export class UniversityComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
	private errorMessage;

  
      
          InstitutionNumber = new FormControl("", Validators.required);
        
  
      
          id = new FormControl("", Validators.required);
        
  
      
          name = new FormControl("", Validators.required);
        
  
      
          type = new FormControl("", Validators.required);
        
  
      
          contactDetails = new FormControl("", Validators.required);
        
  


  constructor(private serviceUniversity:UniversityService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          InstitutionNumber:this.InstitutionNumber,
        
    
        
          id:this.id,
        
    
        
          name:this.name,
        
    
        
          type:this.type,
        
    
        
          contactDetails:this.contactDetails
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceUniversity.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "org.model.participant.University",
      
        
          "InstitutionNumber":this.InstitutionNumber.value,
        
      
        
          "id":this.id.value,
        
      
        
          "name":this.name.value,
        
      
        
          "type":this.type.value,
        
      
        
          "contactDetails":this.contactDetails.value
        
      
    };

    this.myForm.setValue({
      
        
          "InstitutionNumber":null,
        
      
        
          "id":null,
        
      
        
          "name":null,
        
      
        
          "type":null,
        
      
        
          "contactDetails":null
        
      
    });

    return this.serviceUniversity.addParticipant(this.participant)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "InstitutionNumber":null,
        
      
        
          "id":null,
        
      
        
          "name":null,
        
      
        
          "type":null,
        
      
        
          "contactDetails":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "org.model.participant.University",
      
        
          
            "InstitutionNumber":this.InstitutionNumber.value,
          
        
    
        
          
        
    
        
          
            "name":this.name.value,
          
        
    
        
          
            "type":this.type.value,
          
        
    
        
          
            "contactDetails":this.contactDetails.value
          
        
    
    };

    return this.serviceUniversity.updateParticipant(form.get("id").value,this.participant)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteParticipant(): Promise<any> {

    return this.serviceUniversity.deleteParticipant(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceUniversity.getparticipant(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "InstitutionNumber":null,
          
        
          
            "id":null,
          
        
          
            "name":null,
          
        
          
            "type":null,
          
        
          
            "contactDetails":null 
          
        
      };



      
        if(result.InstitutionNumber){
          
            formObject.InstitutionNumber = result.InstitutionNumber;
          
        }else{
          formObject.InstitutionNumber = null;
        }
      
        if(result.id){
          
            formObject.id = result.id;
          
        }else{
          formObject.id = null;
        }
      
        if(result.name){
          
            formObject.name = result.name;
          
        }else{
          formObject.name = null;
        }
      
        if(result.type){
          
            formObject.type = result.type;
          
        }else{
          formObject.type = null;
        }
      
        if(result.contactDetails){
          
            formObject.contactDetails = result.contactDetails;
          
        }else{
          formObject.contactDetails = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "InstitutionNumber":null,
        
      
        
          "id":null,
        
      
        
          "name":null,
        
      
        
          "type":null,
        
      
        
          "contactDetails":null 
        
      
      });
  }

}
