package com.chatigo.models;

import java.io.File;
import java.util.Base64;

import org.apache.commons.io.FileUtils;

import com.chatigo.database.DataBaseConnection;

public class FiltreUsers {
    private int userId;
    private String userName;
    private String userSurname;
    private String userImage;
    private int online;
    private DataBaseConnection dbconnection = new DataBaseConnection();

    public FiltreUsers(int userId, String userName, String userSurname, int online) {
        setUserId(userId);
        setUserName(userName);
        setUserSurname(userSurname);
        setUserImage(userId);
        setOnline(online);
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUsername() {
        return userName;
    }

    public void setUserSurname(String userSurname) {
        this.userSurname = userSurname;
    }

    public String getUserSurname() {
        return userSurname;
    }

    public void setUserImage(int userId) {
        try {
            byte[] fileContent = FileUtils.readFileToByteArray(new File(dbconnection.getMainImagePath(userId)));
            this.userImage = Base64.getEncoder().encodeToString(fileContent);
        }
        catch(Exception ex) {
            ex.printStackTrace();
        }
    }

    public String getUserImage() {
        return userImage;
    }

	public int getOnline() {
		return online;
	}

	public void setOnline(int online) {
		this.online = online;
	}
}