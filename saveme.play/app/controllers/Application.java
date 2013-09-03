package controllers;

import play.*;
import play.mvc.*;
import play.data.*;

import views.html.*;

import models.*;

/**
 * Application - this is the main bookmarks application handler (controller).
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
public class Application extends Controller {

    static Form<Bookmark> bookmarksForm = Form.form(Bookmark.class);
  
    public static Result index() {
	return TODO;
    }

    /**
     * Show bookmarks page
     */
    public static Result showBookmarks() {
	// turn off caching so that the page shows any newly added bookmarks
	response().setHeader("Cache-Control", "no-cache");
	return ok(views.html.index.render(Bookmark.all(), bookmarksForm));
    }
  
    /**
     * Save bookmarks (from an http post request)
     */
    public static Result saveBookmark() {
	Form<Bookmark> filledForm = bookmarksForm.bindFromRequest();

	System.err.println("FORM DATA, " + filledForm.data().toString());

	if(filledForm.hasErrors()) {
	    System.err.println("ERROR, bad request: " + filledForm.toString());
	    return badRequest(
			      views.html.index.render(Bookmark.all(), filledForm)
			      );
	} else {
	    System.err.println("OK request, " + filledForm.toString());
	    Bookmark.create(filledForm.get());
	    return redirect(routes.Application.showBookmarks());  
	}
    }

    /**
     * Delete a bookmark
     */  
    public static Result deleteBookmark(Long id) {
	Bookmark.delete(id);
	return redirect(routes.Application.showBookmarks());
    }
  
}
