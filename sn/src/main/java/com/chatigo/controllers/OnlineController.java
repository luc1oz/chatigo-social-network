package com.chatigo.controllers;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.chatigo.database.DataBaseConnection;
import com.chatigo.models.FiltreUsers;
import com.github.cliftonlabs.json_simple.JsonObject;

@Controller
public class OnlineController {
    @RequestMapping(value="/setOnline", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> setOline(@RequestParam int userId) {
        JsonObject jo = new JsonObject();
        DataBaseConnection dbconnection = new DataBaseConnection();
        try {
            dbconnection.setOnlineStatus(userId);
            jo.put("message", "ok.");
            return new ResponseEntity<>(jo, HttpStatus.OK);
        }
        catch(Exception ex) {
            jo.put("message", ex.getMessage());
            return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value="/unsetOnline", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> unsetOline(@RequestParam int userId) {
        JsonObject jo = new JsonObject();
        DataBaseConnection dbconnection = new DataBaseConnection();
        try {
            dbconnection.unsetOnlineStatus(userId);
            jo.put("message", "ok.");
            return new ResponseEntity<>(jo, HttpStatus.OK);
        }
        catch(Exception ex) {
            jo.put("message", ex.getMessage());
            return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
        }
    }
}