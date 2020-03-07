package exception;

public class ApiError extends RuntimeException {
  private int status;

  public ApiError(String message, int status) {
    super(message);
    this.status = status;
  }

  public int getStatus() {
    return status;
  }
}
