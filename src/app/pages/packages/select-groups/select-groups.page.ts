import {Component, Input, OnInit} from '@angular/core';
import {PackageService, PackageServices} from '../../../services/package.service';
import {ServiceGroup, ServiceGroupService} from '../../../services/service-group.service';
import {Observable} from 'rxjs';
import {ModalController} from '@ionic/angular';
import {SelectServicesPage} from '../select-services/select-services.page';
import {runModuleAsObservableFork} from '@angular-devkit/build-angular/src/utils';
import {Service} from '../../../services/categories.service';

@Component({
  selector: 'app-select-groups',
  templateUrl: './select-groups.page.html',
  styleUrls: ['./select-groups.page.scss'],
})
export class SelectGroupsPage implements OnInit {
  groups: Observable<ServiceGroup[]>;
  @Input() packageServices: PackageServices[];
  selectedPackageServices: PackageServices[];
  constructor(private groupService: ServiceGroupService,
              private modalController: ModalController) { }

  ngOnInit() {
    this.groups = this.groupService.getServiceGroups();
    this.selectedPackageServices = this.packageServices;
    console.log(this.packageServices);
  }

  async openServices(id: ServiceGroup, done: number) {
    let oldAmount = 0;
    let oldServices: Service[] = [];

    if (done === 1) {
      this.selectedPackageServices.forEach(item => {
        if (item.serviceGroup.id === id.id) {
          oldAmount = item.amount;
          oldServices = item.services;
        }
      });
    } else {
      oldAmount = 1;
      oldServices = [];
    }
    const modal = await this.modalController.create({
      component: SelectServicesPage,
      componentProps: {
        group : id,
        groupId: id.id,
        oldAmount,
        oldServices
      }
    });

    await modal.present();
    const data = await modal.onWillDismiss();

    if (data.data) {
      console.log(data.data.data.services);
      const item: PackageServices = {
        serviceGroup: data.data.data.serviceGroup,
        services: data.data.data.services,
        amount: data.data.data.amount
      };
      this.selectedPackageServices.push(item);
    }
  }

  done() {
    this.modalController.dismiss({
      data: this.selectedPackageServices
    });
    console.log(this.selectedPackageServices);
  }

  hasGroup(group: ServiceGroup) {
    return this.selectedPackageServices.find(item => {
      return item.serviceGroup.id === group.id;
    });
  }

    dismiss() {
      this.modalController.dismiss();
    }
}
