package model;

public class Instructor {
    private Integer instructorId;
    private String name;
    private String email;
    private String pswd;

    public Instructor(String name, String email, String pswd) {
        this.name = name;
        this.email = email;
        this.pswd = pswd;
    }

    public void setInstructorId(Integer instructorId) {
        this.instructorId = instructorId;
    }

    public Integer getInstructorId() {
        return instructorId;
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
