import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {Type,ContactDetails} from './org.model.base';
// export namespace org.model.participant{
   export enum Gender {
      MALE,
      FEMALE,
      OTHER,
   }
   export class BirthDetails {
      dateOfBirth: Date;
      placeOfBirth: string;
   }
   export class Company extends BaseParticipant {
      InstitutionNumber: string;
   }
   export class Organization extends BaseParticipant {
      InstitutionNumber: string;
   }
   export class University extends BaseParticipant {
      InstitutionNumber: string;
   }
   export class Person extends BaseParticipant {
      IDNumber: string;
      gender: Gender;
      birthDetails: BirthDetails;
   }
// }
