package example.dao;

import example.models.Post;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.transaction.Transactional;
import java.util.List;

@Repository("postRepo")
@Transactional
public class PostDaoImpl implements PostDao{

    private SessionFactory sesFact;

    //----------------------------------------------------------------------------------------------//

    /**
     * <p>Adds a post to the database</p>
     * @param post - The post object to send to the database
     */
    @Override
    public void createPost(Post post) {
        Session session = sesFact.getCurrentSession();
        session.save(post);
    }

    //----------------------------------------------------------------------------------------------//

    /**
     * <p>Removes a post from the database</p>
     * @param  - The post object to be remove from the database
     */
    @Override
    public void deletePost(Post post) {
        Session session = sesFact.getCurrentSession();
        session.delete(post);
    }

    //----------------------------------------------------------------------------------------------//

    /**
     * <p>Updates the information of a post in the database</p>
     * @param post - The post to be updated
     */
    @Override
    public void updatePost(Post post) {
        Session session = sesFact.getCurrentSession();
        session.update(post);
    }

    //----------------------------------------------------------------------------------------------//

    /**
     * <p>Gets all posts (not comments) from the database</p>
     * @return A list of all posts in the database
     */
    @Override
    public List<Post> getAll() {
        Session session = sesFact.getCurrentSession();
        return session.createQuery("SELECT p FROM Post p WHERE post_ref_FK=null ORDER BY p.dateCreated DESC", Post.class).getResultList();
    }

    //----------------------------------------------------------------------------------------------//

    /**
     * <p>Retrieves on post from the database given an in</p>
     * @param postId - The id of the post to retrieve
     * @return A post object with a matching id
     */
    @Override
    public Post getOne(int postId) {
        Session session = sesFact.getCurrentSession();
        Post post = session.get(Post.class,postId);
        return post;
    }

    //----------------------------------------------------------------------------------------------//

    /**
     * <p>Gets all the posts a user has created given their user id</p>
     * @param id - The id of the user to get all posts for
     * @return A list of posts for one user
     */
    @Override
    public List<Post> getAllGivenUserId(int id) {

        Session session = sesFact.getCurrentSession();
        String hql = "SELECT p FROM Post p WHERE p.refPost=null AND p.user.id = :userId ORDER BY p.dateCreated DESC";
        Query query = session.createQuery(hql);
        query.setParameter("userId", id);
        return query.list();
    }

    //------------------------------- CONSTRUCTORS ----------------------------------------------------//

    @Autowired
    public PostDaoImpl(SessionFactory sesFact) {
        this.sesFact = sesFact;
    }
    public PostDaoImpl() { }

    public SessionFactory getSesFact() {
        return sesFact;
    }
    public void setSesFact(SessionFactory sesFact) {
        this.sesFact = sesFact;
    }
}
