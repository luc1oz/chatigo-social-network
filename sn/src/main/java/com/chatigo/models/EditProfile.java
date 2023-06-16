package com.chatigo.models;

import org.springframework.aop.target.AbstractBeanFactoryBasedTargetSource;
import org.springframework.web.multipart.MultipartFile;

import com.chatigo.database.DataBaseConnection;
import com.chatigo.enums.ValidateStatus;

public class EditProfile {
    private int userId;
    private String userName;
    private String userSurname;
    private String description;
    private String responseMessage = "Ok.";
    private ValidateStatus validate = ValidateStatus.OK;
    private DataBaseConnection dbconnection = new DataBaseConnection();

    public EditProfile(int userId, String userName, String userSurname, String description) {
        setUserId(userId);
        setUserName(userName);
        setUserSurname(userSurname);
        setDescription(description);

        if(validate == ValidateStatus.OK) {
            dbconnection.updateProfile(this);
        }
    }

    public void setUserId(int userId) {
        if(dbconnection.exist(userId)) {
            this.userId = userId;
        }
        else {
            responseMessage = "No such user.";
            validate = ValidateStatus.BAD_VALIDATE;
        }
    }

    public int getUserId() {
        return userId;
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

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDesription() {
        return description;
    }

    public ValidateStatus getValidateStatus() {
        return validate;
    }

    public String getResponseMessage() {
        return responseMessage;
    }
}
