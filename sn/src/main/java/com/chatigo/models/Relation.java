package com.chatigo.models;

import com.chatigo.database.DataBaseConnection;
import com.chatigo.enums.ValidateStatus;

public class Relation {
	private int sendUserId;
	private int getUserId;
	private int type;
	private String responseMessage = "Ok.";
	private ValidateStatus validate = ValidateStatus.OK;
	private DataBaseConnection dbconnection = new DataBaseConnection();
	
	/*
	 * 1 - подписка
	 * 2 - дружба
	 * 3 - удаление
	 * */
	
	public Relation(int sendUserId, int getUserId, int type) {
		setSendUserId(sendUserId);
		setGetUserId(getUserId);
		setType(type);
		
		if(validate == ValidateStatus.OK) {
			if(type == 1) {
				dbconnection.createRelation(sendUserId, getUserId);
			}
			else if(type == 2) {
				dbconnection.acceptRelation(sendUserId, getUserId);
			}
			else if(type == 3) {
				dbconnection.deleteRelation(sendUserId, getUserId);
			}
			else {
				responseMessage = "Wrong type " + type;
				validate = ValidateStatus.BAD_VALIDATE;
			}
			
		}
	}
	
	public void setSendUserId(int sendUserId) {
		if(dbconnection.exist(sendUserId)) {
			this.sendUserId = sendUserId;
		}
		else {
			responseMessage = "No such user.(send)";
			validate = ValidateStatus.BAD_VALIDATE;
		}
	}
	
	public int getSendUserId() {
		return sendUserId;
	}
	
	public void setGetUserId(int getUserId) {
		if(dbconnection.exist(getUserId)) {
			this.getUserId = getUserId;
		}
		else {
			responseMessage = "No such user.(get)";
			validate = ValidateStatus.BAD_VALIDATE;
		}
	}
	
	public int getGetUserId() {
		return getUserId;
	}
	
	public void setType(int type) {
		if(type >= 1 && type <= 3) {
			this.type = type;
		}
		else {
			responseMessage = "Wrong type " + type;
			validate = ValidateStatus.BAD_VALIDATE;
		}
	}
	
	public int getType() {
		return type;
	}
	
	public ValidateStatus getValidateStatus() {
		return validate;
	}
	
	public String getResponseMessage() {
		return responseMessage;
	}
}
