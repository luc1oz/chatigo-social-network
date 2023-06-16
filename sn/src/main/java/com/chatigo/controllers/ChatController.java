package com.chatigo.controllers;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.chatigo.database.DataBaseConnection;
import com.chatigo.models.ChatToSend;
import com.chatigo.models.CreateChat;
import com.chatigo.models.UserPage;
import com.github.cliftonlabs.json_simple.JsonObject;

@Controller
public class ChatController {
	@RequestMapping(value="/getChats", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> getChats(@RequestParam int userId) {
		JsonObject jo = new JsonObject();
		DataBaseConnection dbconnection = new DataBaseConnection();
		try {
			ArrayList<ChatToSend> chats = dbconnection.getAllChats(userId);
			if(chats == null) {
				return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
			}
			jo.put("chats", chats);
			return new ResponseEntity<>(jo, HttpStatus.OK);
		}
		catch(Exception ex) {
			jo.put("message", ex.getMessage());
			return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value="/createChat", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> getChats(@RequestBody CreateChat users) {
        JsonObject jo = new JsonObject();
        DataBaseConnection dbconnection = new DataBaseConnection();
       
        try {
            if(users.getUsers().size() > 2) {
                dbconnection.createGroupChat(users.getUsers());
            }
            else {
            	int chatId = -1;
                chatId = dbconnection.createPrivateChat(users.getUsers().get(0), users.getUsers().get(1));
                jo.put("chatId", chatId);
                if(chatId == -1) {
                    jo.put("message", "bad.");
                    return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
                }
            }
            jo.put("message", "ok.");
            return new ResponseEntity<>(jo, HttpStatus.OK);
        }
        catch(Exception ex) {
            jo.put("message", ex.getMessage());
            return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
        }
    }
}