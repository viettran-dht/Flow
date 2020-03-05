import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelperService } from 'src/app/services/helper/helper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { TIMEZONELIST } from 'src/app/constant/userTimezone';
import { ISelect } from 'src/app/interfaces/select.interface';
import { MESSAGE } from 'src/app/constant/message';
import { ApiService } from 'src/app/services/api/api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-new-flow',
  templateUrl: './add-new-flow.component.html',
  styleUrls: ['./add-new-flow.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    // '(document:click)': 'onClick($event)',
  }

})
export class AddNewFlowComponent implements OnInit {
  @ViewChild('zoneSelect', { static: false }) zoneSelect: ElementRef;

  public addFlowForm: FormGroup;

  public listClient = [];
  public listBrand = [];
  public listCampaign = [];
  public listStatus = [];
  public loading: any = {
    loadingBrand: false,
    loadingCampaign: false,
    addClient: false,
    addBrand: false,
    addCampaign: false,
    loadingApp: false
  };
  // public listApp = [];
  public currentUser: any;
  public userTimezone: any = TIMEZONELIST;
  public flowId: any;
  public app: any;
  public clientId: any;
  public brandId: any;
  public campaignId: any;
  public tagsData = [];
  constructor(
    private helperService: HelperService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService,
    private location: Location
  ) {
    this.initForm();
    this.flowId = this.activatedRoute.snapshot.paramMap.get('flowId');
    if (this.flowId) {
      if (this.router.getCurrentNavigation().extras.state) {
        this.app = this.router.getCurrentNavigation().extras.state.data;
        console.log(this.app);
        this.initData();
      } else {
        this.getAppByAppId(this.flowId);
      }
    }
    // this.activatedRoute.queryParams.subscribe((res: any) => {

    // });
    this.getClients();
  }

  async ngOnInit() {
    this.currentUser = await this.authService.getCurrentUser();
  }

  initForm() {
    this.addFlowForm = this.fb.group({
      flowName: ['', Validators.required],
      campaignId: ['', Validators.required],
      campaignName: ['', Validators.required],
      region: [this.userTimezone[0].value, Validators.required],
      tags: [[], Validators.required],
      brandId: ['', Validators.required],
      brandName: ['', Validators.required],
      flowStartDate: ['', Validators.required],
      notes: [''],
      clientId: ['', Validators.required],
      clientName: ['', Validators.required],
      flowEndDate: ['', Validators.required],
    });
  }
  select(event, type) {
    console.log(event);
    switch (type) {
      case 'client':
        // if (this.searchParams.client && this.searchParams.client.Id !== event.Id) {
        //   this.clearSearchParams('client');
        //   this.listBrand = [];
        //   this.listCampaign = [];
        // }
        this.addFlowForm.get('clientId').setValue(event.Id);
        this.addFlowForm.get('clientName').setValue(event.Name);
        this.clientId = event.Id;
        // this.searchParams.client.fullName = event.Name;
        this.getBrandsByClientId(event.Id);
        break;
      case 'brand':
        this.addFlowForm.get('brandId').setValue(event.Id);
        this.addFlowForm.get('brandName').setValue(event.Name);
        this.brandId = event.Id;
        this.getCampaignByBrandId(event.Id);
        break;
      case 'campaign':
        this.addFlowForm.get('campaignId').setValue(event.Id);
        this.addFlowForm.get('campaignName').setValue(event.Name);
        this.campaignId = event.Id;
        break;
    }
  }

  goto(page) {
    this.router.navigate([page]);
  }
  async getClients() {
    try {
      const currentUser: any = await this.authService.getCurrentUser();
      const uId = currentUser.uid;
      this.firebaseService.getClients(uId).then((res: any) => {
        this.listClient = res.map(c => {
          const client: ISelect = {
            Id: c.Id,
            Name: c.fullName
          };
          return client;
        });
      });
    } catch {
      this.listClient = [];
    }
  }

  getBrandsByClientId(clientId) {
    this.loading.loadingBrand = true;
    this.firebaseService.getBrandsByClientId(clientId).then((res: any) => {
      this.listBrand = res.map(c => {
        const brand: ISelect = {
          Id: c.Id,
          Name: c.brandName
        };
        return brand;
      });
      // console.log(res, this.pageParams.listBrand)
      this.loading.loadingBrand = false;
    }).catch(err => {
      this.loading.loadingBrand = false;
    });
  }
  getCampaignByBrandId(brandId) {
    this.loading.loadingCampaign = true;
    this.firebaseService.getCampaignByBrandId(brandId).then((res: any) => {
      this.listCampaign = res.map(c => {
        const campaign: ISelect = {
          Id: c.Id,
          Name: c.campaignName
        };
        return campaign;
      });
      this.loading.loadingCampaign = false;
    }).catch(err => {
      this.loading.loadingCampaign = false;
    });
  }
  async onAdd(event, type) {
    switch (type) {
      case 'client':
        await this.createClient(event.Name);
        break;
      case 'brand':
        await this.createBrand(event.Name);
        break;
      case 'campaign':
        await this.createCampaign(event.Name);
        break;
    }
    // this.select(event, type);
  }
  async createClient(clientName) {
    try {
      this.loading.addClient = true;
      const uId = this.currentUser.uid;
      const clientId = this.helperService.generateRandomUID(5);
      const clientData: any = {
        Id: clientId,
        fullName: clientName,
        uId
      };
      await this.firebaseService.createClient(clientId, clientData);
      this.helperService.alert('success', MESSAGE.createClientSuccess);
      this.loading.addClient = false;
      const newClient = {
        Id: clientId,
        Name: clientName
      };
      this.select(newClient, 'client');
      this.listClient.push(newClient);
    } catch {
      this.loading.addClient = false;
    }
  }
  async createBrand(brandName) {
    try {
      this.loading.addBrand = true;
      const uId = this.currentUser.uid;
      const brandId = this.helperService.generateRandomUID(8);
      const brandData: any = {
        Id: brandId,
        brandName,
        uId,
        clientId: this.addFlowForm.value.clientId
      };
      await this.firebaseService.createBrand(brandId, brandData);
      this.helperService.alert('success', MESSAGE.createBrandSuccess);
      this.loading.addBrand = false;
      const newBrand = {
        Id: brandId,
        Name: brandName
      };
      this.select(newBrand, 'brand');
      this.listBrand.push(newBrand);
    } catch (e) {
      this.loading.addBrand = false;
    }
  }
  async createCampaign(campaignName) {
    try {
      this.loading.addCampaign = true;
      const uId = this.currentUser.uid;
      const campaignId = this.helperService.generateRandomUID(10);
      const campaignData: any = {
        Id: campaignId,
        campaignName,
        uId,
        clientId: this.addFlowForm.value.clientId,
        brandId: this.addFlowForm.value.brandId
      };
      await this.firebaseService.createCampaign(campaignId, campaignData);
      this.helperService.alert('success', MESSAGE.createCampaignSuccess);
      this.loading.addCampaign = false;
      const newCampaign = {
        Id: campaignId,
        Name: campaignName
      };
      this.select(newCampaign, 'campaign');
      this.listCampaign.push(newCampaign);
    } catch {
      this.loading.addCampaign = false;
    }
  }
  search() {

  }

  getAppByAppId(appId) {
    this.loading.loadingApp = true;
    this.firebaseService.getAppsByAppId(appId).then((res: any) => {
      this.app = res[0];
      this.initData();
      this.loading.loadingApp = false;
    }).catch(err => {
      this.loading.loadingApp = false;
    });
  }
  async createApp() {
    this.helperService.markFormGroupTouched(this.addFlowForm);
    console.log(this.addFlowForm.value);
    if (this.addFlowForm.invalid) {
      return;
    }
    try {
      this.loading.loadingApp = true;
      const idToken = await this.currentUser.getIdToken();
      // const res: any = await this.apiService.createApp(this.addFlowForm.value, idToken);
      // console.log(res);
      const req = this.addFlowForm.value;
      const flowId = '-' + this.helperService.generateRandomUID(19);
      req.appId = flowId;
      // const req: any = {
      //   flowName: this.addFlowForm.value.flowName,
      //   campaignId: this.addFlowForm.value.campaignId,
      //   campaignName: this.addFlowForm.value.campaignName,
      //   region: this.addFlowForm.value.region,
      //   tags: this.addFlowForm.value.tags,
      //   brandId: this.addFlowForm.value.brandId,
      //   brandName: this.addFlowForm.value.brandName,
      //   flowStartDate: this.addFlowForm.value.flowStartDate,
      //   notes: this.addFlowForm.value.notes,
      //   clientId: this.addFlowForm.value.clientId,
      //   clientName: this.addFlowForm.value.clientName,
      //   flowEndDate: this.addFlowForm.value.flowEndDate,
      // };
      req.isActived = false;
      req.flowStartDate = this.addFlowForm.value.flowStartDate.toString();
      req.flowEndDate = this.addFlowForm.value.flowEndDate.toString();
      await this.firebaseService.createApp(flowId, req);
      this.loading.loadingApp = false;
      this.helperService.alert('success', MESSAGE.createAppSuccess);
      this.goto('terms-of-use');
    } catch (e) {
      this.loading.loadingApp = false;
      console.log(e);
    }

  }
  onTagsChange(event) {
    console.log(event);
    this.addFlowForm.get('tags').setValue(event);
  }
  goback() {
    this.location.back();
  }
  async initData() {
    this.addFlowForm.patchValue({
      flowName: this.app.flowName,
      campaignId: this.app.campaignId,
      region: this.app.region,
      tags: this.app.tags,
      brandId: this.app.brandId,
      flowStartDate: new Date(this.app.flowStartDate),
      notes: this.app.notes,
      clientId: this.app.clientId,
      flowEndDate: new Date(this.app.flowEndDate),
      campaignName: this.app.campaignName,
      brandName: this.app.brandName,
      clientName: this.app.clientName
    });
    this.clientId = this.app.clientId;
    this.campaignId = this.app.campaignId;
    this.brandId = this.app.brandId;
    this.tagsData = this.app.tags;
    await this.getBrandsByClientId(this.clientId);
    await this.getCampaignByBrandId(this.brandId);
  }
  async updateApp() {
    this.helperService.markFormGroupTouched(this.addFlowForm);
    if (this.addFlowForm.invalid) {
      return;
    }
    try {
      this.loading.loadingApp = true;
      const req = this.addFlowForm.value;
      req.flowStartDate = this.addFlowForm.value.flowStartDate.toString();
      req.flowEndDate = this.addFlowForm.value.flowEndDate.toString();
      await this.firebaseService.updateRef('apps', this.flowId, req);
      this.loading.loadingApp = false;
      this.helperService.alert('success', MESSAGE.updateAppSuccess);
    } catch (e) {
      this.loading.loadingApp = false;
      console.log(e);
    }
  }
  async resetData() {
    this.addFlowForm.patchValue({
      flowName: this.app.flowName,
      campaignId: this.app.campaignId,
      region: this.app.region,
      tags: this.app.tags,
      brandId: this.app.brandId,
      flowStartDate: new Date(this.app.flowStartDate),
      notes: this.app.notes,
      clientId: this.app.clientId,
      flowEndDate: new Date(this.app.flowEndDate),
      campaignName: this.app.campaignName,
      brandName: this.app.brandName,
      clientName: this.app.clientName
    });
    this.clientId = this.app.clientId;
    this.campaignId = this.app.campaignId;
    this.brandId = this.app.brandId;
    this.tagsData = this.app.tags;
    // await this.getBrandsByClientId(this.clientId);
    // await this.getCampaignByBrandId(this.brandId);
  }
}
