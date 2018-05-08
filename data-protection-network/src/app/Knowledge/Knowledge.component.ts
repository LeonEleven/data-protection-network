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
import { KnowledgeService } from './Knowledge.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Knowledge',
	templateUrl: './Knowledge.component.html',
	styleUrls: ['./Knowledge.component.css'],
  providers: [KnowledgeService]
})
export class KnowledgeComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          knowledgeId = new FormControl("", Validators.required);
        
  
      
          title = new FormControl("", Validators.required);
        
  
      
          type = new FormControl("", Validators.required);
        
  
      
          content = new FormControl("", Validators.required);
        
  
      
          owner = new FormControl("", Validators.required);
        
  
      
          usersId = new FormControl("", Validators.required);
        
  


  constructor(private serviceKnowledge:KnowledgeService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          knowledgeId:this.knowledgeId,
        
    
        
          title:this.title,
        
    
        
          type:this.type,
        
    
        
          content:this.content,
        
    
        
          owner:this.owner,
        
    
        
          usersId:this.usersId
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceKnowledge.getAll()
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
      $class: "org.model.knowledge.Knowledge",
      
        
          "knowledgeId":this.knowledgeId.value,
        
      
        
          "title":this.title.value,
        
      
        
          "type":this.type.value,
        
      
        
          "content":this.content.value,
        
      
        
          "owner":this.owner.value,
        
      
        
          "usersId":this.usersId.value
        
      
    };

    this.myForm.setValue({
      
        
          "knowledgeId":null,
        
      
        
          "title":null,
        
      
        
          "type":null,
        
      
        
          "content":null,
        
      
        
          "owner":null,
        
      
        
          "usersId":null
        
      
    });

    return this.serviceKnowledge.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "knowledgeId":null,
        
      
        
          "title":null,
        
      
        
          "type":null,
        
      
        
          "content":null,
        
      
        
          "owner":null,
        
      
        
          "usersId":null 
        
      
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
      $class: "org.model.knowledge.Knowledge",
      
        
          
        
    
        
          
            "title":this.title.value,
          
        
    
        
          
            "type":this.type.value,
          
        
    
        
          
            "content":this.content.value,
          
        
    
        
          
            "owner":this.owner.value,
          
        
    
        
          
            "usersId":this.usersId.value
          
        
    
    };

    return this.serviceKnowledge.updateAsset(form.get("knowledgeId").value,this.asset)
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

    return this.serviceKnowledge.deleteAsset(this.currentId)
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

    return this.serviceKnowledge.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "knowledgeId":null,
          
        
          
            "title":null,
          
        
          
            "type":null,
          
        
          
            "content":null,
          
        
          
            "owner":null,
          
        
          
            "usersId":null 
          
        
      };



      
        if(result.knowledgeId){
          
            formObject.knowledgeId = result.knowledgeId;
          
        }else{
          formObject.knowledgeId = null;
        }
      
        if(result.title){
          
            formObject.title = result.title;
          
        }else{
          formObject.title = null;
        }
      
        if(result.type){
          
            formObject.type = result.type;
          
        }else{
          formObject.type = null;
        }
      
        if(result.content){
          
            formObject.content = result.content;
          
        }else{
          formObject.content = null;
        }
      
        if(result.owner){
          
            formObject.owner = result.owner;
          
        }else{
          formObject.owner = null;
        }
      
        if(result.usersId){
          
            formObject.usersId = result.usersId;
          
        }else{
          formObject.usersId = null;
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
      
        
          "knowledgeId":null,
        
      
        
          "title":null,
        
      
        
          "type":null,
        
      
        
          "content":null,
        
      
        
          "owner":null,
        
      
        
          "usersId":null 
        
      
      });
  }

}
