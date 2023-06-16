package com.chatigo.models;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.springframework.web.multipart.MultipartFile;

import com.chatigo.database.DataBaseConnection;
import com.chatigo.enums.ValidateStatus;

public class MainImage {
	private MultipartFile file;
	private int userId;
	private String path;
	private String responseMessage = "Ok.";
	private ValidateStatus validate = ValidateStatus.OK;
	private DataBaseConnection dbconnection = new DataBaseConnection();
	
	public MainImage(MultipartFile file, int userId) {
		setFile(file);
		setUserId(userId);
		if(validate == ValidateStatus.OK) {
			try {
				Files.createDirectories(Paths.get(dbconnection.getPhotoPath() + "users\\" + userId));
				file.transferTo(new File(dbconnection.getPhotoPath() + "users\\" + userId + "\\" +  file.getOriginalFilename()));
				path = dbconnection.getPhotoPath() + "users\\" + userId + "\\" +  file.getOriginalFilename();
				
				dbconnection.addImageToImage(path);
				dbconnection.addUserImage(userId, path);
				dbconnection.addMainImageToUser(userId, path);
				
			}
			catch(Exception ex) {
				ex.printStackTrace();
				responseMessage = "Something wrong.";
				validate = ValidateStatus.BAD_VALIDATE;
			}
		}
	}
	
	public void setFile(MultipartFile file) {
		if(file != null) {
			if(!file.getOriginalFilename().isEmpty()) {
				if(file.getSize() > 0 && file.getSize() < 209715200) {
					try {
						this.file = file;
					}
					catch(Exception ex) {
						responseMessage = "Something wrong.";
						validate = ValidateStatus.BAD_VALIDATE;
						ex.printStackTrace();
					}
				}
				else {
					responseMessage = "File size too small or too large.";
					validate = ValidateStatus.BAD_VALIDATE;
				}
			}
			else {
				responseMessage = "File name is empty.";
				validate = ValidateStatus.BAD_VALIDATE;
			}
		}
		else {
			responseMessage = "File is null.";
			validate = ValidateStatus.BAD_VALIDATE;
		}
	}
	
	public MultipartFile getFile() {
		return file;
	}
	
	public void setUserId(int userId) {
		if(userId != 0 && dbconnection.checkUserById(userId)) {
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
	
	public ValidateStatus getValidateStatus() {
		return validate;
	}
	
	public String getResponseMessage() {
		return responseMessage;
	}
	
}
