import { Ticket } from '../../typings/interfaces';

export interface SearchIdResponse {
	searchId: string;
}

export interface TicketsResponse {
	stop: boolean;

	tickets: Ticket[];
}
