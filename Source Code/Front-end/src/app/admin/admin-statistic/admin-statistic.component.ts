import { Component, OnInit, OnChanges, AfterContentChecked, AfterViewInit, AfterViewChecked, DoCheck } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'admin-statistic',
  templateUrl: './admin-statistic.component.html',
  styleUrls: ['./admin-statistic.component.scss']
})
export class AdminStatisticComponent implements OnInit, DoCheck {
  externalScriptUrl: any;
  totalUsers: number;
  totalStores: number;
  totalProducts: number;

  constructor(private _authService: AuthService) {
    this.totalUsers = 0;
    this.totalProducts = 0;
    this.totalStores = 0;
   }

  ngOnInit() {
    this._authService.getAllUsers()
      .subscribe(response => {
        let usersJSON = JSON.parse(response._body);
        this.totalUsers = usersJSON.length;
      });
    this._authService.getAllProducts()
      .subscribe(response => {
        let productsJSON = JSON.parse(response._body);
        this.totalProducts = productsJSON.length;
      });
    this._authService.getAllStores()
      .subscribe(response => {
        let storesJSON = JSON.parse(response._body);
        this.totalStores = storesJSON.length;
      });
  }
  
  ngDoCheck() {
    console.log('');
  }
  
    // this.externalScriptUrl = "<script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js'></script>" +
    //                         "<script src='https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js'></script>" +
    //                         "<script src='/public/javascript/embed-api/components/view-selector2.js'></script>" +
    //                         "<script src='/public/javascript/embed-api/components/date-range-selector.js'></script>" +
    //                         "<script src='/public/javascript/embed-api/components/active-users.js'></script>" +
    //                         "<link rel='stylesheet' href='/public/css/chartjs-visualizations.css'>";
    // console.log("ngOninit");
       //                     this.loadScript(this.externalScriptUrl);
  //   this._authService.getCountOfTotalStores()
  //   .subscribe(result => {
  //     console.log('Total Stores result', result);
  //     this.totalStores = result;
  //   });
  
  // this._authService.getCountOfTotalUsers()
  //   .subscribe(result => {
  //     console.log('result USers', result);
  //     this.totalUsers = result;
  //   });
  
  // this._authService.getCountOfTotalProducts()
  //   .subscribe(result => {
  //     console.log('result Products', result);
  //     this.totalProducts = result;
  //   });

//   public loadScript(url) {
//     console.log('preparing to load...');
//     // let node = document.createElement('script');
//     // node.src = url;
//     // node.type = 'text/javascript';
//     // node =rul
//     document.getElementsByTagName('head')[0].appendChild(url);
//  }

}
