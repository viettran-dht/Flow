import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import * as valuesLd from 'lodash/values';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }

createClient(clientId, clientData) {
    return firebase.database().ref('clients/' + clientId).set(clientData);
  }
  createBrand(brandId, brandData) {
    return firebase.database().ref('brands/' + brandId).set(brandData);
  }
  createCampaign(campaignId, campaignData) {
    return firebase.database().ref('campaigns/' + campaignId).set(campaignData);
  }
  createUser(uid, userData) {
    userData.created = firebase.firestore.Timestamp.fromDate(new Date());
    return firebase.database().ref('users/' + uid).set(userData);
  }
  updateRef(ref, id, body) {
    // console.log(ref, id, body)
    return firebase.database().ref(`/${ref}/${id}`).update(body);
  }
  handleClientPost(clientId, userId) {
    // tslint:disable-next-line:no-unused-expression
    return firebase.database().ref('users/' + userId + '/clients/' + clientId).set(true);
  }
  handleBrandPost(brandId, userId, clientId) {
    const updates = {};
    // tslint:disable-next-line:no-unused-expression
    updates[`users/${userId}/brands/${brandId}`] = true;
    updates[`clients/${clientId}/brands/${brandId}`] = true;
    return firebase.database().ref().update(updates);
  }
  handleCampaignPost(campaignId, userId, clientId, brandId) {
    const updates = {};
    // tslint:disable-next-line:no-unused-expression
    updates[`users/${userId}/campaigns/${campaignId}`] = true;
    updates[`clients/${clientId}/campaigns/${campaignId}`] = true;
    updates[`brands/${brandId}/campaigns/${campaignId}`] = true;
    return firebase.database().ref().update(updates);
  }
  getRefById(ref, id) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/' + ref + '/' + id).once('value').then((snapshot) => {
        const detail = snapshot.val();
        resolve(detail);
      });
    });
  }
  getClients(uId) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('clients/').orderByChild('uId').equalTo(uId).on('value', (snapshot) => {
        const clients = valuesLd(snapshot.val());
        resolve(clients);
      });
    });
  }
  getBrandsByClientId(clientId) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('brands/').orderByChild('clientId').equalTo(clientId).on('value', (snapshot) => {
        const brands = valuesLd(snapshot.val());
        resolve(brands);
      });
    });
  }
  getCampaignByBrandId(brandId) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('campaigns/').orderByChild('brandId').equalTo(brandId).on('value', (snapshot) => {
        const campaigns = valuesLd(snapshot.val());
        resolve(campaigns);
      });
    });
  }
  getCampaignByUserId(uId) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('campaigns/').orderByChild('uId').equalTo(uId).on('value', (snapshot) => {
        const campaigns = valuesLd(snapshot.val());
        resolve(campaigns);
      });
    });
  }
  getAppsByCampaignId(campaignId) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('apps/').orderByChild('campaignId').equalTo(campaignId).on('value', (snapshot) => {
        const apps = valuesLd(snapshot.val());
        resolve(apps);
      });
    });
  }
  createPaypalPayment(paymentInfo, uId) {
    const updateUserRef = {};
    updateUserRef[`users/${uId}/paymentFlow/${paymentInfo.id}`] = { type: 'Paypal', id: paymentInfo.id, plan: paymentInfo.planDetail };
    firebase.database().ref().update(updateUserRef);
    return firebase.database().ref('payment/' + paymentInfo.id).set(paymentInfo);
  }
}
