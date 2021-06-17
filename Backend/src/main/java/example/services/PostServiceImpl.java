package example.services;

import example.dao.PostDao;
import example.models.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("postService")
public class PostServiceImpl implements PostService{

    //-----------------------------------------------------------------------------------//

    /**
     * <p>Calls ths the post dao to add a post to the database</p>
     * @param post - The post object to be asdded to the database
     */
    @Override
    public void createPost(Post post) {
        postDao.createPost(post);
    }

    //-----------------------------------------------------------------------------------//

    /**
     * <p>Calls the post dao to delete a post from the database</p>
     * @param post - The post to be deleted from the database
     */
    @Override
    public void deletePost(Post post) {
        postDao.deletePost(post);
    }

    //-----------------------------------------------------------------------------------//

    /**
     * <p>Calls the post dao to update a post in the database</p>
     * @param post - The post to be updated in the database
     */
    @Override
    public void updatePost(Post post) {
        postDao.updatePost(post);
    }

    //-----------------------------------------------------------------------------------//

    /**
     * <p>Calls the post dao to get a list of all posts in the database</p>
     * @return A list of all posts in the database
     */
    @Override
    public List<Post> getAll() {
        return postDao.getAll();
    }

    //-----------------------------------------------------------------------------------//

    /**
     * <p>Calls the post dao to get one post given an id</p>
     * @param postId - The id of the post to get from the database
     * @return A post with the same id as the parameter
     */
    @Override
    public Post getOne(int postId) {
        return postDao.getOne(postId);
    }

    //-----------------------------------------------------------------------------------//

    /**
     * <p>Calls the post dao to get all posts for a user giver theiir user id</p>
     * @param id - The id of the user to get posts for
     * @return A list of posts of the user with the id in the parameter
     */
    @Override
    public List<Post> getAllPostsGivenUserId(int id) {
        return postDao.getAllGivenUserId(id);
    }

    //---------------------------------- CONSTRUCTORS --------------------------------------//

    private PostDao postDao;

    @Autowired
    public PostServiceImpl(PostDao postDao) {
        this.postDao = postDao;
    }

}
