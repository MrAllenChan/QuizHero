package model;

import java.util.Objects;

public class Presenter {
    private int id;
    private int instructorId;
    private String path;

    public Presenter(int id, int instructorId, String path) {
        this.id = id;
        this.instructorId = instructorId;
        this.path = path;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getInstructorId() {
        return instructorId;
    }

    public void setInstructorId(int instructorId) {
        this.instructorId = instructorId;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Presenter presenter = (Presenter) o;
        return id == presenter.id &&
                instructorId == presenter.instructorId &&
                path.equals(presenter.path);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, instructorId, path);
    }

    @Override
    public String toString() {
        return "model.Presenter{" +
                "id=" + id +
                ", instructorId=" + instructorId +
                ", path='" + path + '\'' +
                '}';
    }
}
