package com.chatigo.models;

import java.util.ArrayList;

public class CreateChat {
    private ArrayList<Integer> users;

    public CreateChat() {}

    public CreateChat(ArrayList<Integer> users) {
        setUsers(users);
    }

    public ArrayList<Integer> getUsers() {
        return users;
    }

    public void setUsers(ArrayList<Integer> users) {
        this.users = users;
    }

    public void print() {
        for(int i : users) {
            System.out.print(i +" ");
        }
    }
}