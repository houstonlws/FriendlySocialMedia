package example.models;

import com.fasterxml.jackson.annotation.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "posts")
public class Post {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="post_id")
    private int id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_FK", nullable = false)
    private User user;

    @Column(name="post_message")
    private String message;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="post_date_created")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy HH:mm:ss")
    private Date dateCreated;

    @ManyToOne(fetch = FetchType.EAGER)/*cascade = CascadeType.ALL,*/
    @JoinColumn(name = "post_ref_FK")
    private Post refPost; //only need the ref post id

    @OneToMany(mappedBy="refPost" , cascade=CascadeType.REMOVE,fetch = FetchType.EAGER)
    private List<Post> comments;

    @ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(name="post_like")
    @JsonIgnoreProperties(value = {"posts"})
    private List<User> likes;// only need user id here

    @Column(name="post_image")
    private String image;

    public Post() {
    }

    public Post(int id, User user, String message, Date dateCreated, Post refPost, List<Post> comments, List<User> likes, String image) {
        this.id = id;
        this.user = user;
        this.message = message;
        this.dateCreated = dateCreated;
        this.refPost = refPost;
        this.comments = comments;
        this.likes = likes;
        this.image = image;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    @JsonIgnore
    public Post getRefPost() {
        return refPost;
    }

    public void setRefPost(Post refPost) {
        this.refPost = refPost;
    }

    public List<Post> getComments() {
        return comments;
    }

    public void setComments(List<Post> comments) {
        this.comments = comments;
    }

    public List<User> getLikes() {
        return likes;
    }

    public void setLikes(List<User> likes) {
        this.likes = likes;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    /*@Override
    public String toString() {
        return "\nPost{" +
                "id=" + id +
                ", user='" + user.getUsername() + '\'' +
                ", message='" + message + '\'' +
                ", dateCreated=" + dateCreated +
                //", refPost=" + refPost +
                ", comments=" + comments +
                ", likes=" + likes +
                ", image=" + image +
                '}';
    }*/
}
