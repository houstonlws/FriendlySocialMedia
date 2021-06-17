package example.controller;

import example.models.Post;
import example.models.User;
import example.services.PostService;
import example.services.S3ServiceImpl;
import example.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Controller
@CrossOrigin(origins="http://localhost:4200", allowedHeaders = "*", allowCredentials = "true")
public class PostController {

    PostService postService;
    UserService userService;
    S3ServiceImpl s3Service;

    //----------------------------------------------------------------------------------------------//

    /**
     * <p>Returns all posts in database in response body</p>
     * @return An response body containing a list of all posts
     */
    @GetMapping(value="/post")
    public @ResponseBody
    List<Post> getAllPosts(){
        return this.postService.getAll();
    }

    //----------------------------------------------------------------------------------------------//

    /**
     * <p>Returns all posts for a specific user in the response body</p>
     * @param id - The user id of the user to get all posts for
     * @return A response body containing a list of all posts for a user
     */
    @GetMapping(value="/user/{id}/post")
    public @ResponseBody
    List<Post> getAllPostsGivenUser(@PathVariable int id){
        return this.postService.getAllPostsGivenUserId(id);
    }

    //----------------------------------------------------------------------------------------------//

    /**
     * <p>Creates a post in the database</p>
     * @param id - Indicates whether this "post" is a post or comment, a comment will contain
     *           the id of the post that it is referencing.
     * @param multipartFile - An optional image that can be added to the post
     * @param username - The username of the post creator
     * @param message - The message of the post to add
     * @return A boolean for testing purposes in angular
     */
    @PostMapping(value="/post/{id}")
    public @ResponseBody boolean createPost(
            @PathVariable int id,
            @RequestParam(value = "file", required = false) MultipartFile multipartFile,
            @RequestParam("username") String username,
            @RequestParam("message") String message
    ) throws IOException {

        Post post = new Post();
        post.setMessage(message);
        post.setUser(userService.getUserByUsername(username));
        if (id != 0) {
            Post refPost = postService.getOne(id);
            post.setRefPost(refPost);
        }
        if(multipartFile != null){
                File file = new File(multipartFile.getOriginalFilename());
                multipartFile.transferTo(file);
                s3Service.addPhoto(post.getUser().getUsername(),file);
                post.setImage("https://project2kchilds2020.s3.us-east-2.amazonaws.com/users/" + post.getUser().getUsername() + "/" + multipartFile.getOriginalFilename());
        }
        postService.createPost(post);
        return true;
    }

    //----------------------------------------------------------------------------------------------//

    /**
     *<p>Deletes a post given a post id</p>
     * @param id - The id of the post to delete
     * @return A boolean for testing purposes in angular
     */
    @DeleteMapping(value="/post/{id}")
    public @ResponseBody boolean deleteOnePost(@PathVariable int id){
        Post post = postService.getOne(id);
        postService.deletePost(post);
        return true;
    }

    //----------------------------------------------------------------------------------------------//

    /**
     * updates message on post
     * @param post post to update
     * @return A boolean for testing in angular
     */
    @PutMapping(value="/post/update")
    public @ResponseBody boolean updateOnePost( @RequestBody Post post){
        /*update message*/
        String message = post.getMessage();
        post = postService.getOne(post.getId());
        post.setMessage(message);
        postService.updatePost(post);
        return true;
    }

    //----------------------------------------------------------------------------------------------//

    /**
     * <p>Records that a user "liked" a post</p>
     * @param id - The id of the post to add a like to
     * @param userId - The user id of the person who liked the post
     * @return A null value for testing in angular
     */
    @PutMapping(value="/post/{id}/like")
    public @ResponseBody Post likePost(@PathVariable int id, @RequestBody int userId){
        Post post = new Post();
        post = postService.getOne(id);
        User user = new User();
        user = userService.getOne(userId);
        List<User> likes = new ArrayList<>();
        likes = post.getLikes();
        likes.add(user);
        post.setLikes(likes);
        postService.updatePost(post);
        return null;
    }

    //---------------------- CONSTRUCTOR ----------------------//

    @Autowired
    public PostController(PostService postService, UserService userService, S3ServiceImpl s3Service) {
        this.postService = postService;
        this.userService = userService;
        this.s3Service = s3Service;
    }
}
