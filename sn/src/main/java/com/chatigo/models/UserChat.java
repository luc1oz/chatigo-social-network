package com.chatigo.models;

import java.util.Arrays;

import com.chatigo.database.DataBaseConnection;
import com.chatigo.enums.ValidateStatus;

public class UserChat {
	private String name;
	private int[] users;
	private String responseMessage = "Ok.";
	private ValidateStatus validate = ValidateStatus.OK;
	private DataBaseConnection dbconnection = new DataBaseConnection();
	
	public UserChat(String name, int[] users) {
		setUsers(users);
		setName(name);
		
		if(validate == ValidateStatus.OK) {
			try {
				dbconnection.createChat(this);
				dbconnection.addChatUser(users);
			}
			catch(Exception ex) {
				responseMessage = "Something wrong.";
				validate = ValidateStatus.BAD_VALIDATE;
			}
		}
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getName() {
		return name;
	}
	
	public void setUsers(int[] users) {
		if(users != null) {
			for(int u : users) {
				if(!dbconnection.checkUserById(u)) {
					responseMessage = "One or more users does not exist.";
					validate = ValidateStatus.BAD_VALIDATE;
					return;
				}
			}
			
			this.users = Arrays.copyOf(users, users.length);
		}
		else {
			responseMessage = "Users does not exist.";
			validate = ValidateStatus.BAD_VALIDATE;
		}
	}
	
	public int[] getUsers() {
		return users;
	}
	
	public ValidateStatus getValidateStatus() {
		return validate;
	}
	
	public String getResponseMessage() {
		return responseMessage;
	}
}
