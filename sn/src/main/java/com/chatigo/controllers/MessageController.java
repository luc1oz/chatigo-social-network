package com.chatigo.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.chatigo.database.DataBaseConnection;
import com.chatigo.enums.ValidateStatus;
import com.chatigo.models.ChatInfo;
import com.chatigo.models.Message;
import com.chatigo.models.MessageFromWebsocket;
import com.chatigo.models.MessagesToSend;
import com.github.cliftonlabs.json_simple.JsonObject;

@Controller
public class MessageController {
	
	@Autowired
	private SimpMessagingTemplate template;
	
	@RequestMapping(value = "/createMessage", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> message(@RequestParam int chatId, @RequestParam int userId, @RequestParam(defaultValue = "") String text, @RequestParam(required = false) MultipartFile file) {
		Message mainImage;
		if(file == null) {
			mainImage = new Message(chatId, userId, text);
		}
		else {
			mainImage = new Message(chatId, userId, text, file);
		}
		JsonObject jo = new JsonObject();
		try {
			jo.put("message", mainImage.getResponseMessage());
			if(mainImage.getValidateStatus() != ValidateStatus.OK) {
				return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity<>(jo, HttpStatus.OK);
		}
		catch(Exception ex) {
			jo.put("message", ex.getMessage());
			return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
		}
	    
	}
	
	@RequestMapping(value = "/getMessages", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> message(@RequestParam int chatId, int userId) {
        JsonObject jo = new JsonObject();
        DataBaseConnection dbconnection = new DataBaseConnection();
        try {
        	dbconnection.setReadMessages(chatId, userId);
            ArrayList<MessagesToSend> messages = dbconnection.getChatMessages(chatId);
            jo.put("messages", messages);
            if(messages == null) {
                return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(jo, HttpStatus.OK);
        }
        catch(Exception ex) {
            jo.put("message", ex.getMessage());
            return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
        }

    }
	
	@RequestMapping(value = "/getChatInfo", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> getChatInfo(@RequestParam int chatId, int userId) {
        JsonObject jo = new JsonObject();
        DataBaseConnection dbconnection = new DataBaseConnection();
        try {
            ChatInfo chatInfo = dbconnection.getChatInfo(chatId, userId);
            jo.put("info", chatInfo);
            if(chatInfo == null) {
                return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(jo, HttpStatus.OK);
        }
        catch(Exception ex) {
            jo.put("message", ex.getMessage());
            return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
        }

    }
	
	@RequestMapping(value = "/readMessages", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> readMessages(@RequestParam int chatId, int userId) {
        JsonObject jo = new JsonObject();
        DataBaseConnection dbconnection = new DataBaseConnection();
        try {
            dbconnection.setReadMessages(chatId, userId);
            jo.put("message", "ok.");
            return new ResponseEntity<>(jo, HttpStatus.OK);
        }
        catch(Exception ex) {
            jo.put("message", ex.getMessage());
            return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
        }

    }
	
	@MessageMapping("/chat-message")
    public void receiveMessage(MessageFromWebsocket mfw) throws InterruptedException {
		mfw.setNotificationType(1);
		
        System.out.println("here");
        
        template.convertAndSendToUser(String.valueOf(mfw.getChatId()), "/message", mfw); // /chat/{chatid}/message
    }
	
	@MessageMapping("/read-message")
    public void readMessage(MessageFromWebsocket mfw) throws InterruptedException {
		mfw.setNotificationType(0);
		
//		DataBaseConnection dbconnection = new DataBaseConnection();
//		dbconnection.setReadMessages(mfw.getChatId(), mfw.getUserId());
        System.out.println("here");
        
        template.convertAndSendToUser(String.valueOf(mfw.getChatId()), "/message", mfw); // /chat/{chatid}/message
    }

}
