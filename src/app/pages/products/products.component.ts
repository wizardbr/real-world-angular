import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products/products.service';

import { listStateTrigger, fadeIn } from 'src/app/shared/helpers/animations';
import { faBars, faTh, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { wait } from 'src/app/shared/helpers/ui.helper';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [listStateTrigger, fadeIn],
})
export class ProductsComponent implements OnInit {
  collection = [];
  faBars = faBars;
  faTh = faTh;
  faChevronDown = faChevronDown;
  showEffects: boolean;
  loadingProducts = false;

  constructor(
    private productsService: ProductsService,
  ) {
  }

  async ngOnInit() {
    this.loadingProducts = true;

    await this.getAllProducts()
      .then((products) => {
        this.collection = products.items;
        this.loadingProducts = false;
      });

    wait(500)
      .then(() => {
        this.showEffects = true;
      });

  }

  getAllProducts(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.productsService
        .getProducts()
        .subscribe(response => resolve(response), error => reject(error));
    });
  }

  generateArray(count: number): Array<number> {
    const indexes = [];
    for (let i = 0; i < count; i++) {
      indexes.push(i);
    }
    return indexes;
  }

}
