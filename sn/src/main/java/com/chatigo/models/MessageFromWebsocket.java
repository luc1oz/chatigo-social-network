package com.chatigo.models;

public class MessageFromWebsocket {
    private int chatId;
    private int userId;
    private String text;
    private int notificationType;

    public MessageFromWebsocket() {}

    public MessageFromWebsocket(int chatId, int userId, String text) {
        setChatId(chatId);
        setUserId(userId);
        setText(text);
    }

    public int getChatId() {
        return chatId;
    }

    public void setChatId(int chatId) {
        this.chatId = chatId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

	public int getNotificationType() {
		return notificationType;
	}

	public void setNotificationType(int notificationType) {
		this.notificationType = notificationType;
	}
}
