package com.chatigo.models;

import com.chatigo.database.DataBaseConnection;
import com.chatigo.enums.*;

public class UserAuthorization {
	private int userId;
	private String userEmail;
	private String userPassword;
	private String responseMessage = "Ok.";
	private ValidateStatus validate = ValidateStatus.OK;
	private DataBaseConnection dbconnection = new DataBaseConnection();
	
	/*
	 * UserEmail
	 * */
	
	public UserAuthorization(String userEmail, String userPassword) {
		setUserEmail(userEmail);
		setUserPassword(userPassword);
		if(validate == ValidateStatus.OK) {
			try {
				if(!dbconnection.exist(this)) {
					responseMessage = "No such user or wrong password";
					validate = ValidateStatus.BAD_VALIDATE;
				} else {
					setUserId(dbconnection.getUserId(this));
				}
			}
			catch(Exception ex) {
				
			}
		}
	}
	
	public void setUserId(int userId) {
		if(userId > 0) {
			this.userId = userId;
		}
	}
	
	public int getUserId() {
		return userId;
	}
	
	public void setUserEmail(String userEmail) {
		if(userEmail != null && !userEmail.isEmpty()) {
			this.userEmail = userEmail;
		}
		else {
			responseMessage = "The email is null or empty.";
			validate = ValidateStatus.BAD_VALIDATE;
		}
	}
	
	public String getUserEmail() {
		return userEmail;
	}
	
	/*
	 * UserPassword
	 * */
	
	public void setUserPassword(String userPassword) {
		if(userPassword != null && !userPassword.isEmpty()) {
			//TODO проверка что на совпадение паролей
			this.userPassword = userPassword;
		}
		else {
			responseMessage = "The password is null or empty.";
			validate = ValidateStatus.BAD_VALIDATE;
		}
	}
	
	public String getUserPassword() {
		return userPassword;
	}
	
	public ValidateStatus getValidateStatus() {
		return validate;
	}
	
	public String getResponseMessage() {
		return responseMessage;
	}
	
}
