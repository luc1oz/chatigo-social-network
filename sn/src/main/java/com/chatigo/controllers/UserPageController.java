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
import com.chatigo.models.ImagesToSend;
import com.chatigo.models.PostToSend;
import com.chatigo.models.UserPage;
import com.github.cliftonlabs.json_simple.JsonObject;

@Controller
public class UserPageController {
	@RequestMapping(value="/infoUser", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> infoUser(@RequestParam int sendUserId, @RequestParam int getUserId) {
		JsonObject jo = new JsonObject();
		DataBaseConnection dbconnection = new DataBaseConnection();
		int relationType;
		try {
			System.out.println(sendUserId + " " + getUserId);
			if(sendUserId == getUserId) {
				relationType = 4;
			}
			else {
				relationType = dbconnection.getRelationType(sendUserId, getUserId);
			}
			UserPage userInfo = dbconnection.getUserPageInfo(getUserId);
			userInfo.setRelation(relationType);
			if(userInfo == null) {
				return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
			}
			jo.put("userInfo", userInfo);
			return new ResponseEntity<>(jo, HttpStatus.OK);
		}
		catch(Exception ex) {
			jo.put("message", ex.getMessage());
			return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value="/getUserImages", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> getUserImages(@RequestParam int getUserId) {
        JsonObject jo = new JsonObject();
        DataBaseConnection dbconnection = new DataBaseConnection();
        try {
            ArrayList<ImagesToSend> images = dbconnection.getUserImages(getUserId);

            if(images == null) {
                return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
            }
            jo.put("userImages", images);
            return new ResponseEntity<>(jo, HttpStatus.OK);
        }
        catch(Exception ex) {
            jo.put("message", ex.getMessage());
            return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
        }
    }
	
	@RequestMapping(value="/getUserPagePosts", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> getUserPagePosts(@RequestParam int getUserId, int sendUserId) {
		JsonObject jo = new JsonObject();
		DataBaseConnection dbconnection = new DataBaseConnection();
		try {
			ArrayList<PostToSend> posts = dbconnection.getUserPagePosts(getUserId, sendUserId);
			if(posts == null) {
				return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
			}
			jo.put("userPosts", posts);
			return new ResponseEntity<>(jo, HttpStatus.OK);
		}
		catch(Exception ex) {
			jo.put("message", ex.getMessage());
			return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
		}
	}
}