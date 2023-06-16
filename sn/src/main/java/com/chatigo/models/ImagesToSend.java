package com.chatigo.models;

public class ImagesToSend {
    private int imageId;
    private String image;
    private String date;

    public ImagesToSend(int imageId, String image, String date) {
        setImageId(imageId);
        setImage(image);
        setDate(date);
    }

    public void setImageId(int imageId) {
        this.imageId = imageId;
    }

    public int getImageId() {
        return imageId;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getImage() {
        return image;
    }

    public String getDate() {
    	
        return date;
    }

    public void setDate(String date) {
    	String[] datemas = date.split("\\.");
    	String[] dateonly = datemas[0].split(" ");
    	this.date = dateonly[0];
    }
}