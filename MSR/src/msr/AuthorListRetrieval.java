package msr;

/*
 * Copyright 2011 Nabeel Mukhtar and 2013 George Gregory
 *  
 */


import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.text.MessageFormat;

import org.apache.commons.cli.BasicParser;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.HelpFormatter;
import org.apache.commons.cli.Option;
import org.apache.commons.cli.OptionBuilder;
import org.apache.commons.cli.Options;
import org.apache.commons.cli.ParseException;

import com.microsoft.research.Author;
import com.microsoft.research.PagedList;
import com.microsoft.research.query.AcademicSearchQueryFactory;
import com.microsoft.research.query.AuthorSearchQuery;

/**
 * 
 * @author g42gregory
 *
 */
public class AuthorListRetrieval {

	//File name global variable
	static String fileName = "";
	
	//Query number start
	static int start = 0;
	
	//Query number end
	static int end = 0;
	
    /** The Constant APPLICATION_KEY_OPTION. */
    private static final String APPLICATION_KEY_OPTION = "appid";
        
    /** The Constant QUERY_OPTION.
    private static final String QUERY_OPTION = "query";
    **/    
    
    /** The Constant HELP_OPTION. */
    private static final String HELP_OPTION = "help";
    
    /**
     * The main method.
     * 
     * @param args the arguments
     * @throws InterruptedException 
     * @throws IOException 
     * @throws FileNotFoundException 
     */
        public static void main(String[] args) throws InterruptedException, FileNotFoundException, IOException {
        
        start = Integer.parseInt(args[2]);
        end = Integer.parseInt(args[3]);
        fileName = args[4];
        	
        		Options options = buildOptions();
        try {
            CommandLine line = new BasicParser().parse(options, args);
            processCommandLine(line, options);
        } catch(ParseException exp ) {
            System.err.println(exp.getMessage());
            printHelp(options);
        }
        }
    
        /**
         * Process command line.
         * 
         * @param line the line
         * @param options the options
         * @throws InterruptedException 
         * @throws IOException 
         * @throws FileNotFoundException 
         */
    private static void processCommandLine(CommandLine line, Options options) throws InterruptedException, FileNotFoundException, IOException {
        if(line.hasOption(HELP_OPTION)) {
            printHelp(options);            
        } else if(line.hasOption(APPLICATION_KEY_OPTION)) {
                AcademicSearchQueryFactory factory = AcademicSearchQueryFactory.newInstance(line.getOptionValue(APPLICATION_KEY_OPTION));

                ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream(fileName));
                

                	for (int i = start; i < end; i++)
                	{
                		AuthorSearchQuery query = factory.newAuthorSearchQuery();
                		PagedList<Author> response = query.withDomainId(2).withStartIndex(i * 100 + 1).withEndIndex((i + 1) * 100).list();
                		out.writeObject(response);
                		printResponse(response);
                		int rand = 500 + (int)(Math.random() * ((700 - 500) + 1));
                		Thread.sleep(rand);
                	}
                	out.close();
        } else {
                printHelp(options);
        }
        }

        /**
         * Prints the response.
         * 
         * @param response the response
         */
        private static void printResponse(PagedList<Author> response) {
                System.out.println(response.getStartIndex()+" - "+response.getEndIndex()+" of:"+response.getTotalItems());
                /**
                for (Author result : response) {
                        System.out.println(result.getFirstName() + " " + result.getLastName() + " " + result.getID());                       
                        System.out.println(result.getHomepageURL());                    
                        if (result.getAffiliation() != null)
                        {    
                        		System.out.println(result.getAffiliation().getID()+": "+result.getAffiliation().getName());
                			} else 
                			{
                				System.out.println("null");
                			}
                        System.out.println("=======================================");                  
                }
                
                System.out.println(response.getTotalItems());
                **/
        }

        /**
         * Builds the options.
         * 
         * @return the options
         */
    private static Options buildOptions() {
       
        Options opts = new Options();
        
        String helpMsg = "Print this message.";
        Option help = new Option(HELP_OPTION, helpMsg);
        opts.addOption(help);

        String applicationKeyMsg = "You Application ID.";
        OptionBuilder.withArgName("appid");
        OptionBuilder.hasArg();
        OptionBuilder.withDescription(applicationKeyMsg);
        Option applicationKey = OptionBuilder.create(APPLICATION_KEY_OPTION);
        opts.addOption(applicationKey);
        
        /**
        String queryMsg = "Search Query.";
        OptionBuilder.withArgName("query");
        OptionBuilder.hasArg();
        OptionBuilder.withDescription(queryMsg);
        Option query = OptionBuilder.create(QUERY_OPTION);
        opts.addOption(query);
        **/
        
        return opts;
    }
    
    /**
     * Prints the help.
     * 
     * @param options the options
     */
    private static void printHelp(Options options) {
        int width = 80;
        String syntax = AuthorListRetrieval.class.getName() + " <options>";
        String header = MessageFormat.format("\nThe -{0} and -{1} options are required. All others are optional.", APPLICATION_KEY_OPTION);
        new HelpFormatter().printHelp(width, syntax, header, options, null, false);
    }
}