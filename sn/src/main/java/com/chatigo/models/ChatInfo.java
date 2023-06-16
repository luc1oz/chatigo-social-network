package com.chatigo.models;

public class ChatInfo {
    private String chatName;
    private String chatImage;
    private int online;

    public ChatInfo() {}

    public ChatInfo(String chatName, String chatImage, int online) {
        setChatName(chatName);
        setChatImage(chatImage);
        setOnline(online);
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

    public int getOnline() {
        return online;
    }

    public void setOnline(int online) {
        this.online = online;
    }
}