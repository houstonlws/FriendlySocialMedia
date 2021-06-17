package example.services;


import example.models.User;

import java.util.List;


public interface UserService {
    void createUser(User user);
    void deleteUser(User user);
    void updateUser(User user);
    List<User> getAll();
    User getOne(int userId);
    boolean login(User user);
    boolean register(User user);
    User getUserByUsername(String username);

    List<User> getAllUsersLikeUsername(String username);
}
