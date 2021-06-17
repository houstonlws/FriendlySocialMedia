package example.utilities;

import java.util.Base64;

public class UrlEncoder {
    public static String encode(String str){
        return Base64.getUrlEncoder().withoutPadding().encodeToString(str.getBytes());
    }

    public static String decode(String encStr){
        byte[] decodedBytes = Base64.getUrlDecoder().decode(encStr);
        String decodedVal = new String(decodedBytes);
        return decodedVal;
    }
}
