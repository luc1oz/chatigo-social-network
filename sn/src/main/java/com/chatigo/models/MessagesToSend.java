package com.chatigo.models;

/*
 * messageId
 * Textmessage
 * ImageMessage
 * DateMessage
 * TypeMessage
 * userId
 * NameSurnameUser
 * ImageUser
 * */

public class MessagesToSend {
	private int messageId;
	private String messageText;
	private String messageImage;
	private String messageDate;
	private int messageType;
	private int userId;
	private String userName;
	private String userImage;
	
	
	public MessagesToSend() {}
	
	public MessagesToSend(int messageId, String messageText, String messageImage, String messageDate, int messageType, int userId, String userName, String userImage) {
		setMessageId(messageId);
		setMessageText(messageText);
		setMessageImage(messageImage);
		setMessageDate(messageDate);
		setMessageType(messageType);
		setUserId(userId);
		setUserName(userName);
		setUserImage(userImage);
	}

	public int getMessageId() {
		return messageId;
	}

	public void setMessageId(int messageId) {
		this.messageId = messageId;
	}

	public String getMessageText() {
		return messageText;
	}

	public void setMessageText(String messageText) {
		this.messageText = messageText;
	}

	public String getMessageImage() {
		return messageImage;
	}

	public void setMessageImage(String messageImage) {
		this.messageImage = messageImage;
	}

	public String getMessageDate() {
		return messageDate;
	}

	public void setMessageDate(String messageDate) {
		String[] splitDate = messageDate.split("\\.");
        String[] dateTime = splitDate[0].split(" ");

        String time = dateTime[1].substring(0,5);

        splitDate = dateTime[0].split("-");
        splitDate[0] = splitDate[0].substring(2,4);
        String date = splitDate[2] + "." + splitDate[1] + "." + splitDate[0];
        this.messageDate = date + " " + time;
	}

	public int getMessageType() {
		return messageType;
	}

	public void setMessageType(int messageType) {
		this.messageType = messageType;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserImage() {
		return userImage;
	}

	public void setUserImage(String userImage) {
		this.userImage = userImage;
	}
	
	
}
