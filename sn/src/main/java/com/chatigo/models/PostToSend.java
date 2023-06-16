package com.chatigo.models;

import java.io.File;
import java.util.Base64;

import org.apache.commons.io.FileUtils;
import org.springframework.jdbc.core.JdbcOperations;

import com.chatigo.database.DataBaseConnection;


public class PostToSend {
	private int userId;
	private String userImage;
	private String userName;
	private String userSurname;
	private int postId;
	private String postDate;
	private String postText;
	private String postImage;
	private int likeCount;
	private boolean isLiked;
	private int commentCount;
	private DataBaseConnection dbconnection = new DataBaseConnection();
	
	public PostToSend(int userId, String userImage, String userName, String userSurname, int postId, String postDate, String postText, String postImage, int likeCount, boolean isLiked, int commentCount) {
		setUserId(userId);
		setUserImage(userId);
		setUserName(userName);
		setUserSurname(userSurname);
		setPostId(postId);
		setPostDate(postDate);
		setPostText(postText);
		setPostImage(postImage);
		setLikeCount(likeCount);
		setIsLiked(isLiked);
		setCommentCount(commentCount);
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
	
	public void setPostId(int postId) {
		this.postId = postId;
	}
	
	public int getPostId() {
		return postId;
	}
	
	public void setPostDate(String postDate) {
		String[] date = postDate.split("\\.");
		this.postDate = date[0];
	}
	
	public String getPostDate() {
		return postDate;
	}
	
	public void setPostText(String postText) {
		this.postText = postText;
	}
	
	public String getPostText() {
		return postText;
	}
	
	public void setPostImage(String postImage) {
		if(postImage != null) {
			if(!postImage.isEmpty()) {
				try {
					byte[] fileContent = FileUtils.readFileToByteArray(new File(postImage));
					this.postImage = Base64.getEncoder().encodeToString(fileContent);
				}
				catch(Exception ex) {
					ex.printStackTrace();
				}
			}
			else {
				this.postImage = "";
			}
		}
		else {
			this.postImage = "";
		}
	}
	
	public String getPostImage() {
		return postImage;
	}
	
	public void setLikeCount(int likeCount) {
		this.likeCount = likeCount;
	}
	
	public int getLikeCount() {
		return likeCount;
	}
	
	public void setIsLiked(boolean isLiked) {
		this.isLiked = isLiked;
	}
	
	public boolean getIsLiked() {
		return isLiked;
	}
	
	public void setCommentCount(int commentCount) {
		this.commentCount = commentCount;
	}
	
	public int getCommentCount() {
		return commentCount;
	}
	
	@Override
	public String toString() {
		return String.format("{post:userId - %d, userName - %s, userSurname - %s, postId - %d, postDate - %s, postText - %s, postImage - %s, likeCount - %d}", 
							userId, userName, userSurname, postId, postDate, postText, postImage, likeCount);
	}
	
}