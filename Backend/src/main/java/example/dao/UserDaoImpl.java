package example.dao;

import example.models.User;
import org.hibernate.Hibernate;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;



import javax.transaction.Transactional;
import java.util.List;


@Repository("userRepo")
@Transactional
public class UserDaoImpl implements UserDao{

    private SessionFactory sesFact;

    //----------------------------------------------------------------------------------------------//

    /**
     *<p>Adds a user object to the database</p>
     * @param user - The user object to add to the database
     */
    @Override
    public void createUser(User user) {
        Session session = sesFact.getCurrentSession();
        session.save(user);
    }

    //----------------------------------------------------------------------------------------------//

    /**
     * <p>Removes a user from the database</p>
     * @param user - The user object to delete from the database
     */
    @Override
    public void deleteUser(User user) {
        Session session = sesFact.getCurrentSession();
        session.delete(user);
    }

    //----------------------------------------------------------------------------------------------//

    /**
     * <p>Updates a user in the database</p>
     * @param user - The user object to update
     */
    @Override
    public void updateUser(User user) {
        Session session = sesFact.getCurrentSession();
        session.update(user);
    }

    //----------------------------------------------------------------------------------------------//

    /**
     * <p>Gets a list of all users in the database</p>
     * @return A list of all the user objects in the database
     */
    @Override
    public List<User> getAll() {
        return sesFact.getCurrentSession().createQuery("from User", User.class).list();
    }

    //----------------------------------------------------------------------------------------------//

    /**
     * Retrieves user object given id of user
     * @param userId user ID of user to get
     * @return user object
     */
    @Override
    public User getOne(int userId) {
        Session session = sesFact.getCurrentSession();
        User user = session.get(User.class,userId);
        return user;
    }

    //----------------------------------------------------------------------------------------------//

    /**
     * Retrieves user object given username of user
     * @param username username of user to get
     * @return user object
     */
    @Override
    public User getUserByUsername(String username) {
        Session session = sesFact.getCurrentSession();
        String hql = "from User where username = :username";
        Query query = session.createQuery(hql);
        query.setParameter("username", username);
        return (User) query.uniqueResult();
    }

    //----------------------------------------------------------------------------------------------//

    /**
     * <p>Retrieves user object given email</p>
     * @param email - The email of the user to retrieve
     * @return A User object
     */
    @Override
    public User getUserByEmail(String email) {
        Session session = sesFact.getCurrentSession();
        String hql = "from User where email = :email";
        Query query = session.createQuery(hql);
        query.setParameter("email", email);
        return (User) query.uniqueResult();
    }

    //----------------------------------------------------------------------------------------------//

    /**
     * <p>Creates a query that returns usernames that contain the provided substring</p>
     * @param username - The query string to search the database with
     * @return A list of user accounts with matching substrings
     */
    @Override
    public List<User> getAllUsersLikeUsername(String username) {
        Session session = sesFact.getCurrentSession();
        String hql = "from User where username like :username";
        Query query = session.createQuery(hql);
        query.setParameter("username", "%" + username + "%");
        return query.list();
    }

    //--------------------------------------- CONSTRUCTORS ----------------------------------------------//

    @Autowired
    public UserDaoImpl(SessionFactory sesFact) {
        this.sesFact = sesFact;
    }
    public UserDaoImpl() { }

    public SessionFactory getSesFact() {
        return sesFact;
    }
    public void setSesFact(SessionFactory sesFact) {
        this.sesFact = sesFact;
    }

}
