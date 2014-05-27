package bitapi;

import static spark.Spark.*;

public class RESTserver {

    public static void main(String[] args) {
        SentimentAnnotator sentimentAnnotator = new SentimentAnnotator();

        setPort(8080);

        post("/sentiment", "application/json", (request, response) -> {
            return new SentimentResponse(request.body(), sentimentAnnotator);
        }, new JsonTransformer());



    }
}
