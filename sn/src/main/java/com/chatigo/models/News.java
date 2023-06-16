package com.chatigo.models;

import org.springframework.web.multipart.MultipartFile;

import com.chatigo.database.DataBaseConnection;
import com.chatigo.enums.ValidateStatus;
import com.fasterxml.jackson.annotation.JsonCreator;

public class News {
    private int userId;
    private String path;
    private String responseMessage = "Ok.";
    private ValidateStatus validate = ValidateStatus.OK;
    private DataBaseConnection dbconnection = new DataBaseConnection();

    @JsonCreator
    public News(int userId) {
        setUserId(userId);
        if(validate == ValidateStatus.OK) {
            path = dbconnection.getMainImagePath(userId);
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

    public ValidateStatus getValidateStatus() {
        return validate;
    }

    public String getResponseMessage() {
        return responseMessage;
    }

    public String getPath() {
        return path;
    }
}