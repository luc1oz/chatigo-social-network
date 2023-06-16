package com.chatigo.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.chatigo.database.DataBaseConnection;
import com.chatigo.enums.ValidateStatus;
import com.chatigo.models.ChangeSettings;
import com.github.cliftonlabs.json_simple.JsonObject;

@Controller
public class NotificationController {
    @RequestMapping(value = "/getNotifications", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> getNotifications(@RequestParam int userId) {
        JsonObject jo = new JsonObject();
        DataBaseConnection dbconnection = new DataBaseConnection();
        try {

            int chatCount = dbconnection.getChatNotifications(userId);
            int userCount = dbconnection.getRequestNotification(userId);
            if(chatCount == -1 || userCount == -1) {
            	System.out.println("В ТФЕ");
                return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
            }
            jo.put("messages", chatCount);
            jo.put("friends", userCount);
            return new ResponseEntity<>(jo, HttpStatus.OK);
        }
        catch(Exception ex) {
            jo.put("message", ex.getMessage());
            return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
        }

    }
}