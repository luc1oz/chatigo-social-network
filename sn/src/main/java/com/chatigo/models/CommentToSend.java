package com.chatigo.models;

import java.io.File;
import java.util.Base64;

import org.apache.commons.io.FileUtils;

import com.chatigo.database.DataBaseConnection;

public class CommentToSend {
	private int commentId;
	private int userId;
	private String userImage;
	private String userName;
	private String userSurname;
	private String commentText;
	private String commentDate;
	private DataBaseConnection dbconnection = new DataBaseConnection();
	
	public CommentToSend(int commentId, int userId, String userImage, String userName, String userSurname, String commentText, String commentData) {
		setCommentId(commentId);
		setUserId(userId);
		setUserImage(userId);
		setUserName(userName);
		setUserSurname(userSurname);
		setCommentText(commentText);
		setCommentDate(commentData);
	}
	
	public void setCommentId(int commentId) {
		this.commentId = commentId;
	}
	
	public int getCommentId() {
		return commentId;
	}
	
	public void setUserId(int userId) {
		this.userId = userId;
	}
	
	public int getUserId() {
		return userId;
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
	
	public void setCommentText(String commentText) {
		this.commentText = commentText;
	}
	
	public String getCommentText() {
		return commentText;
	}
	
	public void setCommentDate(String commentData) {
		String[] date = commentData.split("\\.");
		this.commentDate = date[0];
	}
	
	public String getCommentDate() {
		return commentDate;
	} 
}
