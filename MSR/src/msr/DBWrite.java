package msr;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

import com.microsoft.research.Author;
import com.microsoft.research.PagedList;

import tables.Authors;

import com.avaje.ebean.Ebean;  
import com.avaje.ebean.config.GlobalProperties;

/**
 * 
 * @author g42gregory
 *
 */
public class DBWrite 
{
	
	public static void testDB()
	{
		//System.setProperty("catalina.base", "D:/apps/tomcat6");  
        System.setProperty("ebean.props.file", "ebean.properties");  
        GlobalProperties.put("ebean.debug.sql", "true");  
    
    		//whether or not drop table at the beginning of the run: 
    		GlobalProperties.put("ebean.ddl.run", "true");
    	
        Authors e = new Authors();  
        e.setName("test1");  
        e.setDescription("something1");  
          
        // will insert  
        Ebean.save(e);  
          
        e.setDescription("changed1");  
          
        // this will update  
        Ebean.save(e);  
        
        Authors q = new Authors();  
        q.setName("test2");  
        q.setDescription("something2");  
          
        // will insert  
        Ebean.save(q); 
        
        
        
        // find the inserted entity by its id  
        Authors e2 = Ebean.find(Authors.class, e.getId());  
        System.out.println("Got "+e2.getDescription());  
          
        //Ebean.delete(e);  
        // can use delete by id when you don't have the bean  
        //Ebean.delete(ESimple.class, e.getId());  
		
	}
	
	private static void read(ObjectInputStream in) throws ClassNotFoundException, IOException 
	{
		for (int i = 0; i < 6000; i++)
		{
			@SuppressWarnings("unchecked")
			PagedList<Author> response = (PagedList<Author>) in.readObject();
			System.out.println(response.getStartIndex()+" - "+response.getEndIndex()+" of:"+response.getTotalItems());
			for (Author result : response)
			{
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
		
		
		//ObjectInputStream in = new ObjectInputStream(new FileInputStream("/Users/g42gregory/Dropbox/1_AI_People/data/msasearch/cs_authors/cs_authors_900001_1000000.dat"));
		//read(in);
		//in.close();
	}


	
}
