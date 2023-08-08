import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class LightGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() io: Server;
  handleConnection(socket: Socket) {
    this.io.emit('message', 'This is light');
  }
  handleDisconnect(socket: Socket) {}

  afterInit(server: Server) {}

  @SubscribeMessage('lightMessage')
  handleMessage(socket: Socket, payload: any): void {}
}
