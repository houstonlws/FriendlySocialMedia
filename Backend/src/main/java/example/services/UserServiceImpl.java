package example.services;


import example.dao.UserDao;
import example.models.User;
import example.utilities.Encryption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("userService")
public class UserServiceImpl implements UserService{

    //-----------------------------------------------------------------------------------//

    /**
     * <p>Calls the user dao to add a user to the database</p>
     * @param user - The user object to be added to the database
     */
    @Override
    public void createUser(User user) {
        userDao.createUser(user);
    }

    //-----------------------------------------------------------------------------------//

    /**
     * <p>Calls the user dao to delete a user from the database</p>
     * @param user - The user to delete
     */
    @Override
    public void deleteUser(User user) {

    }

    //-----------------------------------------------------------------------------------//

    /**
     * <p>Calls the user dao to update a user in the database</p>
     * @param user - The user to update the values of in the database
     */
    @Override
    public void updateUser(User user) {
        userDao.updateUser(user);
    }

    //-----------------------------------------------------------------------------------//

    /**
     <p>Gets a list of all users in the database</p>>
     * @return A list of user objects
     */
    @Override
    public List<User> getAll() {
        return userDao.getAll();
    }

    //-----------------------------------------------------------------------------------//

    /**
     * <p>Gets a user, given an id number</p>
     * @param userId - The id number of the user to get
     * @return AA user object of the given id
     */
    @Override
    public User getOne(int userId) {
        return userDao.getOne(userId);
    }

    //-----------------------------------------------------------------------------------//

    /**
     *<p>Method to check if username exists, and if so whether the password provided is correct</p>
     * @param user - The user object containing the information entered by the end user
     */
    @Override
    public boolean login(User user) {
       //
        String username = user.getUsername();
        String password = user.getPassword();
        if(username==null){
            return false;
        }
        //check if username matches password
        User check = userDao.getUserByUsername(username);
        if(check == null){
            return false;
        }

        if(password.equals(Encryption.decrypt(check.getPassword()))){
            return true;
        }else{
            return false;
        }
    }

    //-----------------------------------------------------------------------------------//

    /**
     *<p>Checks the database for instances of the entered username and email and if it doesn't return anything,
     * adds the user to the database</p>
     * @param user - The user object to add to the database
     */
    @Override
    public boolean register(User user) {
        User check = userDao.getUserByUsername(user.getUsername());
        User check2 = userDao.getUserByEmail(user.getEmail());
        //checks if username/email exists in database
        if(check!=null || check2!=null){
            return false;
        }else{
            String password = user.getPassword();
            user.setPassword(Encryption.encrypt(password));
            userDao.createUser(user);
            return true;
        }
    }

    //-----------------------------------------------------------------------------------//

    /**
     * <p>Calls the user dao to get a user object given a username</p>
     * @param username - the username of the user to get from the database
     * @return A user object matching the username provided
     */
    @Override
    public User getUserByUsername(String username) {
        return userDao.getUserByUsername(username);
    }

    //-----------------------------------------------------------------------------------//

    /**
     * <p>Calls the user dao to get users with usernames matching  or containing substrings of the provided name</p>
     * @param username - The substring to query in the database
     * @return A list of users containing the provided substring
     */
    @Override
    public List<User> getAllUsersLikeUsername(String username) {
        return userDao.getAllUsersLikeUsername(username);
    }

    //-----------------------------------------------------------------------------------//

    UserDao userDao;

    @Autowired
    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

}
