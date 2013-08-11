package msr;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

import com.microsoft.research.Author;
import com.microsoft.research.PagedList;

/**
 * 
 * @author g42gregory
 *
 */
public class DBWrite 
{
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
		ObjectInputStream in = new ObjectInputStream(new FileInputStream("/Users/g42gregory/Dropbox/1_AI_People/data/msasearch/cs_authors/cs_authors_900001_1000000.dat"));
		read(in);
		in.close();
	}


	
}
