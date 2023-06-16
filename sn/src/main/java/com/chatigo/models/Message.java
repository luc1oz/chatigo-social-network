package com.chatigo.models;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.springframework.web.multipart.MultipartFile;

import com.chatigo.database.DataBaseConnection;
import com.chatigo.enums.ValidateStatus;

public class Message {
	private int chatId;
	private int userId;
	private String text;
	private MultipartFile file = null;
	private String path;
	private String responseMessage = "Ok.";
	private ValidateStatus validate = ValidateStatus.OK;
	private DataBaseConnection dbconnection = new DataBaseConnection();
	
	public Message(int chatId, int userId, String text, MultipartFile file) {
		setChatId(chatId);
		setUserId(userId);
		setText(text);
		setFile(file);
		if(validate == ValidateStatus.OK) {
			try {
				Files.createDirectories(Paths.get(dbconnection.getPhotoPath() + "chats\\" + chatId + "\\messages"));
				file.transferTo(new File(dbconnection.getPhotoPath() + "chats\\" + chatId + "\\messages\\" +  file.getOriginalFilename()));
				path = dbconnection.getPhotoPath() + "chats\\" + chatId + "\\messages\\" +  file.getOriginalFilename();
				
				dbconnection.addImageToImage(path);
				dbconnection.addMessage(this);
			}
			catch(Exception ex) {
				
			}
		}
	}
	
	public Message(int chatId, int userId, String text) {
		setChatId(chatId);
		setUserId(userId);
		setText(text);
		
		if(validate == ValidateStatus.OK) {
			try {
				dbconnection.addMessageWithoutImage(this);
			}
			catch(Exception ex) {
				
			}
		}
	}
	
	public void setChatId(int chatId) {
		if(dbconnection.checkChatById(chatId)) {
			this.chatId = chatId;
		}
		else {
			responseMessage = "Chat does not exist.";
			validate = ValidateStatus.BAD_VALIDATE;
		}
	}
	
	public int getChatId() {
		return chatId;
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
