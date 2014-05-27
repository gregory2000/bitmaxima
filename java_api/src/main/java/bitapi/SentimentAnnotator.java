package bitapi;

import java.util.List;
import java.util.Properties;

import edu.stanford.nlp.ling.CoreLabel;
import edu.stanford.nlp.ling.Sentence;
import edu.stanford.nlp.neural.rnn.RNNCoreAnnotations;
import edu.stanford.nlp.pipeline.StanfordCoreNLP;
import edu.stanford.nlp.pipeline.Annotation;
import edu.stanford.nlp.ling.CoreAnnotations.SentencesAnnotation;
import edu.stanford.nlp.ling.CoreAnnotations.TokensAnnotation;
import edu.stanford.nlp.ling.CoreAnnotations.PartOfSpeechAnnotation;
import edu.stanford.nlp.sentiment.SentimentCoreAnnotations;
import edu.stanford.nlp.trees.Tree;
import edu.stanford.nlp.util.CoreMap;


public class SentimentAnnotator {

    StanfordCoreNLP snlp;

    SentimentAnnotator(){
        Properties props = new Properties();
        props.put("annotators", "tokenize, ssplit, parse, sentiment");
        snlp = new StanfordCoreNLP(props);
    }

    public Annotation annotate(String text){
        Annotation document = new Annotation(text);
        snlp.annotate(document);
        return document;
    }

    public static void main(String[] args) {
        String[] sentimentText = { "very negative","negative", "neutral", "positive", "very positive"};
        String text = "This is absolutely awesome! We think that the sentiment was negative in that sentence. Everytime I hear them, I have to dance with joy. I studied at Stanford. This movie doesn't care about cleverness, wit or any other kind of intelligent humor. Those who find ugly meanings in beautiful things are corrupt without being charming. There are slow and repetitive parts, but it has just enough spice to keep it interesting. What is this crap? What is this? This company is awesome! I love this Company! Yesterday dumb Bob destroyed my fancy iPhone in beautiful Denver, Colorado. I guess I will have to head over to the Apple Store and buy a new one.";

        SentimentAnnotator sa = new SentimentAnnotator();
        Annotation document = sa.annotate(text);

        List<CoreMap> sentences = document.get(SentencesAnnotation.class);

        for (CoreMap sentence : sentences){
            System.out.println(sentence);

            Tree tree = sentence.get(SentimentCoreAnnotations.AnnotatedTree.class);

            int sentiment = RNNCoreAnnotations.getPredictedClass(tree);

            System.out.println("sentiment: " + sentimentText[sentiment]);
            //System.out.println();


        }
    }
}
