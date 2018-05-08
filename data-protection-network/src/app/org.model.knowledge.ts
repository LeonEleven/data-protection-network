import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {Type,BaseParticipant} from './org.model.base';
// export namespace org.model.knowledge{
   export enum OrderStatus {
      USE_APPLY,
      OWNER_APPLY,
      REJECT,
      ACCEPT,
   }
   export class ProtocolDetails {
      rule: string;
      payment: number;
      startTime: Date;
      deadline: Date;
   }
   export class Introduction extends Asset {
      introductionId: string;
      title: string;
      content: string;
      type: Type;
      protocol: ProtocolDetails;
      knowledge: Knowledge;
   }
   export class Knowledge extends Asset {
      knowledgeId: string;
      title: string;
      type: Type;
      content: string;
      owner: BaseParticipant;
      usersId: string[];
   }
   export class Order extends Asset {
      orderId: string;
      orderStatus: OrderStatus;
      newProtocol: ProtocolDetails;
      result: string;
      introduction: Introduction;
      applicant: BaseParticipant;
   }
   export class ApplyOrder extends Transaction {
      orderId: string;
      orderStatus: OrderStatus;
      protocol: ProtocolDetails;
      introduction: Introduction;
      applicant: BaseParticipant;
   }
   export class ApplyOrderEvent extends Event {
      orderId: string;
      orderStatus: OrderStatus;
      massage: string;
   }
   export class ProcessingUseApply extends Transaction {
      orderStatus: OrderStatus;
      result: string;
      order: Order;
   }
   export class ProcessingUseApplyEvent extends Event {
      orderStatus: OrderStatus;
      massage: string;
      order: Order;
   }
   export class ProcessingOwnerApply extends Transaction {
      orderStatus: OrderStatus;
      result: string;
      order: Order;
   }
   export class ProcessingOwnerApplyEvent extends Event {
      orderStatus: OrderStatus;
      massage: string;
      order: Order;
   }
   export class ProcessingDeleteUser extends Transaction {
      userId: string;
      knowledge: Knowledge;
   }
   export class ProcessingDeleteUserEvent extends Event {
      message: string;
      knowledge: Knowledge;
   }
// }
