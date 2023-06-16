package com.chatigo.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.chatigo.database.DataBaseConnection;
import com.chatigo.enums.ValidateStatus;
import com.chatigo.models.Post;
import com.github.cliftonlabs.json_simple.JsonObject;

@Controller
public class PostController {
	@RequestMapping(value = "/post", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> message(@RequestParam int userId, @RequestParam(defaultValue = "") String text, @RequestParam(required = false) MultipartFile file) {
		Post mainImage;
		if(file == null) {
			mainImage = new Post(userId, text);
		}
		else {
			mainImage = new Post(userId, text, file);
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
	
	@RequestMapping(value = "/deletePost", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> deletePost(@RequestParam int postId) {
        JsonObject jo = new JsonObject();
        try {
            DataBaseConnection dbconnection = new DataBaseConnection();
            dbconnection.deletePost(postId);
            jo.put("message", "ok.");
            return new ResponseEntity<>(jo, HttpStatus.OK);
        }
        catch(Exception ex) {
            jo.put("message", ex.getMessage());
            return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
        }

    }
}
