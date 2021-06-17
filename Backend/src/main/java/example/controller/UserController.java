package example.controller;

import example.models.User;
import example.services.ForgotPasswordEmailServiceImpl;
import example.services.S3ServiceImpl;
import example.services.UserService;
import example.utilities.Encryption;
import example.utilities.UrlEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:4200", allowedHeaders = "*", allowCredentials = "true")
public class    UserController {

    UserService userService;
    S3ServiceImpl s3Service;
    ForgotPasswordEmailServiceImpl forgotPasswordEmailService;

    //----------------------------------------------------------------------------------------------//

    /**
     *<p>Returns a list of all the users in the database</p>
     * @return A list of user objects
     */
    @GetMapping(value="/user")
    public @ResponseBody List<User> getAllUsers(){
        return this.userService.getAll();
    }

    //----------------------------------------------------------------------------------------------//

    /**
     *<p>Logs a user into the system by creating a loggedin session attribute</p>
     * @param user - The user to create a session attribute for
     * @param session - the current session of the user
     * @return A true or false value depending on whether a user was successfully logged in
     */
    @PostMapping(value="/login")
    public @ResponseBody boolean loginUser(HttpSession session, @RequestBody User user){
        System.out.println(user);
        if(userService.login(user)){
            //if true set session
            user = userService.getUserByUsername(user.getUsername());
            session.setAttribute("JazzHands", user);
            return true;
        }else{
            return false;
        }
    }

    //----------------------------------------------------------------------------------------------//

    /**
     * <p>Clears the loggedin session attribute</p>
     * @param session - The session to clear the attribute of
     * @return a true or false value depending on whether the session was successfully invalidated
     */
    @GetMapping(value="/logout")
    public boolean logout(HttpSession session){
        session.invalidate();
        return true;
    }

    //----------------------------------------------------------------------------------------------//

    /**
     *<p>Checks a session to see if the legged in attribute is null or not</p>
     * @param session -  The http session to check whether or not there is a user object aattached
     * @return A user object for the session
     */
    @GetMapping(value="/checkSession")
    public @ResponseBody User checkSession(HttpSession session){
        return (User) session.getAttribute("JazzHands");
    }

    //----------------------------------------------------------------------------------------------//

    /**
     *  <p>Retrieves a user from the database given a user id</p>
     * @param id - The id of the user to retrieve from the database
     * @return The user object of the matching id
     */
    @GetMapping(path = "/user/{id}")
    public User getUserGivenId(@PathVariable String id){
        return userService.getOne(Integer.parseInt(id));
    }

    //----------------------------------------------------------------------------------------------//

    /**
     *<p>Adds a user into the database</p>
     * @param user - The user object to add to the database
     * @return A server response code depending on whether the registration was successful or not
     */
    @PostMapping(value="/register", consumes= "application/json")
    public boolean registerUser(@RequestBody User user){
        System.out.println(user);
        user.setProfilePhoto("https://project2kchilds2020.s3.us-east-2.amazonaws.com/defaultpp.PNG");
        if(userService.register(user)){
            return true;
        }else{
            return false;
        }
    }

    //----------------------------------------------------------------------------------------------//

    /**
     * sends email to user that has forgotten their password
     * @return true if user exists false if not
     */
    @GetMapping(value="/user/forgot-password/{username}")
    public @ResponseBody boolean forgotPassword(@PathVariable String username) throws MessagingException {

        User user = userService.getUserByUsername(username);
        /*check if username exists*/
        if(user == null) return false;

        /*send email*/
        forgotPasswordEmailService.sendForgotPasswordEmail(user);

        return true;
    }

    //----------------------------------------------------------------------------------------------//

    /**
     * get all users like username
     * @return true if user exists false if not
     */
    @GetMapping(value="/user/search/{username}")
    public @ResponseBody List<User> getAllUsersLikeUsername(@PathVariable String username){

        return userService.getAllUsersLikeUsername(username);
    }

    //----------------------------------------------------------------------------------------------//

    /**
     *
     * @param id
     * @return
     */
    @PostMapping(value="/user/{id}")
    public @ResponseBody User updateOneUser(@PathVariable int id,
                                            @RequestParam(value = "file", required = false) MultipartFile multipartFile,
                                            @RequestParam("firstname") String firstname,
                                            @RequestParam("lastname") String lastname) throws IOException {

        /*get user given id*/
        User user = userService.getOne(id);

        /*updat profile picture if exists*/
        if(multipartFile != null){
            File file = new File(multipartFile.getOriginalFilename());
            multipartFile.transferTo(file);
            s3Service.setProfilePicture(user.getUsername(),file);
            user.setProfilePhoto("https://project2kchilds2020.s3.us-east-2.amazonaws.com/users/" + user.getUsername() + "/" + multipartFile.getOriginalFilename());
        }

        /*update user details*/
        user.setFirstname(firstname);
        user.setLastname(lastname);
        userService.updateUser(user);
        System.out.println(user);
        return user;
    }

    //----------------------------------------------------------------------------------------------//

    /**
     * <p>Resets user password</p>
     * @param username - The username of the account to reset the password for
     * @param password - The new password to set for the account
     * @return False if password was empty , true if the password was reset
     */
    @PostMapping(value="/user/reset-password")
    public @ResponseBody Boolean resetPassword(
            @RequestParam("username") String username,
            @RequestParam("password") String password) {

        /*get user given username*/
        User user = userService.getUserByUsername(UrlEncoder.decode(username));

        /*update password if not null*/
        if(user == null) return false;

        user.setPassword(Encryption.encrypt(password));
        userService.updateUser(user);

        return true;
    }

    //---------------------- CONSTRUCTOR ----------------------//

    @Autowired
    public UserController(UserService userService, S3ServiceImpl s3Service, ForgotPasswordEmailServiceImpl forgotPasswordEmailService) {
        this.userService = userService;
        this.s3Service = s3Service;
        this.forgotPasswordEmailService = forgotPasswordEmailService;
    }
}
