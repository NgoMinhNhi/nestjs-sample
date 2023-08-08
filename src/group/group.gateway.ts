import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class GroupGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() io: Server;
  handleConnection(socket: Socket) {
    this.io.emit('message', 'This is group');
  }
  handleDisconnect(socket: Socket) {}

  @SubscribeMessage('groupMessage')
  handleMessage(socket: Socket, payload: any): void {}
}
