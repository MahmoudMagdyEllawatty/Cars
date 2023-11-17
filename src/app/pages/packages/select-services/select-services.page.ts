import {Component, Input, OnInit} from '@angular/core';
import {PackageService, PackageServices} from '../../../services/package.service';
import {Service, CategoriesService} from '../../../services/categories.service';
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
  @Input() oldServices: Service[];
  @Input() oldAmount: number;

  amount: number;
  constructor(private serviceService: CategoriesService,
              private modalController: ModalController) { }

  conmpare(o1, o2) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
  ngOnInit() {
    this.amount = this.oldAmount;
    this.selectedServices = this.oldServices;
    console.log(this.oldServices);
    console.log(this.oldAmount);
    this.serviceService.getServices()
        .subscribe(data => {
          this.services = [];
          data.forEach( item => {
            if (item.id === this.groupId) {
              this.services.push(item);
            }
          });
        });
  }

  done() {
    if (this.selectedServices.length > 0) {
      const packageService: PackageServices = {
        serviceGroup: this.group,
        services: this.selectedServices,
        amount: this.amount
      };

      this.modalController.dismiss({
        data: packageService
      });
    } else {
      alert('Enter Data First');
    }

  }

  cancel() {
    this.modalController.dismiss();
  }
}
