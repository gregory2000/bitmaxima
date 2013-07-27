
import java.io.File;
import java.io.IOException;

import java.util.Hashtable;
import java.util.Vector;

import org.apache.commons.lang3.StringEscapeUtils;

// java SAX parser imports
import javax.xml.parsers.*;
import org.xml.sax.*;
import org.xml.sax.helpers.*;


/**
 * Dblp2Csv.java - this program converts a dblp.xml file into a CSV file.
 *
 * @author Jason Zien (jasonz@gmail.com)
 *
 * dependencies:  requires library commons-lang3-3.1.jar to be in your classpath.
 * makes use of StringEscapeUtils.escapeCsv
 * http://commons.apache.org/proper/commons-lang/javadocs/api-2.6/org/apache/commons/lang/StringEscapeUtils.html
 *
 * download from:
 *   http://commons.apache.org/proper/commons-lang/download_lang.cgi
 *   http://commons.apache.org/proper/commons-lang/
 */

public class Dblp2Csv {

    // articleTypes - is a table of all the different article (paper) types in dblp
    static Hashtable articleTypes = new Hashtable();
    static {
	articleTypes.put("article","yes");
	articleTypes.put("inproceedings","yes");
	articleTypes.put("proceedings","yes");
	articleTypes.put("book","yes");
	articleTypes.put("incollection","yes");
	articleTypes.put("phdthesis","yes");
	articleTypes.put("mastersthesis","yes");
	articleTypes.put("www","yes");
    }

    /**
     * DblpRecord - is a simple record representing a dblp article/paper.  
     */
    public class DblpRecord {
	// use as a struct.  (everything's public)
	public String title;
	public Vector<String> authors = new Vector<String>();
	public String journal;
	public String year;
	public String url;
	public String ee;

	/**
	 * init - this method initializes the fields in this record.
	 */
	public void init() {
	    title = journal = year = url = ee = "";
	    authors.clear();
	}

	/**
	 * outputCsv - this method outputs the fields in csv format to System.out.
	 */
	public void outputCsv() {
	    for (String author : authors) {
		System.out.print(StringEscapeUtils.escapeCsv(title));
		System.out.print(",");
		System.out.print(StringEscapeUtils.escapeCsv(author));
		System.out.print(",");
		System.out.print(StringEscapeUtils.escapeCsv(journal));
		System.out.print(",");
		System.out.print(StringEscapeUtils.escapeCsv(year));
		System.out.print(",");
		System.out.print(StringEscapeUtils.escapeCsv(url));
		System.out.print(",");
		System.out.println(StringEscapeUtils.escapeCsv(ee));
	    }
	}

    }

    // the current DblpRecord being processed
    DblpRecord currentRecord = new DblpRecord();

    /**
     * DblpHandler - this is the main class that does the work of
     * handling the Sax Parser callbacks.  It extends the Sax Parser
     * DefaultHandler.
     */
    private class DblpHandler extends DefaultHandler {
	boolean insideArticle = false;
	boolean insideAuthor = false;
	boolean insideTitle = false;
	boolean insideYear = false;
	boolean insideJournal = false;
	boolean insideUrl = false;
	boolean insideEe = false;

	/**
	 * startElement - this is a callback from the Sax parser for when it finds a
	 * starting tag element, for example, <author>.
	 * @param tagName - this is the name of the tag, without the angle brackets.
	 */
        public void startElement(String namespaceURI, String localName, String tagName, Attributes atts) throws SAXException {

	    if (articleTypes.get(tagName)!=null) {
		insideArticle=true;
		currentRecord.init();
	    }
	    else if (tagName.equals("author")) {
		insideAuthor=true;
	    }
	    else if (tagName.equals("title")) {
		insideTitle=true;
	    }
	    else if (tagName.equals("year")) {
		insideYear=true;
	    }
	    else if (tagName.equals("journal") || tagName.equals("booktitle")) {
		insideJournal=true;
	    }
	    else if (tagName.equals("url")) {
		insideUrl=true;
	    }
	    else if (tagName.equals("ee")) {
		insideEe=true;
	    }
        }

	/**
	 * endElement - this is a callback from the Sax parser for when it finds an
	 * ending tag element, for example, </author>.
	 * @param tagName - this is the name of the tag, without the angle brackets and slash.
	 */
        public void endElement(String namespaceURI, String localName, String tagName) throws SAXException {
	    if (articleTypes.get(tagName)!=null) {
		insideArticle=false;
		currentRecord.outputCsv();
            }
            else if (tagName.equals("author")) {
		insideAuthor=false;
            }
            else if (tagName.equals("title")) {
		insideTitle=false;
            }
	    else if (tagName.equals("year")) {
		insideYear=false;
	    }
	    else if (tagName.equals("journal") || tagName.equals("booktitle")) {
		insideJournal=false;
	    }
	    else if (tagName.equals("url")) {
		insideUrl=false;
	    }
	    else if (tagName.equals("ee")) {
		insideEe=false;
	    }
        }

	/**
	 * characters - this is a callback from the Sax parser for text that appears
	 * between the start and end tag.  For instance, given <author>Jason Z</author>,
	 * it would return "Jason Z".
	 * You use this in conjunction with state information you know about where
	 * you are in the tag structure by keeping track of the state based on the
	 * startElement and endElement items you have seen so far.
	 */
        public void characters(char[] ch, int start, int length)
	    throws SAXException {
            if (insideArticle) {
		String s = new String(ch, start, length);

		if (insideAuthor) {
		    currentRecord.authors.add(s);
		}
		else if (insideTitle) {
		    currentRecord.title = s;
		}
		else if (insideYear) {
		    currentRecord.year = s;
		}
		else if (insideJournal) {
		    currentRecord.journal = s;
		}
		else if (insideUrl) {
		    currentRecord.url = s;
		}
		else if (insideEe) {
		    currentRecord.ee = s;
		}
	    }
        }

        public void warning(SAXParseException exception) throws SAXException {
	    exception.printStackTrace();
            throw new SAXException("Warning encountered");
        }

        public void error(SAXParseException exception) throws SAXException {
	    exception.printStackTrace();
            throw new SAXException("Error encountered");
        }

        public void fatalError(SAXParseException exception) throws SAXException {
	    exception.printStackTrace();
            throw new SAXException("Fatal Error encountered");
        }
    }

    /**
     * Constructor.  
     * This initializes the Sax parser and does the parsing.
     */
    Dblp2Csv(String fileName) {
	try {
	    SAXParserFactory parserFactory = SAXParserFactory.newInstance();
	    SAXParser parser = parserFactory.newSAXParser();
	    DblpHandler handler = new DblpHandler();

	    parser.getXMLReader().setFeature("http://xml.org/sax/features/validation", true);

	    parser.parse(new File(fileName), handler);

	} catch (IOException e) {
	    e.printStackTrace();
	} catch (SAXException e) {
	    e.printStackTrace();
	} catch (ParserConfigurationException e) {
	    e.printStackTrace();
	}

    }

    /**
     * main method:  expects one arg, the dblp file to parse (dblp.xml)
     */
    public static void main(String[] args) {
	if (args.length < 1) {
	    System.out.println("Usage: java Dblp2Csv dblp.xml");
	    System.exit(0);
	}
	Dblp2Csv p = new Dblp2Csv(args[0]);
    }
}


