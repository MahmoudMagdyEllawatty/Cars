import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Package, PackageService} from '../../services/package.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.page.html',
  styleUrls: ['./packages.page.scss'],
})
export class PackagesPage implements OnInit {
  packages: Observable<Package[]>;
  constructor(private packageService: PackageService,
              private router: Router) { }

  ngOnInit() {
    this.packages = this.packageService.getPackages();
  }

  delete(aPackage: Package) {

  }

  view(aPackage: Package) {
    this.router.navigate(['/view-package', aPackage.id]);
  }
}
