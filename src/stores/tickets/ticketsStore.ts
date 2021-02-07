import { action, computed } from 'mobx';

import { Ticket } from '../typings/interfaces';

class Tickets {
	tickets: Ticket[] = [];

	@computed getTickets(): Ticket[] {
		return this.tickets.slice(0, 5);
	}

	@action addNewTickets(newTickets: Ticket[]): void {
		this.tickets.push(...newTickets);
	}
}

export const ticketsStore = new Tickets();
