package exception;

/**
 * exception class related to user login
 */
public class LoginException extends RuntimeException {

    public LoginException(String msg) {
        super(msg);
    }
}
