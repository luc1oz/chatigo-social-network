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
import com.chatigo.models.Relation;
import com.github.cliftonlabs.json_simple.JsonObject;

@Controller
public class ChangeSettingsController {
    @RequestMapping(value = "/updateSettings", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> updateSettings(@RequestBody ChangeSettings cs) {
        JsonObject jo = new JsonObject();
        try {
            jo.put("message", cs.getResponseMessage());
            if(cs.getValidateStatus() != ValidateStatus.OK) {
                return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(jo, HttpStatus.OK);
        }
        catch(Exception ex) {
            jo.put("message", ex.getMessage());
            return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
        }

    }
    
    @RequestMapping(value = "/checkPassword", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> checkPassword(@RequestParam int userId, String password) {
        JsonObject jo = new JsonObject();
        DataBaseConnection dbconnection = new DataBaseConnection();
        try {
        	System.out.println(dbconnection.equalPasswords(userId, password));
            if(!dbconnection.equalPasswords(userId, password)) {
                jo.put("message", "Wrong passsword.");
                return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
            }
            jo.put("message", "Ok.");
            return new ResponseEntity<>(jo, HttpStatus.OK);
        }
        catch(Exception ex) {
            jo.put("message", ex.getMessage());
            return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
        }
    }
}