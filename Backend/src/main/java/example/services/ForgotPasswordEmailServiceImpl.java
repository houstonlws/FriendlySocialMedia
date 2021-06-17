package example.services;


import example.models.User;
import example.utilities.Encryption;
import example.utilities.UrlEncoder;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Service("mailService")
public class ForgotPasswordEmailServiceImpl {

    //-----------------------------------------------------------------------------------//

    /**
     * <p>Sends an email to a user, from the website email address</p>
     * @param user - The user to send the email to
     * @throws MessagingException
     */
    public void sendForgotPasswordEmail(User user) throws MessagingException {
        System.out.println("Preparing to send email...");
        Properties properties = new Properties();

        properties.put("mail.smtp.auth","true");
        properties.put("mail.smtp.starttls.enable","true");

        /*declaring use of googles smtp server*/
        properties.put("mail.smtp.host","smtp.gmail.com");
        /*587 is required port to use for googles smtp servers*/
        properties.put("mail.smtp.port","587");

        String myaccountEmail = "project2energy@gmail.com";
        String password = "FluffyBunny48";

        /*get session with valid credentials for smtp server*/
        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(myaccountEmail,password);
            }
        });

        /*create message to be sent*/
        Message message = prepareMessage(session, myaccountEmail, user);

        /*send the actual message*/
        Transport.send(message);
        System.out.println("Message Sent Successfully");

    }

    //-----------------------------------------------------------------------------------//

    /**
     * <p>Creates an email that contains a link that lets a user reset their password</p>
     * @param session - The session of the user who is resetting their password
     * @param myAccountEmail - The email of that the reset password email will be coming from
     * @param user - The user who is requesting a password reset
     * @return A message object to be sent to the user
     */
    /*styling of how email will look to user*/
    public static Message prepareMessage(Session session, String myAccountEmail, User user){
        try{
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(myAccountEmail));
            message.setRecipient(Message.RecipientType.TO,new InternetAddress(user.getEmail()));
            message.setSubject("FRIENDLY: Forgot your Password");
            message.setText("To reset your password, please go to the following link: http://localhost:4200/password-reset/" + UrlEncoder.encode(user.getUsername())
                    );
            return message;

        }catch(Exception ex){
            ex.printStackTrace();
        }

        return null;
    }

    //-----------------------------------------------------------------------------------//

}
