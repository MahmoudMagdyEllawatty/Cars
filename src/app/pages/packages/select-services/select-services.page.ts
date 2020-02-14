import {Component, Input, OnInit} from '@angular/core';
import {PackageService, PackageServices} from '../../../services/package.service';
import {Service, ServiceService} from '../../../services/service.service';
import {ModalController} from '@ionic/angular';
import {ServiceGroup} from '../../../services/service-group.service';

@Component({
  selector: 'app-select-services',
  templateUrl: './select-services.page.html',
  styleUrls: ['./select-services.page.scss'],
})
export class SelectServicesPage implements OnInit {
  selectedServices: Service[];
  services: Service[];
  @Input() group: ServiceGroup;
  @Input() groupId: string;
  amount: number;
  constructor(private serviceService: ServiceService,
              private modalController: ModalController) { }

  ngOnInit() {
    this.serviceService.getServices()
        .subscribe(data => {
          this.services = [];
          data.forEach( item => {
            if (item.serviceGroup === this.groupId) {
              this.services.push(item);
            }
          });
        });
  }

  done() {
    const packageService: PackageServices = {
      serviceGroup: this.group,
      services: this.selectedServices,
      amount: this.amount
    };

    this.modalController.dismiss({
      data: packageService
    });
  }

  cancel() {
    this.modalController.dismiss();
  }
}
