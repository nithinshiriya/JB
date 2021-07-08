import { Injectable, EventEmitter } from "@angular/core";

export interface Alert {
    type: string;
    message: string;
  }

/**
 *App Service class.
 *Provides general application releated service.
 */
@Injectable()
export class AppService {
    displayMessageEvent: EventEmitter<Alert> = new EventEmitter<Alert>();
    
    /**
     * Display alerts
     * @param message 
     * @param type 
     */
    displayMessage(message: string, type: string){
        this.displayMessageEvent.emit({message, type});
    }
 
}