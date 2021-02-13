import { action, observable } from 'mobx';
import { OrderType } from './typings/common';

class Order {
	@observable orderType: OrderType = 'cheaperFirst';

	@action setOrderType(newOrderType: OrderType): void {
		this.orderType = newOrderType;
	}
}

export const orderStore = new Order();
