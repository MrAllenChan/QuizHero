import java.util.Objects;

public class Instructor {
    private int id;
    private int fileId;

    public Instructor(int id, int fileId) {
        this.id = id;
        this.fileId = fileId;
    }

    //TODO:
    public void createSlides() {

    }

    //TODO:
    public void presenterMode() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getFileId() {
        return fileId;
    }

    public void setFileId(int fileId) {
        this.fileId = fileId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Instructor that = (Instructor) o;
        return id == that.id &&
                fileId == that.fileId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, fileId);
    }

    @Override
    public String toString() {
        return "Instructor{" +
                "id=" + id +
                ", fileId=" + fileId +
                '}';
    }
}
