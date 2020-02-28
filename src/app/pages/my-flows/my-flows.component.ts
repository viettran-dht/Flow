import { Component, OnInit } from '@angular/core';
import { MY_FLOW_LAYOUT } from 'src/app/constant/constants';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { ISelect } from 'src/app/interfaces/select.interface';
import { HelperService } from 'src/app/services/helper/helper.service';
import { MESSAGE } from 'src/app/constant/message';

@Component({
  selector: 'app-my-flows',
  templateUrl: './my-flows.component.html',
  styleUrls: ['./my-flows.component.scss']
})
export class MyFlowsComponent implements OnInit {
  // public listClient = [];
  public layout = MY_FLOW_LAYOUT.list;
  public searchParams: any = {
    client: {
      fullName: '',
      Id: ''
    },
    brand: {
      brandName: '',
      Id: ''
    },
    campaign: {
      campaignName: '',
      Id: ''
    },
    status: '',
    q: ''
  };
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
  public listApp = [];
  public currentUser: any;
  constructor(
    public router: Router,
    public authService: AuthService,
    public firebaseService: FirebaseService,
    public helperService: HelperService
  ) { }

  async ngOnInit() {
    this.getAppsByCampaignId('pwO4e2rlgy');
    this.getClients();
    this.currentUser = await this.authService.getCurrentUser();
  }

  select(event, type) {
    console.log(event);
    switch (type) {
      case 'client':
        if (this.searchParams.client && this.searchParams.client.Id !== event.Id) {
          this.clearSearchParams('client');
          this.listBrand = [];
          this.listCampaign = [];
        }
        this.searchParams.client.Id = event.Id;
        this.searchParams.client.fullName = event.Name;
        this.getBrandsByClientId(event.Id);
        break;
      case 'brand':
        this.searchParams.brand.Id = event.Id;
        this.searchParams.brand.brandName = event.Name;
        this.getCampaignByBrandId(event.Id);
        break;
      case 'campaign':
        this.searchParams.campaign.Id = event.Id;
        this.searchParams.campaign.campaignName = event.Name;
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
    this.select(event, type);
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
        clientId: this.searchParams.client.Id
      };
      await this.firebaseService.createBrand(brandId, brandData);
      this.helperService.alert('success', MESSAGE.createBrandSuccess);
      this.loading.addBrand = false;
      const newBrand = {
        Id: brandId,
        Name: brandName
      };
      this.listBrand.push(newBrand);
    } catch {
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
        clientId: this.searchParams.client.Id,
        brandId: this.searchParams.brand.Id
      };
      await this.firebaseService.createCampaign(campaignId, campaignData);
      this.helperService.alert('success', MESSAGE.createCampaignSuccess);
      this.loading.addCampaign = false;
      const newCampaign = {
        Id: campaignId,
        Name: campaignName
      };
      this.listCampaign.push(newCampaign);
    } catch {
      this.loading.addCampaign = false;
    }
  }
  search() {
    console.log(this.searchParams);
  }
  clearSearchParams(param) {
    for (const key in this.searchParams) {
      if (this.searchParams.hasOwnProperty(key) && key !== param) {
        for (const childKey in this.searchParams[key]) {
          if (this.searchParams[key].hasOwnProperty(childKey)) {
            this.searchParams[key][childKey] = '';
          } else {
            this.searchParams[key] = '';
          }
        }
      }
    }
  }
  getAppsByCampaignId(campaignId) {
    this.loading.loadingApp = true;
    this.firebaseService.getAppsByCampaignId(campaignId).then((res: any) => {
      this.listApp = res;
      this.loading.loadingApp = false;
      console.log(this.listApp);
    }).catch(err => {
      this.listApp = [];
      this.loading.loadingApp = false;
    });
  }
}
