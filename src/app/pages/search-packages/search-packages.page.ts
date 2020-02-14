import { Component, OnInit } from '@angular/core';
import {Package, PackageService} from '../../services/package.service';

@Component({
  selector: 'app-search-packages',
  templateUrl: './search-packages.page.html',
  styleUrls: ['./search-packages.page.scss'],
})
export class SearchPackagesPage implements OnInit {
  packages: Package[];
  allPackages: Package[];
  constructor(private packageService: PackageService) { }

  ngOnInit() {
    this.packageService.getPackages()
        .subscribe(data => {
          this.packages = [];
          this.allPackages = [];

          data.forEach(item => {
            this.packages.push(item);
            this.allPackages.push(item);
          });
        });
  }

  search(ev: any) {
    this.packages = this.allPackages;
    const searchTerm = ev.target.value;

    if (!searchTerm) {
      return;
    }

    this.packages = this.packages.filter(item => {
      if (item.name && searchTerm) {
        return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      }
    });

  }
}
