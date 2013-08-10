
import org.apache.http.client.*;
import org.apache.http.impl.client.*;
import org.apache.http.client.methods.*;
import org.apache.http.*;
import java.io.*;
import java.net.*;
import java.util.Random;

/**
 * Fetches data from AngelList using their documented REST apis, found here:
 * https://angel.co/api
 *
 * Dependencies:
 * Apache httpclient library:  httpcomponents-client-4.2.5
 * http://hc.apache.org/httpcomponents-client-ga/
 *
 * @author Jason Zien (jasonz@gmail.com)
 *
 */
public class AList {

    /**
     * getEncodedPage - this is a helper method that gets the returned
     * page from an http request's response.
     * 
     * @param response - the HttpResponse that was returned by an http get
     * @return String - the resulting page is returned encoded using 
     * java.net.URLEncoder.
     */
    static public String getEncodedPage(HttpResponse response) throws IOException {

	BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));

	StringBuilder page = new StringBuilder();

	String line = "";
	while ((line = rd.readLine()) != null) {
	    // encode the data so that it has no whitespace and carriage returns
	    page.append(line);
	} 

	// we do not store the raw page results, but instead encode it

	String encoded = URLEncoder.encode(page.toString(), "ISO-8859-1");
	return(encoded);
    }

    /**
     * get - this is a function that creates an http client, executes
     * the get request, gets the encoded result and returns it.
     * @param url - the url to do an http get on.
     * @return String - the resulting page is returned encoded using 
     * java.net.URLEncoder.
     */
    static public String get(String url) throws IOException {

	HttpClient client = new DefaultHttpClient();
	HttpResponse response = client.execute(new HttpGet(url));

	StatusLine s = response.getStatusLine();
	int statusCode = (s != null) ? s.getStatusCode() : -1;

	String page = getEncodedPage(response);

	return(page);
    }

    /**
     * This is the main AngelList-specific code to formulate an AngelList 
     * REST api call.  It then gets the desired data (URLEncoded) and prints 
     * it to stdout.
     *
     * @param type - is a string that is either "startups" or "users"
     * https://angel.co/api/spec/startups
     * https://angel.co/api/spec/users
     * @param start - the starting index of the item to get
     * @param end - the ending index of the item to get
     */
    static public void getList(String type, int start, int end) throws IOException,InterruptedException {
	Random r = new Random();

	String baseAngelListUrl = "https://api.angel.co/1/" + type + "/batch?ids=";

	int count=0;
	int MAX_ITEMS=50;  // maximum allowed by the api

	for (int i=start; i<=end; i+= MAX_ITEMS) {
	    StringBuilder sb=new StringBuilder(baseAngelListUrl);

	    int max = i+MAX_ITEMS;
	    if (max > end) max = end;

	    for (int c=i; c<max; c++) {
		if (c!= (max-1)) sb.append(c + ",");
		else sb.append(c + "");
	    }

	    String url = sb.toString();

	    String fetchedResult = get(url);

	    System.out.println(fetchedResult);

	    // sleep to slow down the fetches
	    // you MUST do no more than 1000 fetches per hour (3.6 seconds per fetch)
	    Thread.sleep(4 + r.nextInt(5));
	}
    }

    static public void main(String[] args) throws Exception {

	if (args.length < 3) {
	    System.err.println("USAGE:   java AList [startups|users] [startNumber] [endNumber]");
	    System.err.println("example: java AList startups 0 100");
	    System.exit(-1);
	}

	String type = args[0];
	int start = Integer.parseInt(args[1]);
	int end = Integer.parseInt(args[2]);

	getList(type, start, end);

    }
}
