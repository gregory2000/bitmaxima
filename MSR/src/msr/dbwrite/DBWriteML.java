package msr.dbwrite;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

import com.microsoft.research.Author;
import com.microsoft.research.Domain;
import com.microsoft.research.PagedList;

import tables.MLAuthor;

import com.avaje.ebean.Ebean;  
import com.avaje.ebean.config.GlobalProperties;

/**
 * 
 * @author g42gregory
 *
 */
public class DBWriteML 
{
	//File name global variable
	static String fileName = "";
	
	//Query number start
	static int start = 0;
	
	//Query number end
	static int end = 0;
	
	//starting rank of the batch
	static int rankStart = 0;

	public static void printAuthor(MLAuthor a)
	{
		System.out.println(a.getHomepageURL());
		System.out.println(a.getHomepageURL().length());
	}
	
	public static void writeDB(Author result, int rank)
	{
        MLAuthor a = new MLAuthor();  
     
        a.setRank(rank);
        a.setID(result.getID().intValue());
        a.setPublicationCount(result.getPublicationCount().intValue());
        a.setCitationCount(result.getCitationCount().intValue());
        a.setFirstName(result.getFirstName());
        a.setMiddleName(result.getMiddleName());
        a.setLastName(result.getLastName());
        a.setNativeName(result.getNativeName());
        a.setHomepageURL(result.getHomepageURL());
        if (result.getAffiliation() != null)
        {
        		a.setOrgID(result.getAffiliation().getID().intValue());
        		a.setOrgName(result.getAffiliation().getName());
        }
        	a.setDisplayPhotoURL(result.getDisplayPhotoURL());
        a.setHIndex(result.getHIndex().intValue());
        a.setGIndex(result.getGIndex().intValue());
        
        int s = result.getResearchInterestDomain().size();
        	if (s > 0)
        		a.setDom1(result.getResearchInterestDomain().get(0).getName());
        	if (s > 1)
        		a.setDom2(result.getResearchInterestDomain().get(1).getName());
        	if (s > 2)
        		a.setDom3(result.getResearchInterestDomain().get(2).getName());
        	if (s > 3)
        		System.out.println("too many domains!");
       
        	try
        	{
        		Ebean.save(a);
        	}
        	catch(Exception e)
        	{
        		printAuthor(a);
        	}
        	
        // find the inserted entity by its id  
        //MLAuthor e2 = Ebean.find(MLAuthor.class, e.getRowId());  
        //System.out.println("Got "+e2.getFirstName());  
          
        //Ebean.delete(e);  
        // can use delete by id when you don't have the bean  
        //Ebean.delete(ESimple.class, e.getId());  
		
	}
	
	private static void read(ObjectInputStream in) throws ClassNotFoundException, IOException 
	{
		int rank = 0; //author rank on the system
		for (int i = start; i < end; i++)
		{
			@SuppressWarnings("unchecked")
			PagedList<Author> response = (PagedList<Author>) in.readObject();
			System.out.println(response.getStartIndex()+" - "+response.getEndIndex()+" of:"+response.getTotalItems());
			int j = 0;
			for (Author result : response)
			{
				j++;
				rank = rankStart + i * 100 + j;
                	writeDB(result, rank);
			
				/**
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
                **/
			}
		}
	}
	
	public static void main(String[] arg) throws FileNotFoundException, IOException, ClassNotFoundException
	{		
		//System.setProperty("catalina.base", "D:/apps/tomcat6");  
        System.setProperty("ebean.props.file", "ebean.properties");  
        GlobalProperties.put("ebean.debug.sql", "true");  
    
    		//whether or not drop table at the beginning of the run: 
    		GlobalProperties.put("ebean.ddl.run", "false");
	
		fileName = "/Users/g42gregory/Dropbox/1_AI_People/data/msasearch/ml_authors/ml_auth_140001_143903.dat";
		start = 0;
		end = 40;
		rankStart = 140000;
		
		ObjectInputStream in = new ObjectInputStream(new FileInputStream(fileName));
		
		read(in);
		in.close();
	}
	
}
