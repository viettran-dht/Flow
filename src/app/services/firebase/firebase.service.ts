import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import * as valuesLd from 'lodash/values';
import { IUser } from 'src/app/interfaces/user.interface';
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
    campaignData.created = firebase.firestore.Timestamp.fromDate(new Date());
    return firebase.database().ref('campaigns/' + campaignId).set(campaignData);
  }
  createUser(uid, userData) {
    userData.created = firebase.firestore.Timestamp.fromDate(new Date());
    return firebase.database().ref('users/' + uid).set(userData);
  }
  createApp(appId, appData) {
    appData.created = firebase.firestore.Timestamp.fromDate(new Date());
    return firebase.database().ref('apps/' + appId).set(appData);
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
  getAllRef(ref) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/' + ref).on('value', (snapshot) => {
        const detail = valuesLd(snapshot.val());
        resolve(detail);
      });
    });
  }

  searchRefByChild(ref, name, child, childId, q) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/' + ref).orderByChild(child).equalTo(childId).on('value', (snapshot) => {
        let detail = valuesLd(snapshot.val());
        detail = detail.filter(d => d[name].toLowerCase().includes(q.toLowerCase()));
        resolve(detail);
      });
    });
  }

  searchRef(ref, name, q) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/' + ref).on('value', (snapshot) => {
        let detail = valuesLd(snapshot.val());
        detail = detail.filter(d => d[name].toLowerCase().includes(q.toLowerCase()));
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
  getAppsByAppId(appId) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('apps/').orderByChild('appId').equalTo(appId).on('value', (snapshot) => {
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
  uploadLogo(logo, path) {
    const name = new Date().getTime();
    const ref = firebase.storage().ref(path + name);
    const uploadTask = ref.putString(logo.split(',')[1], 'base64');
    return new Promise((resolve, reject) => {
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (taskSnapshot) => {
        console.log(taskSnapshot);
      }, err => {
        console.log(err);
        reject(err);
      }, async () => {
        const logoUrl = await uploadTask.snapshot.ref.getDownloadURL();
        resolve(logoUrl);
      });
    });
  }
  updateUserInfo(user: IUser) {
    const userUpdateData = {
      displayName: user.displayName,
      phoneNumber: user.phoneNumber,
      companyName: user.companyName,
      country: user.country,
      jobTitle: user.jobTitle,
      lastupdate: firebase.firestore.Timestamp.fromDate(new Date())
    };
    return this.updateRef('users', user.uid, userUpdateData);
  }
  updateLogo(collection, doc, logoUrl) {
    return this.updateRef(collection, doc, { logo: logoUrl });
  }
}
