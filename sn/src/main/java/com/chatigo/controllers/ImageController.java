package com.chatigo.controllers;

import java.awt.image.BufferedImage;
import java.io.*;
import java.util.List;

import javax.imageio.ImageIO;

import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.UrlFilenameViewController;

import com.chatigo.enums.ValidateStatus;
import com.chatigo.models.MainImage;
import com.chatigo.models.UserAuthorization;
import com.github.cliftonlabs.json_simple.JsonObject;

import org.springframework.batch.admin.web.FileController;

import java.util.logging.Logger;

@Controller
public class ImageController {
	
	
	//@RequestParam MultipartFile file, @RequestParam int userId
	
	@RequestMapping(value = "/mainImage", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> uploadAvatar(@RequestParam MultipartFile file, @RequestParam int userId) {
		MainImage mainImage = new MainImage(file, userId);
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
