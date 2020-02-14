import { Component, OnInit } from '@angular/core';
import {Package, PackageService} from '../../../services/package.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-update-package',
  templateUrl: './update-package.page.html',
  styleUrls: ['./update-package.page.scss'],
})
export class UpdatePackagePage implements OnInit {
  aPackage: Package;
  constructor(private activatedRoute: ActivatedRoute,
              private packageService: PackageService) { }

  ngOnInit() {
    this.aPackage = {
      id: '',
      packageServices: [],
      description: '',
      price: 0,
      name: '',
      state: 1
    };
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.packageService.getPackageById(id)
        .subscribe(data => {
          this.aPackage = data;
        });
  }

}
