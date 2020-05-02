package model;

import java.util.List;
import java.util.Objects;


/**
 * Instructor class is the data model of an Instructor. Each object of Instructor class
 * stores relevant data of a single instructor such as instructor id
 * instructor's name, instructor's email and password
 *
 * @author Ziming Chen, Nanxi Ye, Chenghao Sun
 * @version 1.0
 */
public class Instructor {
    private Integer instructorId; // unique id of instructor
    private String name; // name of instructor
    private String email; // email of instructor
    private String pswd; // password of instructor

    /**
     * This method is the constructor of the class
     *
     * @param name name of the instructor
     * @param email email of the instructor
     * @param pswd password of the instructor
     */
    public Instructor(String name, String email, String pswd) {
        this.name = name;
        this.email = email;
        this.pswd = pswd;
    }

    /**
     * This method is used to set the private variable
     * named instructorId
     */
    public void setInstructorId(Integer instructorId) {
        this.instructorId = instructorId;
    }


    /**
     * This method is used to get the private variable value
     * @return named instructorId
     */
    public Integer getInstructorId() {
        return instructorId;
    }


    /**
     * This method is used to get the private variable value
     * @return named name
     */
    public String getName() {
        return name;
    }


    /**
     * This method is used to get the private variable value
     * @return named email
     */
    public String getEmail() {
        return email;
    }


    /**
     * This method is used to get the private variable value
     * @return named pswd
     */
    public String getPswd() {
        return pswd;
    }

    /**
     * This method overrides the equals method of the class
     * to implement specific functionality of the equals function
     * to the class
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Instructor that = (Instructor) o;
        return Objects.equals(instructorId, that.instructorId) &&
                Objects.equals(name, that.name) &&
                Objects.equals(email, that.email) &&
                Objects.equals(pswd, that.pswd);
    }

    /**
     * This method overrides the hashCode method of the class
     * to implement specific functionality of the hashCode function
     * to the class
     */
    @Override
    public int hashCode() {
        return Objects.hash(instructorId, name, email, pswd);
    }


    /**
     * This method overrides the toString method of the class
     * to display specific content of the class information
     */
    @Override
    public String toString() {
        return "Instructor{" +
                "instructorId=" + instructorId +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", pswd='" + pswd + '\'' +
                '}';
    }
}
