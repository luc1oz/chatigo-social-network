package com.chatigo.models;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.springframework.web.multipart.MultipartFile;

import com.chatigo.database.DataBaseConnection;
import com.chatigo.enums.ValidateStatus;

public class Post {
	private int userId;
	private String text;
	private MultipartFile file;
	private String path;
	private String responseMessage = "Ok.";
	private ValidateStatus validate = ValidateStatus.OK;
	private DataBaseConnection dbconnection = new DataBaseConnection();
	
	public Post(int userId, String text, MultipartFile file) {
		setUserId(userId);
		setText(text);
		setFile(file);
		
		int postId;
		if(validate == ValidateStatus.OK) {
			try {
				dbconnection.addNewPost(this);
				postId = dbconnection.getLastPostId();
				
				Files.createDirectories(Paths.get(dbconnection.getPhotoPath() + "posts\\" + postId ));
				file.transferTo(new File(dbconnection.getPhotoPath() + "posts\\" + postId + "\\" +  file.getOriginalFilename()));
				path = dbconnection.getPhotoPath() + "posts\\" + postId + "\\" +  file.getOriginalFilename();
				
				dbconnection.addImageToImage(path);
				dbconnection.addPostImage(postId, path);
				
			}
			catch(Exception ex) {
				ex.printStackTrace();
				responseMessage = "Something wrong.";
				validate = ValidateStatus.BAD_VALIDATE;
			}
		}
	}
	
	public Post(int userId, String text) {
		setUserId(userId);
		setText(text);
		
		if(validate == ValidateStatus.OK) {
			try {
				
				dbconnection.addNewPostWithoutImage(this);
			}
			catch(Exception ex) {
				ex.printStackTrace();
				responseMessage = "Something wrong.";
				validate = ValidateStatus.BAD_VALIDATE;
			}
		}
	}
	
	public void setUserId(int userId) {
		if(dbconnection.checkUserById(userId)) {
			this.userId = userId;
		}
		else {
			responseMessage = "User does not exist.";
			validate = ValidateStatus.BAD_VALIDATE;
		}
	}
	
	public int getUserId() {
		return userId;
	}
	
	public void setText(String text) {
		this.text = text;
	}
	
	public String getText() {
		return text;
	}
	
	public void setFile(MultipartFile file) {
		this.file = file;
	}
	
	public MultipartFile getFile() {
		return file;
	}
	
	public ValidateStatus getValidateStatus() {
		return validate;
	}
	
	public String getResponseMessage() {
		return responseMessage;
	}
	
	public String getPath() {
		return path;
	}
}
