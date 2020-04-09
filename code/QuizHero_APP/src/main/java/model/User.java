package model;

public class User {
    private Integer userId;
    private String name;
    private String email;
    private String pswd;

    public User(String name, String email, String pswd) {
        this.name = name;
        this.email = email;
        this.pswd = pswd;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPswd() {
        return pswd;
    }
}
