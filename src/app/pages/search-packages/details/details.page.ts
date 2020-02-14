import { Component, OnInit } from '@angular/core';
import {Package, PackageService} from '../../../services/package.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  aPackage: Package;

  constructor(private activatedRoute: ActivatedRoute,
              private packageService: PackageService) {
  }

  ngOnInit() {
    this.aPackage = {
      id: '',
      name: '',
      state: 0,
      price: 0,
      description: '',
      packageServices: []
    };

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.packageService.getPackageById(id)
        .subscribe(data => {
          this.aPackage = data;
        });
  }

}
