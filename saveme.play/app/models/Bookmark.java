package models;

import java.util.*;

import play.data.validation.Constraints.*;

import play.db.ebean.*;
import javax.persistence.*;

/**
 * The Bookmark class represents one bookmarked web page.
 *
 * @author Jason Zien (jasonz@aikidalabs.com)
 *
 * Copyright 2013 Aikida Labs, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
@Entity
public class Bookmark extends Model {
    
    @Id
    public Long id;

    @Required
    public String title;

    public String url;

    public String description;

    public String imageUrl;

    public static Finder<Long,Bookmark> find = new Finder(Long.class, Bookmark.class);
  
    public static List<Bookmark> all() {
	return find.all();
    }
  
    public static void create(Bookmark b) {
	b.save();
    }
  
    public static void delete(Long id) {
	find.ref(id).delete();
    }
    
}