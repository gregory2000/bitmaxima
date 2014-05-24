package bitapi;
import java.util.List;
import java.util.Properties;

import edu.stanford.nlp.ling.CoreLabel;
import edu.stanford.nlp.ling.Sentence;
import edu.stanford.nlp.pipeline.StanfordCoreNLP;
import edu.stanford.nlp.pipeline.Annotation;
import edu.stanford.nlp.ling.CoreAnnotations.SentencesAnnotation;
import edu.stanford.nlp.ling.CoreAnnotations.TokensAnnotation;
import edu.stanford.nlp.ling.CoreAnnotations.PartOfSpeechAnnotation;
import edu.stanford.nlp.util.CoreMap;


public class Main {

    public static void main(String[] args) {
        Properties props = new Properties();
        props.put("annotators", "tokenize, ssplit, pos, lemma, parse");
        StanfordCoreNLP snlp = new StanfordCoreNLP(props);

        String text = "Yesterday dumb Bob destroyed my fancy iPhone in beautiful Denver, Colorado.";
        Annotation document = new Annotation(text);
        snlp.annotate(document);

        List<CoreMap> sentences = document.get(SentencesAnnotation.class);

        for (CoreMap sentence : sentences){
            System.out.println(sentence);
            for (CoreLabel token: sentence.get(TokensAnnotation.class)) {
                String lemma = token.lemma();
                String pos = token.get(PartOfSpeechAnnotation.class);
                //String ne = token.ner();
                System.out.println("word: " + token.word() + ", lemma: "+ lemma + " pos: " + pos);
            }
        }
    }
}
