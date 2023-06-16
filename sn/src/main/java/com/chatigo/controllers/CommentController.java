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
import com.chatigo.enums.ValidateStatus;
import com.chatigo.models.Comment;
import com.chatigo.models.CommentToSend;
import com.chatigo.models.PostToSend;
import com.github.cliftonlabs.json_simple.JsonObject;

@Controller
public class CommentController {
	@RequestMapping(value="/createComment", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> checkAuth(@RequestBody Comment comment) {
		JsonObject jo = new JsonObject();
		try {
			jo.put("message", comment.getResponseMessage());
			if(comment.getValidateStatus() != ValidateStatus.OK) {
				return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity<>(jo, HttpStatus.OK);
		}
		catch(Exception ex) {
			jo.put("message", ex.getMessage());
			return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value="/getComments", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> getComments(@RequestParam int postId) {
		JsonObject jo = new JsonObject();
		System.out.println();
		DataBaseConnection dbconnection = new DataBaseConnection();
		try {
			ArrayList<CommentToSend> comments = dbconnection.getComments(postId);
			if(comments == null) {
				return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
			}
			jo.put("comments", comments);
			return new ResponseEntity<>(jo, HttpStatus.OK);
		}
		catch(Exception ex) {
			jo.put("message", ex.getMessage());
			return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
		}
	}
}