package example.utilities;

import org.jasypt.util.text.BasicTextEncryptor;

/**
 * Custom Encryption for project 1
 * */
public class Encryption {

    /**
     * encrypts string
     * */
    public static String encrypt(String password) {
        BasicTextEncryptor textEncryptor = new BasicTextEncryptor();
        textEncryptor.setPassword("JazzHands");
        return textEncryptor.encrypt(password);
    }

    /**
     * decrypts string
     * */
    public static String decrypt(String enc) {
        BasicTextEncryptor textEncryptor = new BasicTextEncryptor();
        textEncryptor.setPassword("JazzHands");
        return textEncryptor.decrypt(enc);
    }
}
