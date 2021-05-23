import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
@WebSocketGateway(4001)
export class AppGateway implements OnGatewayConnection{
    @WebSocketServer()
    wss

    handleConnection(client){
        client.emit('connection','Successfull Established Connection');
    }
}