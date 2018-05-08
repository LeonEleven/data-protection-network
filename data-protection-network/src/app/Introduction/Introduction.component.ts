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
import { IntroductionService } from './Introduction.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Introduction',
	templateUrl: './Introduction.component.html',
	styleUrls: ['./Introduction.component.css'],
  providers: [IntroductionService]
})
export class IntroductionComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          introductionId = new FormControl("", Validators.required);
        
  
      
          title = new FormControl("", Validators.required);
        
  
      
          content = new FormControl("", Validators.required);
        
  
      
          type = new FormControl("", Validators.required);
        
  
      
          protocol = new FormControl("", Validators.required);
        
  
      
          knowledge = new FormControl("", Validators.required);
        
  


  constructor(private serviceIntroduction:IntroductionService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          introductionId:this.introductionId,
        
    
        
          title:this.title,
        
    
        
          content:this.content,
        
    
        
          type:this.type,
        
    
        
          protocol:this.protocol,
        
    
        
          knowledge:this.knowledge
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceIntroduction.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
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
   * @param {String} name - the name of the asset field to update
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
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.model.knowledge.Introduction",
      
        
          "introductionId":this.introductionId.value,
        
      
        
          "title":this.title.value,
        
      
        
          "content":this.content.value,
        
      
        
          "type":this.type.value,
        
      
        
          "protocol":this.protocol.value,
        
      
        
          "knowledge":this.knowledge.value
        
      
    };

    this.myForm.setValue({
      
        
          "introductionId":null,
        
      
        
          "title":null,
        
      
        
          "content":null,
        
      
        
          "type":null,
        
      
        
          "protocol":null,
        
      
        
          "knowledge":null
        
      
    });

    return this.serviceIntroduction.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "introductionId":null,
        
      
        
          "title":null,
        
      
        
          "content":null,
        
      
        
          "type":null,
        
      
        
          "protocol":null,
        
      
        
          "knowledge":null 
        
      
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


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.model.knowledge.Introduction",
      
        
          
        
    
        
          
            "title":this.title.value,
          
        
    
        
          
            "content":this.content.value,
          
        
    
        
          
            "type":this.type.value,
          
        
    
        
          
            "protocol":this.protocol.value,
          
        
    
        
          
            "knowledge":this.knowledge.value
          
        
    
    };

    return this.serviceIntroduction.updateAsset(form.get("introductionId").value,this.asset)
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


  deleteAsset(): Promise<any> {

    return this.serviceIntroduction.deleteAsset(this.currentId)
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

    return this.serviceIntroduction.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "introductionId":null,
          
        
          
            "title":null,
          
        
          
            "content":null,
          
        
          
            "type":null,
          
        
          
            "protocol":null,
          
        
          
            "knowledge":null 
          
        
      };



      
        if(result.introductionId){
          
            formObject.introductionId = result.introductionId;
          
        }else{
          formObject.introductionId = null;
        }
      
        if(result.title){
          
            formObject.title = result.title;
          
        }else{
          formObject.title = null;
        }
      
        if(result.content){
          
            formObject.content = result.content;
          
        }else{
          formObject.content = null;
        }
      
        if(result.type){
          
            formObject.type = result.type;
          
        }else{
          formObject.type = null;
        }
      
        if(result.protocol){
          
            formObject.protocol = result.protocol;
          
        }else{
          formObject.protocol = null;
        }
      
        if(result.knowledge){
          
            formObject.knowledge = result.knowledge;
          
        }else{
          formObject.knowledge = null;
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
      
        
          "introductionId":null,
        
      
        
          "title":null,
        
      
        
          "content":null,
        
      
        
          "type":null,
        
      
        
          "protocol":null,
        
      
        
          "knowledge":null 
        
      
      });
  }

}
