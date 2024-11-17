import { Observable } from 'rxjs';
import { EventTypes } from './event-types';
import { OidcClientNotification } from './notification';
import * as i0 from "@angular/core";
export declare class PublicEventsService {
    private readonly notify;
    /**
     * Fires a new event.
     *
     * @param type The event type.
     * @param value The event value.
     */
    fireEvent<T>(type: EventTypes, value?: T): void;
    /**
     * Wires up the event notification observable.
     */
    registerForEvents(): Observable<OidcClientNotification<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PublicEventsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PublicEventsService>;
}
