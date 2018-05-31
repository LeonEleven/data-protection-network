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

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * 订单申请
 * @param {org.model.knowledge.ApplyOrder} applyOrder
 * @transaction
 */
async function ApplyOrder(applyOrder) {
    //创建订单
    let currentParticipant = applyOrder.applicant;
    if (getCurrentParticipant().getFullyQualifiedIdentifier() !== currentParticipant.getFullyQualifiedIdentifier()) {
        throw new Error('申请者必须是自己');
    }
    // if (currentParticipant.getFullyQualifiedIdentifier() === applyOrder.introduction.knowledge.owner.getFullyQualifiedIdentifier()) {
    //     throw new Error('不能对自己的知识提交申请！');
    // }
    const factory = getFactory();
    const order = factory.newResource('org.model.knowledge', 'Order', applyOrder.orderId);
    order.orderStatus = applyOrder.orderStatus;
    //可选项目，为空则默认同意对方的协议
    order.newProtocol = applyOrder.newProtocol;
    order.introduction = factory.newRelationship('org.model.knowledge', 'Introduction', applyOrder.introduction.getIdentifier());
    order.applicant = currentParticipant;
    //注册并保存订单
    const registry = await getAssetRegistry('org.model.knowledge.Order');
    await registry.add(order);
    // email此事件
    let event = factory.newEvent('org.model.knowledge', 'ApplyOrderEvent');
    event.orderId = applyOrder.orderId;
    event.orderStatus = applyOrder.orderStatus;
    event.massage=currentParticipant.name+' Apply '+applyOrder.introduction.title;
    emit(event);
}

// /**
//  * 订单申请
//  * @param {org.model.knowledge.AutoApplyOrder} autoApplyOrder
//  * @transaction
//  */
// async function AutoApplyOrder(autoApplyOrder) {
//     //创建订单
//     let currentParticipant = autoApplyOrder.applicant;
//     if (getCurrentParticipant().getFullyQualifiedIdentifier() !== currentParticipant.getFullyQualifiedIdentifier()) {
//         throw new Error('申请者必须是自己');
//     }
//     // if (currentParticipant.getFullyQualifiedIdentifier() === autoApplyOrder.introduction.knowledge.owner.getFullyQualifiedIdentifier()) {
//     //     throw new Error('不能对自己的知识提交申请！');
//     // }
//     const factory = getFactory();
//     const order = factory.newResource('org.model.knowledge', 'Order', autoApplyOrder.orderId);
//     order.orderStatus = autoApplyOrder.orderStatus;
//     order.introduction = factory.newRelationship('org.model.knowledge', 'Introduction', autoApplyOrder.introduction.getIdentifier());
//     order.applicant = currentParticipant;
//     //注册并保存订单
//     const registry = await getAssetRegistry('org.model.knowledge.Order');
//     await registry.add(order);
//     //添加使用者
//     const registryForKnowledge = await getAssetRegistry('org.model.knowledge.Knowledge');
//     let knowledge = autoApplyOrder.introduction.knowledge;
//     knowledge.usersId.push(currentParticipant.id);
//     await registryForKnowledge.update(knowledge);
//     // email此事件
//     let event = factory.newEvent('org.model.knowledge', 'AutoApplyOrderEvent');
//     event.orderId = autoApplyOrder.orderId;
//     event.orderStatus = autoApplyOrder.orderStatus;
//     event.massage=currentParticipant.name+' AutoApply '+autoApplyOrder.introduction.title;
//     emit(event);
// }

/**
 * 更新订单
 * @param {org.model.knowledge.ProcessingUseApply} processingUseApply
 * @transaction
 */
async function ProcessingUseApply(processingUseApply) {
    let currentParticipant = getCurrentParticipant();
    if (currentParticipant.getFullyQualifiedIdentifier() !== processingUseApply.order.introduction.knowledge.owner.getFullyQualifiedIdentifier()) {
        throw new Error('不能修改他人的订单状态！');
    }
    if(processingUseApply.order.orderStatus === 'OWNER_APPLY'){
        throw new Error('请通过知识所有权审核交易处理此订单！');
    }
    if(processingUseApply.order.orderStatus === 'USER_APPLY_AUTO'){
        throw new Error('自动申请订单不能被处理！');
    }
    //只能修改APPLY状态的订单
    if(processingUseApply.order.orderStatus === 'REJECT' || processingUseApply.order.orderStatus === 'ACCEPT'){
        throw new Error('此次订单已完成，请不要重复处理！');
    }
    const factory = getFactory();
    const registryForOrder = await getAssetRegistry('org.model.knowledge.Order');
    const registryForKnowledge = await getAssetRegistry('org.model.knowledge.Knowledge');
    let order = processingUseApply.order;
    let knowledge = processingUseApply.order.introduction.knowledge;
   
    if(processingUseApply.orderStatus === 'ACCEPT'){
        //在知识中添加使用者
        knowledge.usersId.push(order.applicant.id);
        console.log('user.id:',knowledge.usersId.indexOf(order.applicant.id));
        await registryForKnowledge.update(knowledge);
    }
    order.result = processingUseApply.result;
    order.orderStatus = processingUseApply.orderStatus;
    await registryForOrder.update(order);
    // email此事件
    let event = factory.newEvent('org.model.knowledge', 'ProcessingUseApplyEvent');
    event.order = processingUseApply.order;
    event.massage = processingUseApply.result;
    event.orderStatus = processingUseApply.orderStatus;
    emit(event);
}

/**
 * 改变知识的所有者
 * @param {org.model.knowledge.ProcessingOwnerApply} processingOwnerApply
 * @transaction
 */
async function ProcessingOwnerApply(processingOwnerApply) {
    let currentParticipant = getCurrentParticipant();
    if (currentParticipant.getFullyQualifiedIdentifier() !== processingOwnerApply.order.introduction.knowledge.owner.getFullyQualifiedIdentifier()) {
        throw new Error('不能更换他人的知识拥有者！');
    }
    if(processingOwnerApply.order.orderStatus === 'USE_APPLY'){
        throw new Error('请通过知识使用权审核交易处理此订单！');
    }
    if(processingOwnerApply.order.orderStatus === 'USER_APPLY_AUTO'){
        throw new Error('自动申请订单不能被处理！');
    }
        //只能修改APPLY状态的订单
    if(processingOwnerApply.order.orderStatus === 'REJECT' || processingOwnerApply.order.orderStatus === 'ACCEPT'){
        throw new Error('此次订单已完成，请不要重复处理！');
    }
    
    const factory = getFactory();
    const registryForOrder = await getAssetRegistry('org.model.knowledge.Order');
    const registryForKnowledge = await getAssetRegistry('org.model.knowledge.Knowledge');
    let order = processingOwnerApply.order;
    let knowledge = processingOwnerApply.order.introduction.knowledge;
    if(processingOwnerApply.orderStatus === 'ACCEPT'){
        //新的所有者
        knowledge.owner = order.applicant;
        await registryForKnowledge.update(knowledge);
    }
    order.result = processingOwnerApply.result;
    order.orderStatus = processingOwnerApply.orderStatus;
    await registryForOrder.update(order);
    // email此事件
    let event = factory.newEvent('org.model.knowledge', 'ProcessingOwnerApplyEvent');
    event.order = processingOwnerApply.order;
    event.massage = processingOwnerApply.result;
    event.orderStatus = processingOwnerApply.orderStatus;
    emit(event);
}

/**
 * 删除使用者
 * @param {org.model.knowledge.ProcessingDeleteUser} processingDeleteUser
 * @transaction
 */
async function ProcessingDeleteUser(processingDeleteUser) {
    let currentParticipant = getCurrentParticipant();
    if (currentParticipant.getFullyQualifiedIdentifier() !== processingDeleteUser.knowledge.owner.getFullyQualifiedIdentifier()) {
        throw new Error('不能删除他人的知识使用者！');
    }
    const factory = getFactory();
    const assetRegistry = await getAssetRegistry('org.model.knowledge.Knowledge');
    let index = processingDeleteUser.knowledge.usersId.indexOf(processingDeleteUser.userId);
    console.log('user.id:',processingDeleteUser.knowledge.usersId.indexOf(processingDeleteUser.userId));
    processingDeleteUser.knowledge.usersId.splice(index,1);
    console.log('user.id:',processingDeleteUser.knowledge.usersId.indexOf(processingDeleteUser.userId));
    if(processingDeleteUser.knowledge.usersId.indexOf(processingDeleteUser.userId) !== -1){
        throw new Error('删除使用者错误！')
    }
    assetRegistry.update(processingDeleteUser.knowledge);
    let event = factory.newEvent('org.model.knowledge', 'ProcessingDeleteUserEvent');
    event.message = 'Delete User '+processingDeleteUser.userId+' in '+processingDeleteUser.knowledge.knowledgeId;
    event.knowledge = processingDeleteUser.knowledge;
    emit(event);
}