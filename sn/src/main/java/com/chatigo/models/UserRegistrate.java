package com.chatigo.models;

import com.chatigo.database.DataBaseConnection;
import com.chatigo.enums.*;
import java.io.File;

public class UserRegistrate {
	private String userName;
	private String userSurname;
	private String userEmail;
	private String userPassword;
	private String userBirthday;
	private String userGender;
	private String responseMessage = "Ok.";
	private ValidateStatus validate = ValidateStatus.OK;
	private DataBaseConnection dbconnection = new DataBaseConnection();
	
	public UserRegistrate(String userName, String userSurname, String userEmail, String userPassword, String userBirthday, String userGender) {
			setUserName(userName);
			setUserSurname(userSurname);
			setUserEmail(userEmail);
			setUserPassword(userPassword);
			setUserBirthday(userBirthday);
			setUserGender(userGender);
			System.out.println("qq11");
			if(validate == ValidateStatus.OK) {
				try {
					System.out.println("qq11");
					if(!dbconnection.exist(this)) {
						
						int userId = dbconnection.createUser(this);
						/*if(userId != -1) {
							File userDirectory = new File("D:\\eclipseProjects\\sn\\src\\main\\resources\\img\\" + userId);
							userDirectory.mkdir();
						}*/
					}
					else {
						validate = ValidateStatus.BAD_VALIDATE;
						responseMessage = "User with this email already exists.";
					}
				}
				catch(Exception ex) {
					validate = ValidateStatus.BAD_VALIDATE;
					responseMessage = "Data base error.";
					ex.printStackTrace();
				}
			}
	}
	
	/*
	 * UserName
	 * */
	
	public void setUserName(String userName) {
		if(userName != null && !userName.isEmpty()) {
			if(userName.length() <= 25 && userName.length() >= 2) {
				
				if(hasDigit(userName) > 0) {
					responseMessage = "The name contain numbers.";
					validate = ValidateStatus.BAD_VALIDATE;
				} 
				else {
					this.userName = userName;
				}
			}
			else {
				responseMessage = "The name is too short.";
				validate = ValidateStatus.BAD_VALIDATE;
			}
		}
		else {
			responseMessage = "The name is null or empty.";
			validate = ValidateStatus.BAD_VALIDATE;
		}
	}
	
	public String getUserName() {
		return userName;
	}
	
	/*
	 * UserSurname
	 * */
	
	public void setUserSurname(String userSurname) {
		if(userSurname != null && !userSurname.isEmpty()) {
			if(userSurname.length() <= 25 && userSurname.length() >= 2) {
				
				if(hasDigit(userSurname) > 0) {
					responseMessage = "The surname contain numbers.";
					validate = ValidateStatus.BAD_VALIDATE;
				} 
				else {
					this.userSurname = userSurname;
				}
			}
			else {
				responseMessage = "The surname is too short.";
				validate = ValidateStatus.BAD_VALIDATE;
			}
		}
		else {
			responseMessage = "The surname is null or empty.";
			validate = ValidateStatus.BAD_VALIDATE;
		}
	}
	
	public String getUserSurname() {
		return userSurname;
	}
	
	/*
	 * UserEmail
	 * */
	
	public void setUserEmail(String userEmail) {
		if(userEmail != null && !userEmail.isEmpty()) {
			this.userEmail = userEmail;
		}
		else {
			responseMessage = "The email is null or empty.";
			validate = ValidateStatus.BAD_VALIDATE;
		}
	}
	
	public String getUserEmail() {
		return userEmail;
	}
	
	/*
	 * UserPassword
	 * */
	
	public void setUserPassword(String userPassword) {
		if(userPassword != null && !userPassword.isEmpty()) {
			this.userPassword = userPassword;
		}
		else {
			responseMessage = "The password is null or empty.";
			validate = ValidateStatus.BAD_VALIDATE;
		}
	}
	
	public String getUserPassword() {
		return userPassword;
	}
	
	/*
	 * UserBirthday
	 * */
	
	public void setUserBirthday(String userBirthday) {
		if(userBirthday != null && !userBirthday.isEmpty()) {
			//TODO возможно проверка на формат даты
			this.userBirthday = userBirthday;
		}
		else {
			responseMessage = "The birthday is null or empty.";
			validate = ValidateStatus.BAD_VALIDATE;
		}
	}
	
	public String getUserBirthday() {
		return userBirthday;
	}
	
	/*
	 * UserGender
	 * */
	
	public void setUserGender(String userGender) {
		if(userGender != null && !userGender.isEmpty()) {
			this.userGender = userGender;
		}
		else {
			responseMessage = "The gender is null or empty.";
			validate = ValidateStatus.BAD_VALIDATE;
		}
	}
	
	public String getUserGender() {
		return userGender;
	}
	
	private int hasDigit(String s) {
		int countOfDigits = 0;
		
		for(int i = 0; i < s.length(); i++) {
			if(Character.isDigit(s.charAt(i))) {
				countOfDigits++;
				break;
			}
		}
		
		return countOfDigits;
	}
	
	public ValidateStatus getValidateStatus() {
		return validate;
	}
	
	public String getResponseMessage() {
		return responseMessage;
	}
}
