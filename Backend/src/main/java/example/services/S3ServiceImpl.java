package example.services;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;

/**
 * utility class to add photos to s3 bucket
 * */
@Service("s3Service")
public class S3ServiceImpl{

    String SECRET_ACCESS_KEY = System.getenv("S3_SECRET_ACCESS_KEY");
    String ACCESS_KEY_ID = System.getenv("S3_ACCESS_KEY_ID");
    String BUCKET_NAME = "project2kchilds2020";
    BasicAWSCredentials awsCredentials = new BasicAWSCredentials(ACCESS_KEY_ID,SECRET_ACCESS_KEY);

    AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
            .withRegion("us-east-2")
            .withCredentials(new AWSStaticCredentialsProvider(awsCredentials)).build();

    //-----------------------------------------------------------------------------------//

    /**
     * @param username username of user attempting to upload
     * @param image image to upload
     * @return true if document has been uploaded
     * */
    public boolean setProfilePicture(String username, File image) {
        try{
            String extension = FilenameUtils.getExtension(image.getName());
            //check if not an image
            if(!
                    (extension.toUpperCase().equals("PNG") ||
                    extension.toUpperCase().equals("JPEG") ||
                    extension.toUpperCase().equals("JPG"))
            ) return false;
            //add file
            s3Client.putObject(BUCKET_NAME,
                    "users/" + username + "/" + image.getName(),
                    image);

            return true;

        }catch (Exception e){
            e.printStackTrace();
        }

        return false;
    }

    //-----------------------------------------------------------------------------------//

    /**
     * <p>Adds a photo to the s3 bucket</p>
     * @param username - The username of the user uploading a photo
     * @param image - The photo to be uploaded to s3
     * @return A true or false value depending on whether or not the photo was successfully uploaded
     */
    public boolean addPhoto(String username, File image) {
        try{
            String extension = FilenameUtils.getExtension(image.getName());
            //check if not an image
            if(!
                    (extension.toUpperCase().equals("PNG") ||
                            extension.toUpperCase().equals("JPEG") ||
                            extension.toUpperCase().equals("JPG"))
            ) return false;
            //add file
            s3Client.putObject(BUCKET_NAME,
                    "users/" + username + "/" + image.getName() ,
                    image);

            return true;

        }catch (Exception e){
            e.printStackTrace();
        }

        return false;
    }

    //-----------------------------------------------------------------------------------//

}
