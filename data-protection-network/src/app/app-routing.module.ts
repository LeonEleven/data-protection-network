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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

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
const routes: Routes = [
     //{ path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'Introduction', component: IntroductionComponent},
    
		{ path: 'Knowledge', component: KnowledgeComponent},
    
		{ path: 'Order', component: OrderComponent},
    
    
      { path: 'Company', component: CompanyComponent},
      
      { path: 'Organization', component: OrganizationComponent},
      
      { path: 'University', component: UniversityComponent},
      
      { path: 'Person', component: PersonComponent},
      
      
        { path: 'ApplyOrder', component: ApplyOrderComponent},
        
        { path: 'ProcessingUseApply', component: ProcessingUseApplyComponent},
        
        { path: 'ProcessingOwnerApply', component: ProcessingOwnerApplyComponent},
        
        { path: 'ProcessingDeleteUser', component: ProcessingDeleteUserComponent},
        
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
