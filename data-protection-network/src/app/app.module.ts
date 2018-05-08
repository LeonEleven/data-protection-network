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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService }     from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// import { TransactionComponent } from './Transaction/Transaction.component'

import { IntroductionComponent } from './Introduction/Introduction.component';
import { KnowledgeComponent } from './Knowledge/Knowledge.component';
import { OrderComponent } from './Order/Order.component';


  import { CompanyComponent } from './Company/Company.component';
  import { OrganizationComponent } from './Organization/Organization.component';
  import { UniversityComponent } from './University/University.component';
  import { PersonComponent } from './Person/Person.component';


  import { ApplyOrderComponent } from './ApplyOrder/ApplyOrder.component';
  import { ProcessingUseApplyComponent } from './ProcessingUseApply/ProcessingUseApply.component';
  import { ProcessingOwnerApplyComponent } from './ProcessingOwnerApply/ProcessingOwnerApply.component';
  import { ProcessingDeleteUserComponent } from './ProcessingDeleteUser/ProcessingDeleteUser.component';
@NgModule({
  declarations: [
    AppComponent,
		HomeComponent,
    // TransactionComponent,
    IntroductionComponent,
    KnowledgeComponent,
    
    OrderComponent
    ,

    CompanyComponent,
      OrganizationComponent,
      UniversityComponent,
      
      PersonComponent
      ,

    ApplyOrderComponent,
        ProcessingUseApplyComponent,
        ProcessingOwnerApplyComponent,
        
        ProcessingDeleteUserComponent
        
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
