package com.chatigo.controllers;

import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.chatigo.enums.ValidateStatus;
import com.chatigo.models.UserAuthorization;
import com.github.cliftonlabs.json_simple.JsonObject;

@Controller
public class AuthController {
	
	@RequestMapping(value="/auth", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> checkAuth(@RequestBody UserAuthorization userAuthorization) {
		JsonObject jo = new JsonObject();
		try {
			jo.put("userId", userAuthorization.getUserId());
			System.out.println(userAuthorization.getUserId());
			jo.put("message", userAuthorization.getResponseMessage());
			if(userAuthorization.getValidateStatus() != ValidateStatus.OK) {
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
