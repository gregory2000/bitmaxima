package bitapi;

import java.io.Serializable;

/**
 * Created by g42gregory on 5/26/14.
 */
public class Sentence implements Serializable {
    public String text;
    public String sentiment;


    Sentence(){}

    Sentence(String text, String sentiment){
        this.text = text;
        this.sentiment = sentiment;
    }

}
