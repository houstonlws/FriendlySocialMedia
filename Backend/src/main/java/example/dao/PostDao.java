package example.dao;


import example.models.Post;

import java.util.List;


public interface PostDao {
    void createPost(Post post);
    void deletePost(Post post);
    void updatePost(Post post);
    List<Post> getAll();
    Post getOne(int postId);

    List<Post> getAllGivenUserId(int id);
}
