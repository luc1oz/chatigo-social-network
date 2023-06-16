package com.chatigo.controllers;

import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.github.cliftonlabs.json_simple.JsonObject;

import com.chatigo.enums.*;
import com.chatigo.models.UserRegistrate;

@Controller
public class RegController {
	
	@RequestMapping(value="/user/reg", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<?> checkReg(@RequestBody UserRegistrate userRegistrate) {
		JsonObject jo = new JsonObject();
		try {
			System.out.println(userRegistrate.getUserEmail());
			jo.put("message", userRegistrate.getResponseMessage());
			if(userRegistrate.getValidateStatus() != ValidateStatus.OK) {
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