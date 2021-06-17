package example.models;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;

public class Message {
    private String message;
    private String username;
    private Date date;

    public Message() {
    }

    public Message(String message, String username) {
        this.message = message;
        this.username = username;
        this.date = Timestamp.valueOf(LocalDateTime.now());
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Message{" +
                "message='" + message + '\'' +
                ", username='" + username + '\'' +
                ", date=" + date +
                '}';
    }
}
