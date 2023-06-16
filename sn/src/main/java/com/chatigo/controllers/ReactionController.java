package com.chatigo.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.chatigo.enums.ValidateStatus;
import com.chatigo.models.Reaction;
import com.github.cliftonlabs.json_simple.JsonObject;

@Controller
public class ReactionController {
    @RequestMapping(value="/reaction", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> reaction(@RequestBody Reaction reaction) {
        JsonObject jo = new JsonObject();
        try {
            jo.put("isLiked", reaction.getIsLiked());
            jo.put("likeCount", reaction.getLikeCount());
            jo.put("message", reaction.getResponseMessage());
            if(reaction.getValidateStatus() != ValidateStatus.OK) {
                return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(jo, HttpStatus.OK);
        }
        catch(Exception ex) {
            jo.put("message", ex.getMessage());
            return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
        }
    }
}