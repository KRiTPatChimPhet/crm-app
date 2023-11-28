import { Pipe, PipeTransform } from '@angular/core';
import { ORDER_STATUS_MAP } from 'src/app/core/orders/const/order-status-map.const';
import { OrderStatus } from 'src/app/core/orders/enums/order-status.enums';
@Pipe({
  name: 'thaiOrderStatus',
})
export class ThaiOrderStatusPipe implements PipeTransform {
  transform(value: OrderStatus): string {
    return ORDER_STATUS_MAP[value] || '';
  }
}
