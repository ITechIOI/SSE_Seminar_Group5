import { Controller, Sse, Query } from '@nestjs/common';
import { Observable, interval } from 'rxjs';
import { map, filter } from 'rxjs/operators';

export interface MessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}

@Controller('api')
export class AppController {
  private events = []; 

  constructor() {
    for (let i = 1; i <= 50; i++) {
      this.events.push({
        id: `${i}`,
        data: { message: `Message #${i}` },
      });
    }
  }

  @Sse('events')
  sendEvents(@Query('last-event-id') lastEventId: string): Observable<MessageEvent> {
    const startId = lastEventId ? parseInt(lastEventId, 10) + 1 : 1;

    return interval(1000).pipe(
      map((index) => this.events[startId - 1 + index]), 
      filter(event => !!event), 
      map(event => ({
        id: event.id,
       // type: 'customEvent',
        data: event.data,
        retry: 3000,
      }))
    );
  }
}
