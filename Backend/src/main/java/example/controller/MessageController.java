package example.controller;

import example.models.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
@CrossOrigin(origins="http://localhost:4200", allowedHeaders = "*", allowCredentials = "true")
public class MessageController{

    /**
     * <p>Creates a new message</p>
     * @param message
     * @return
     * @throws Exception
     */
    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public Message send(Message message) throws Exception {
        return new Message(message.getMessage(), message.getUsername());
    }

}
