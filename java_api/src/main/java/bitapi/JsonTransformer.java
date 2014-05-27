package bitapi;

import com.google.gson.Gson;
import spark.ResponseTransformer;

/**
 * Created by g42gregory on 5/26/14.
 */

public class JsonTransformer implements ResponseTransformer {

    private Gson gson = new Gson();

    @Override
    public String render(Object model) {
        return gson.toJson(model);
    }

}