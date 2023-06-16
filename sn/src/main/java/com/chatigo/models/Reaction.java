package com.chatigo.models;

import com.chatigo.database.DataBaseConnection;
import com.chatigo.enums.ValidateStatus;

public class Reaction {
    private int userId;
    private int postId;
    private boolean isLiked;
    private int likeCount;
    private String responseMessage = "Ok.";
    private ValidateStatus validate = ValidateStatus.OK;
    private DataBaseConnection dbconnection = new DataBaseConnection();

    public Reaction(int userId, int postId) {
        setUserId(userId);
        setPostId(postId);
        if(validate == ValidateStatus.OK) {
            isLiked = dbconnection.createOrDelteReaction(userId, postId);
            likeCount = dbconnection.getLikeCountByPost(postId);
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

    public int getUser() {
        return userId;
    }

    public void setPostId(int postId) {
        if(dbconnection.existPost(postId)) {
            this.postId = postId;
        }
        else {
            responseMessage = "No such post.";
            validate = ValidateStatus.BAD_VALIDATE;
        }
    }

    public int getPostId() {
        return postId;
    }

    public boolean getIsLiked() {
        return isLiked;
    }

    public int getLikeCount() {
        return likeCount;
    }

    public ValidateStatus getValidateStatus() {
        return validate;
    }

    public String getResponseMessage() {
        return responseMessage;
    }
}