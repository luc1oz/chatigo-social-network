package com.chatigo.models;

import com.chatigo.database.DataBaseConnection;
import com.chatigo.enums.ValidateStatus;

public class ChangeSettings {
    private int userId;
    private String email;
    private String password;
    private String responseMessage = "Ok.";
    private ValidateStatus validate = ValidateStatus.OK;
    private DataBaseConnection dbconnection = new DataBaseConnection();

    public ChangeSettings(int userId, String email, String password) {
        setUserId(userId);
        setEmail(email);
        setPassword(password);

        if(validate == ValidateStatus.OK) {
            if(!dbconnection.existEmail(email)) {
                dbconnection.updateSettings(this);
            }
            else {
                responseMessage = "Email already in use";
                validate = ValidateStatus.BAD_VALIDATE;
            }
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

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasword() {
        return password;
    }

    public ValidateStatus getValidateStatus() {
        return validate;
    }

    public String getResponseMessage() {
        return responseMessage;
    }
}