import { Component, OnInit } from '@angular/core';
import { MY_FLOW_LAYOUT } from 'src/app/constant/constants';
import { Router, NavigationExtras } from '@angular/router';
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
    status: {
      Id: '',
      Name: ''
    },
    q: ''
  };
  public listClient = [];
  public listBrand = [];
  public listCampaign = [];
  public listStatus = [
    { Id: 1, Name: 'activated' },
    { Id: 2, Name: 'Not activated' }
  ];
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
  public showSelectClient = false;
  constructor(
    public router: Router,
    public authService: AuthService,
    public firebaseService: FirebaseService,
    public helperService: HelperService
  ) { }

  async ngOnInit() {
    this.getAllApp();
    this.getClients();
    this.currentUser = await this.authService.getCurrentUser();
  }

  select(event, type) {
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
        if (this.searchParams.brand && this.searchParams.brand.Id !== event.Id) {
          this.clearSearchParams('brand');
          this.listCampaign = [];
        }
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

  goto(page: string, params?: any) {
    if (params) {
      const data: NavigationExtras = {
        state: {
          data: params
        }
      };
      this.router.navigate([page], data);

    } else {
      this.router.navigate([page]);

    }
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

  search() {
    this.loading.loadingApp = true;
    if (this.searchParams.client.Id) {
      // exist client
      if (this.searchParams.brand.Id) {
        if (this.searchParams.campaign.Id) {
          // exist capmaign => search by campaign id
          this.firebaseService.searchRefByChild(
            'apps', 'flowName', 'campaignId',
            this.searchParams.campaign.Id, this.searchParams.q).then((res: any) => {
              this.listApp = res;
              this.loading.loadingApp = false;
            }).catch(err => {
              this.loading.loadingApp = false;
              this.listApp = [];
            });
        } else {
          // exist brand => search by brand id
          this.firebaseService.searchRefByChild(
            'apps', 'flowName', 'brandId',
            this.searchParams.brand.Id, this.searchParams.q).then((res: any) => {
              this.listApp = res;
              this.loading.loadingApp = false;
            }).catch(err => {
              this.loading.loadingApp = false;
              this.listApp = [];
            });
        }
      } else {

        // does not exist brand => search by client id
        this.firebaseService.searchRefByChild(
          'apps', 'flowName', 'clientId',
          this.searchParams.client.Id, this.searchParams.q).then((res: any) => {
            this.listApp = res;
            this.loading.loadingApp = false;
          }).catch(err => {
            this.loading.loadingApp = false;
            this.listApp = [];
          });
      }
    } else {
      // does exist client
      this.firebaseService.searchRef('apps', 'flowName', this.searchParams.q).then((res: any) => {
        this.listApp = res;
        this.loading.loadingApp = false;
      }).catch(err => {
        this.loading.loadingApp = false;
        this.listApp = [];
      });
    }
  }
  clearSearchParams(param) {
    switch (param) {
      case 'client':
        this.searchParams.brand.Id = '';
        this.searchParams.brand.brandName = '';
        this.searchParams.campaign.Id = '';
        this.searchParams.campaign.campaignName = '';
        break;
      case 'brand':
        this.searchParams.campaign.Id = '';
        this.searchParams.campaign.campaignName = '';
        break;
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

  convertDate(date) {
    date = new Date(date);
    const dateISO = date.toISOString();
    return dateISO;
  }
  getAllApp() {
    this.loading.loadingApp = true;
    this.firebaseService.getAllRef('apps').then((res: any) => {
      this.listApp = res;
      this.loading.loadingApp = false;
      console.log(this.listApp);
    }).catch(err => {
      this.listApp = [];
      this.loading.loadingApp = false;
    });
  }
}
