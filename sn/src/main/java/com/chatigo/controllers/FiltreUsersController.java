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
import com.chatigo.models.PostToSend;
import com.github.cliftonlabs.json_simple.JsonObject;

@Controller
public class FiltreUsersController {
	@RequestMapping(value="/getAllFriends", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> allFriends(@RequestParam int userId) {
		JsonObject jo = new JsonObject();
		DataBaseConnection dbconnection = new DataBaseConnection();
		try {
			ArrayList<FiltreUsers> users = dbconnection.getAllFriendsByUser(userId);
			if(users == null) {
				return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
			}
			jo.put("users", users);
			return new ResponseEntity<>(jo, HttpStatus.OK);
		}
		catch(Exception ex) {
			jo.put("message", ex.getMessage());
			return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value="/getFriendsOnline", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> friendsOnline(@RequestParam int userId) {
		JsonObject jo = new JsonObject();
		DataBaseConnection dbconnection = new DataBaseConnection();
		try {
			ArrayList<FiltreUsers> users = dbconnection.getFriendsOnlineByUser(userId);
			if(users == null) {
				return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
			}
			jo.put("users", users);
			return new ResponseEntity<>(jo, HttpStatus.OK);
		}
		catch(Exception ex) {
			jo.put("message", ex.getMessage());
			return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value="/getRequestsInFriends", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> requestsInFriends(@RequestParam int userId) {
		JsonObject jo = new JsonObject();
		DataBaseConnection dbconnection = new DataBaseConnection();
		try {
			ArrayList<FiltreUsers> users = dbconnection.getRequestsInFriendsByUser(userId);
			if(users == null) {
				return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
			}
			jo.put("users", users);
			return new ResponseEntity<>(jo, HttpStatus.OK);
		}
		catch(Exception ex) {
			jo.put("message", ex.getMessage());
			return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value="/getMyRequestsInFriends", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> MyRequestsInFriends(@RequestParam int userId) {
		JsonObject jo = new JsonObject();
		DataBaseConnection dbconnection = new DataBaseConnection();
		try {
			ArrayList<FiltreUsers> users = dbconnection.getMyRequestsInFriendsByUser(userId);
			if(users == null) {
				return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
			}
			jo.put("users", users);
			return new ResponseEntity<>(jo, HttpStatus.OK);
		}
		catch(Exception ex) {
			jo.put("message", ex.getMessage());
			return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value="/getAllUsers", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> allUsers(@RequestParam int userId) {
		JsonObject jo = new JsonObject();
		DataBaseConnection dbconnection = new DataBaseConnection();
		try {
			ArrayList<FiltreUsers> users = dbconnection.getAllUsersByUser(userId);
			System.out.println(users.get(0).getUserId() + " " + users.get(0).getOnline());
			if(users == null) {
				return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
			}
			jo.put("users", users);
			return new ResponseEntity<>(jo, HttpStatus.OK);
		}
		catch(Exception ex) {
			jo.put("message", ex.getMessage());
			return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
		}
	}
}
