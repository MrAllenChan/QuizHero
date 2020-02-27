package controller;

import java.util.Objects;

public class FileHelper {
    private int fileId;
    private String path;
    private String url;

    public FileHelper() {}

    public FileHelper(int fileId, String path, String url) {
        this.fileId = fileId;
        this.path = path;
        this.url = url;
    }

    public int getFileId() {
        return fileId;
    }

    public void setFileId(int fileId) {
        this.fileId = fileId;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FileHelper that = (FileHelper) o;
        return fileId == that.fileId &&
                path.equals(that.path) &&
                url.equals(that.url);
    }

    @Override
    public int hashCode() {
        return Objects.hash(fileId, path, url);
    }

    @Override
    public String toString() {
        return "controller.FileHelper{" +
                "fileId=" + fileId +
                ", path='" + path + '\'' +
                ", url='" + url + '\'' +
                '}';
    }
}
