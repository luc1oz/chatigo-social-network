package com.chatigo.models;

import java.io.File;
import java.util.Base64;

import org.apache.commons.io.FileUtils;

import com.chatigo.database.DataBaseConnection;

public class UserPage {
	private int userId;
	private int relation;
	private String userName;
	private String userSurname;
	private String birthday;
	private String regdate;
	private String gender;
	private int online;
	private String userImage;
	private String description;
	private DataBaseConnection dbconnection = new DataBaseConnection();
	
	public UserPage(int userId, String userName, String userSurname, String birthday, String regdate, String gender, int online, String userImage, String description) {
		setUserId(userId);
		setUserName(userName);
		setUserSurname(userSurname);
		setBirthday(birthday);
		setRegdate(regdate);
		setGender(gender);
		setOnline(online);
		setUserImage(userId);
		setDescription(description);
	}
	
	public void setUserId(int userId) {
		this.userId = userId;
	}
	
	public int getUserId() {
		return userId;
	}
	
	public void setRelation(int relation) {
		this.relation = relation;
	}
	
	public int getRelation() {
		return relation;
	}
	
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public String getUserName() {
		return userName;
	}
	
	public void setUserSurname(String userSurname) {
		this.userSurname = userSurname;
	}
	
	public String getUserSurname() {
		return userSurname;
	}
	
	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}
	
	public String getBirthday() {
		return birthday;
	}
	
	public void setRegdate(String regdate) {
		this.regdate = regdate;
	}
	
	public String getRegdate() {
		return regdate;
	}
	
	public void setGender(String gender) {
		this.gender = gender;
	}
	
	public String getGender() {
		return gender;
	}
	
	public void setOnline(int online) {
		this.online = online;
	}
	
	public int getOnline() {
		return online;
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
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public String getDescription() {
		return description;
	}
}