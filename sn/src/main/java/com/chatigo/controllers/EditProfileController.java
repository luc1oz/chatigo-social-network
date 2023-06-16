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
import com.chatigo.models.EditProfile;
import com.github.cliftonlabs.json_simple.JsonObject;

@Controller
public class EditProfileController {
    @RequestMapping(value = "/editProfile", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> updateSettings(@RequestBody EditProfile ep) {
        JsonObject jo = new JsonObject();
        try {
            jo.put("message", ep.getResponseMessage());
            if(ep.getValidateStatus() != ValidateStatus.OK) {
                return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(jo, HttpStatus.OK);
        }
        catch(Exception ex) {
            jo.put("message", ex.getMessage());
            return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
        }

    }
    
    @RequestMapping(value = "/deletePhoto", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> deletePhoto(@RequestParam int userId) {
        JsonObject jo = new JsonObject();
        DataBaseConnection dbconnection = new DataBaseConnection();
        try {
            dbconnection.deleteProfileMessage(userId);
            jo.put("message", "ok");
            return new ResponseEntity<>(jo, HttpStatus.OK);
        }
        catch(Exception ex) {
            jo.put("message", ex.getMessage());
            return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
        }

    }
}