package bitapi;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import edu.stanford.nlp.neural.rnn.RNNCoreAnnotations;
import edu.stanford.nlp.pipeline.Annotation;
import edu.stanford.nlp.ling.CoreAnnotations.SentencesAnnotation;
import edu.stanford.nlp.sentiment.SentimentCoreAnnotations;
import edu.stanford.nlp.trees.Tree;
import edu.stanford.nlp.util.CoreMap;

/**
 * Created by g42gregory on 5/26/14.
 */
public class SentimentResponse implements Serializable {

    public ArrayList<Sentence> sentences = new ArrayList();

    SentimentResponse(){}
    SentimentResponse(String text, SentimentAnnotator sa){
        String[] sentimentText = { "very negative","negative", "neutral", "positive", "very positive"};
        Annotation document = sa.annotate(text);
        List<CoreMap> sents = document.get(SentencesAnnotation.class);
        for (CoreMap sent : sents){
            Tree tree = sent.get(SentimentCoreAnnotations.AnnotatedTree.class);
            int sentiment = RNNCoreAnnotations.getPredictedClass(tree);
            Sentence sentence = new Sentence(sent.toString(), sentimentText[sentiment]);
            sentences.add(sentence);

            //System.out.println(sent);
            //System.out.println("sentiment: " + sentimentText[sentiment]);
        }

    }
}
