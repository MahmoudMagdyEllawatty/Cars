import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../../services/user.service';
import {OrderService} from '../../../../../services/order.service';
import {Package, PackageServices, PackageService} from '../../../../../services/package.service';
import {IonSlides, ModalController} from '@ionic/angular';
import {Service} from '../../../../../services/service.service';
import {ServiceGroup} from '../../../../../services/service-group.service';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.page.html',
  styleUrls: ['./step3.page.scss'],
})
export class Step3Page implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private orderService: OrderService,
              public modalController: ModalController,
              private router: Router,
              private packageService: PackageService) { }
  aPackage: Package;

  @ViewChild(IonSlides, {static: false}) slider: IonSlides;
  // slideOpts = {
  //   on: {
  //     beforeInit() {
  //       const swiper = this;
  //       swiper.classNames.push(`${swiper.params.containerModifierClass}flip`);
  //       swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
  //       const overwriteParams = {
  //         slidesPerView: 1,
  //         slidesPerColumn: 1,
  //         slidesPerGroup: 1,
  //         watchSlidesProgress: true,
  //         spaceBetween: 0,
  //         virtualTranslate: true,
  //       };
  //       swiper.params = Object.assign(swiper.params, overwriteParams);
  //       swiper.originalParams = Object.assign(swiper.originalParams, overwriteParams);
  //     },
  //     setTranslate() {
  //       const swiper = this;
  //       const { $, slides, rtlTranslate: rtl } = swiper;
  //       for (let i = 0; i < slides.length; i += 1) {
  //         const $slideEl = slides.eq(i);
  //         let progress = $slideEl[0].progress;
  //         if (swiper.params.flipEffect.limitRotation) {
  //           progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
  //         }
  //         const offset$$1 = $slideEl[0].swiperSlideOffset;
  //         const rotate = -180 * progress;
  //         let rotateY = rotate;
  //         let rotateX = 0;
  //         let tx = -offset$$1;
  //         let ty = 0;
  //         if (!swiper.isHorizontal()) {
  //           ty = tx;
  //           tx = 0;
  //           rotateX = -rotateY;
  //           rotateY = 0;
  //         } else if (rtl) {
  //           rotateY = -rotateY;
  //         }
  //
  //         $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;
  //
  //         if (swiper.params.flipEffect.slideShadows) {
  //           // Set shadows
  //           // tslint:disable-next-line:max-line-length
  // tslint:disable-next-line:max-line-length
  //           let shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
  //           // tslint:disable-next-line:max-line-length
  // tslint:disable-next-line:max-line-length
  //           let shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
  //           if (shadowBefore.length === 0) {
  //             shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'left' : 'top'}"></div>`);
  //             $slideEl.append(shadowBefore);
  //           }
  //           if (shadowAfter.length === 0) {
  //             shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'right' : 'bottom'}"></div>`);
  //             $slideEl.append(shadowAfter);
  //           }
  //           if (shadowBefore.length) { shadowBefore[0].style.opacity = Math.max(-progress, 0); }
  //           if (shadowAfter.length) { shadowAfter[0].style.opacity = Math.max(progress, 0); }
  //         }
  //         $slideEl
  //             .transform(`translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  //       }
  //     },
  //     setTransition(duration) {
  //       const swiper = this;
  //       const { slides, activeIndex, $wrapperEl } = swiper;
  //       slides
  //           .transition(duration)
  //           .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
  //           .transition(duration);
  //       if (swiper.params.virtualTranslate && duration !== 0) {
  //         let eventTriggered = false;
  //         // eslint-disable-next-line
  //         slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
  //           if (eventTriggered) { return; }
  //           if (!swiper || swiper.destroyed) { return; }
  //
  //           eventTriggered = true;
  //           swiper.animating = false;
  //           const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
  //           // tslint:disable-next-line:prefer-for-of
  //           for (let i = 0; i < triggerEvents.length; i += 1) {
  //             $wrapperEl.trigger(triggerEvents[i]);
  //           }
  //         });
  //       }
  //     }
  //   }
  // };
  services: Service[] = [];
  services1: Service[] = [];
  packageServices: PackageServices[] = [];
  PackageService: PackageServices[] = [];
  cIndex = 0;
  segmentChanged(ev: any) {
    if (ev.detail.value === 'cold') {
      this.cIndex = 0;
    } else {
      this.cIndex = 1;
    }
    console.log('Segment changed', ev.detail.value);
  }

  ngOnInit() {
    this.aPackage = this.packageService.package;
    // cold
    this.aPackage.packageServices.forEach(item => {
      if (item.serviceGroup.id === 'Pe7LRkTHa6lJ75NkrhFu') {
        this.PackageService.push(item);
      }
    });
    // hot
    this.aPackage.packageServices.forEach(item => {
      if (item.serviceGroup.id === 'hxrtYtMXGg0WmDlz724L') {
        this.PackageService.push(item);
      }
    });

    const ser: Service = {
      id: '',
      name: '',
      serviceGroup: '',
      price: 0,
      description: '',
      file: ''
    };
    this.services.push(ser);
    this.services.push(ser);
    console.log(this.aPackage);
    console.log(this.orderService.order);
  }

  backData(i) {
    const url = 'user-dashboard/tab1/details/' + this.aPackage.id + '/step2';
    this.router.navigate([url]);
  }
  showData(i) {
    if (this.packageServices[0] === undefined || this.packageServices[1] === undefined) {
      alert('Please Select Service First');
    } else if (this.PackageService[0].amount !== this.packageServices[0].services.length) {
      alert('Please Select Service First');
    } else if (this.PackageService[1].amount !== this.packageServices[1].services.length) {
      alert('Please Select Service First');
    } else {
      console.log(this.packageServices);
      const order = this.orderService.order;
      let index = 0;
      let exist = false;
      order.servicePackage.forEach(item => {
        if (item.serviceGroup.id === this.PackageService[0].serviceGroup.id) {
          exist = true;
        } else {
          index += 1;
        }
      });
      if (exist) {
        order.servicePackage.splice(index,1);
      }
      index = 0;
      exist = false;
      order.servicePackage.forEach(item => {
        if (item.serviceGroup.id === this.PackageService[1].serviceGroup.id) {
          exist = true;
        } else {
          index += 1;
        }
      });
      if (exist) {
        order.servicePackage.splice(index,1);
      }


      this.packageServices.forEach(item => {
        order.servicePackage.push(item);
      });
      console.log(order);
      this.orderService.order = order;
      // const url = 'user-dashboard/tab1/details/' + this.aPackage.id + '/order/payment';
      const url = 'user-dashboard/tab1/details/' + this.aPackage.id + '/step4';
      this.router.navigate([url]);
    }
  }

  checkData(event: any, ser: Service, serGroup: ServiceGroup) {
    if (event.target.checked) {
      const index = this.packageServices.findIndex((s: PackageServices) => {
        return s.serviceGroup.id === serGroup.id;
      });
      if (index > -1) {
        const pServices: PackageServices = this.packageServices[index];
        const serS: Service[] = pServices.services;
        serS.push(ser);
        pServices.services = serS;
        this.packageServices[index] = pServices;
      } else {
        const serS: Service[] = [];
        serS.push(ser);
        const pServices: PackageServices = {
          serviceGroup: serGroup,
          amount: 0,
          services: serS
        };
        this.packageServices.push(pServices);
      }
    } else {
      const index = this.packageServices.findIndex((s: PackageServices) => {
        return s.serviceGroup.id === serGroup.id;
      });
      this.services1 = this.packageServices[index].services;
      const start = this.services1.findIndex((s: Service) => {
        return s.id === ser.id;
      });
      this.services1 = this.services1.splice(start, 1);
      this.packageServices[index].services = this.services1;
    }
  }

  slideChanged($event: CustomEvent) {
    console.log($event);
  }

  slideTap($event: CustomEvent) {

  }

  data() {
    const serGroup: ServiceGroup = this.PackageService[this.cIndex].serviceGroup;
    const index = this.packageServices.findIndex((s: PackageServices) => {
      return s.serviceGroup.id === serGroup.id;
    });
    if (index > -1) {
      const pServices: PackageServices = this.packageServices[index];
      const serS: Service[] = [];
      serS.push(this.services[0]);
      pServices.services = serS;
      this.packageServices[index] = pServices;
    } else {
      const serS: Service[] = [];
      serS.push(this.services[0]);
      const pServices: PackageServices = {
        serviceGroup: serGroup,
        amount: 0,
        services: serS
      };
      this.packageServices.push(pServices);
      console.log(this.packageServices);
    }
  }

  async openViewer(service: Service) {
    const modal = await this.modalController.create({
      component: ViewerModalComponent,
      componentProps: {
        src: service.file,
        text: service.description
      },
      cssClass: 'ion-img-viewer',
      keyboardClose: true,
      showBackdrop: true
    });

    return await modal.present();
  }

}
