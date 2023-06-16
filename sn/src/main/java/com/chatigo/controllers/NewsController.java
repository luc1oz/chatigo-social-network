package com.chatigo.controllers;

import java.io.File;
import java.io.FileInputStream;
import java.nio.file.Files;
import java.util.Base64;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.apache.commons.io.FileUtils;
import org.springframework.boot.autoconfigure.web.ServerProperties.Tomcat.Resource;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import com.github.cliftonlabs.json_simple.JsonObject;
import com.chatigo.database.DataBaseConnection;
import com.chatigo.enums.ValidateStatus;
import com.chatigo.models.News;
import com.chatigo.models.PostToSend;

@Controller
public class NewsController {
	@RequestMapping(value="/getAvatar", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> avatar(@RequestBody News news) {
		JsonObject jo = new JsonObject();
		try {
			byte[] fileContent = FileUtils.readFileToByteArray(new File(news.getPath()));
			String encodedString = Base64.getEncoder().encodeToString(fileContent);
			jo.put("image", encodedString);
			jo.put("message", news.getResponseMessage());
			if(news.getValidateStatus() != ValidateStatus.OK) {
				return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity<>(jo, HttpStatus.OK);
		}
		catch(Exception ex) {
			jo.put("message", ex.getMessage());
			return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value="/newsPosts", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> posts(@RequestParam int userId) {
		JsonObject jo = new JsonObject();
		System.out.println();
		DataBaseConnection dbconnection = new DataBaseConnection();
		try {
			ArrayList<PostToSend> posts = dbconnection.getPostsForNews(userId);
			if(posts == null) {
				return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
			}
			jo.put("posts", posts);
			return new ResponseEntity<>(jo, HttpStatus.OK);
		}
		catch(Exception ex) {
			jo.put("message", ex.getMessage());
			return new ResponseEntity<>(jo, HttpStatus.BAD_REQUEST);
		}
	}
}