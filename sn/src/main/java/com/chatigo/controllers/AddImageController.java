package com.chatigo.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.chatigo.enums.ValidateStatus;
import com.chatigo.models.AddImage;
import com.github.cliftonlabs.json_simple.JsonObject;

@Controller
public class AddImageController {
	@RequestMapping(value = "/addImage", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> addImage(@RequestParam MultipartFile file, @RequestParam int userId) {
		AddImage mainImage = new AddImage(file, userId);
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
}
