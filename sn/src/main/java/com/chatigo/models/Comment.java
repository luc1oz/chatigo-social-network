package com.chatigo.models;

import com.chatigo.database.DataBaseConnection;
import com.chatigo.enums.ValidateStatus;

public class Comment {
    private int userId;
    private int postId;
    private String text;
    private String responseMessage = "Ok.";
    private ValidateStatus validate = ValidateStatus.OK;
    private DataBaseConnection dbconnection = new DataBaseConnection();

    public Comment(int userId, int postId, String text) {
        setUserId(userId);
        setPostId(postId);
        setText(text);

        if(validate == ValidateStatus.OK) {
            dbconnection.createComment(userId, postId, text);
        }
    }

    public void setUserId(int userId) {
        if(dbconnection.exist(userId)) {
            this.userId = userId;
        }
        else {
            responseMessage = "No such user";
            validate = ValidateStatus.BAD_VALIDATE;
        }
    }

    public int getUserId() {
        return userId;
    }

    public void setPostId(int postId) {
        if(dbconnection.existPost(postId)) {
            this.postId = postId;
        }
        else {
            responseMessage = "No such post";
            validate = ValidateStatus.BAD_VALIDATE;
        }
    }

    public int getPostId() {
        return postId;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public ValidateStatus getValidateStatus() {
        return validate;
    }

    public String getResponseMessage() {
        return responseMessage;
    }
}