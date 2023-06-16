package com.chatigo.models;

public class ChatToSend {
	private int chatId;
	private String chatName;
	private String chatImage;
	private String lastMessageText;
	private String lastMessageUserImage;
	private String lastMessageDate;
	private int lastMessageType;
	private int countOfUnreadMessages;
	
	public ChatToSend() {}
	
	public ChatToSend(int chatId, String chatName, String chatImage, String lastMessageText, String lastMessageUserImage, String lastMessageDate, int lastMessageType, int countOfUnreadMessages) {
		setChatId(chatId);
		setChatName(chatName);
		setChatImage(chatImage);
		setLastMessageText(lastMessageText);
		setLastMessageUserImage(lastMessageUserImage);
		setLastMessageDate(lastMessageDate);
		setLastMessageType(lastMessageType);
		setCountOfUnreadMessages(countOfUnreadMessages);
	}

	public int getChatId() {
		return chatId;
	}

	public void setChatId(int chatId) {
		this.chatId = chatId;
	}

	public String getChatName() {
		return chatName;
	}

	public void setChatName(String chatName) {
		this.chatName = chatName;
	}

	public String getChatImage() {
		return chatImage;
	}

	public void setChatImage(String chatImage) {
		this.chatImage = chatImage;
	}

	public String getLastMessageText() {
		return lastMessageText;
	}

	public void setLastMessageText(String lastMessageText) {
		this.lastMessageText = lastMessageText;
	}

	public String getLastMessageUserImage() {
		return lastMessageUserImage;
	}

	public void setLastMessageUserImage(String lastMessageUserImage) {		
		this.lastMessageUserImage = lastMessageUserImage;
	}

	public String getLastMessageDate() {
		return lastMessageDate;
	}

	public void setLastMessageDate(String lastMessageDate) {
		
		String dateAndTime = lastMessageDate;
		
		if(lastMessageDate != null) {
			String[] splitDate = lastMessageDate.split("\\.");
	        String[] dateTime = splitDate[0].split(" ");

	        String time = dateTime[1].substring(0,5);

	        splitDate = dateTime[0].split("-");
	        splitDate[0] = splitDate[0].substring(2,4);
	        String date = splitDate[2] + "." + splitDate[1] + "." + splitDate[0];
	        dateAndTime = date + " " + time;
		}
		
        this.lastMessageDate = dateAndTime;
	}

	public int getLastMessageType() {
		return lastMessageType;
	}

	public void setLastMessageType(int lastMessageType) {
		this.lastMessageType = lastMessageType;
	}

	public int getCountOfUnreadMessages() {
		return countOfUnreadMessages;
	}

	public void setCountOfUnreadMessages(int countOfUnreadMessages) {
		this.countOfUnreadMessages = countOfUnreadMessages;
	}
	
}