package example.dao;


import example.models.User;

import java.util.List;


public interface UserDao {
    void createUser(User user);
    void deleteUser(User user);
    void updateUser(User user);
    List<User> getAll();
    User getOne(int userId);
    User getUserByUsername(String name);
    User getUserByEmail(String email);

    List<User> getAllUsersLikeUsername(String username);
}
