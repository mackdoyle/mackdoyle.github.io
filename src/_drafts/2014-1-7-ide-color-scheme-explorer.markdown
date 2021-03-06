---
layout: post
title:  "Fixing Joomla Asset Table Issues"
sub-title: "Those finally getting around to upgrading from the ancient Joomla 1.6 platform may be scratching their heads in confusion. This article take a deep dive into the problem and, hopefully, offer some solutions"
author: Jason Doyle
date:   2013-12-14 20:04:14
image: 
categories: joomla
---

Starting with the introduction of the Access Control List (ACL) implementation in Joomla 1.6, categories, articles some components create a record in the assets table to store properties associated with the ACL. When they do a foreign key relationship is created. Sometimes this relationship can break, causing your site to not behave properly. This is especially true when trying to upgrade from a version of Joomla pre-ACL. 

In addition to problems with the foreign key relationships, the assets table stores hierarchal data using the [Adjacency List Model]. This article will not go into graph theory but to put simply, each record in the asset table has a relationship to another record. This relationship can also become corrupted and difficult to resolve due to its complexity.

There are a few guides and tools that can help resolve these issues but unless you are dealing with a small dataset, it is unlikely you will be able to resolve all your issues with just one of them. This article will will pull several resources together with some additional suggestions to create a comprehensive guide on resolving all issues associated to the ACL's assets table.

I should warn you before proceeding that the following steps were recorded as I was working through this issue myself. They have not been validated in any way, so proceed with caution. Also, you must have access to your website's database and have a decent understanding of mySQL. Some of these steps suggest direct manipulation of data through queries so take a backup before you start. And never attempt to run SQL statements directly on a production server.

This article will focus on articles and categories but the same approaches can be applied to all items that contain a relationship to Joomla's assets table, articles, categories, banners, weblinks, etc.

OK, so let's get started…

### Gather diagnostics
Before doing anything, you should gather as much information as you can to understand the source of the issue. Download Elin Warig's [Asset Table Diagnostics] tool and run it. This will generate a report showing any problems related to the assets table. If the report is clean, you might have another issue. If it is not, keep it open as we will go back to it several times during this process.

### Get some context on the issue ###
Head over to this [article][3] on Joomla docs. This will give you a bit of background along with a few suggestions. At this point you are likely to go all ADD and start trying some of the suggestions the document suggests, but do not do it, stay focused, and come back here. We will walk through those steps later with some sample code.

### Fix a missing root level category ###
Take a look at your `#_categories` table. The first record should be ROOT. If it is not, try creating it.

  	{% highlight mysql %}
  	INSERT INTO whm_categories(id, asset_id, parent_id, lft, rgt, level, path, extension, title, alias, note, description, published, checked_out, checked_out_time, access, params, metadesc, metakey, metadata, created_user_id, created_time, modified_user_id, modified_time, hits, language, version) VALUES
  	`(1, 0, 0, 0, 331, 0, '', 'system', 'ROOT', 'root', '', '', 1, 0, '0000-00-00 00:00:00', 1, '{}', '', '', '', 0, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0, '*', 1)
  	{% endhighlight %}
After you successfully execute this query, you will need to head over to you categories in the Joomla admin and click on the Rebuild button

### Remove duplicate records ###
OK, at this point you have verified you have an asset table issue and gained a little insight into what parts of the data structure are affected. So let's get started and check off an easy one. If you are coming from an upgrade, it's likely you have some duplicate content. To find out, run this on the content table.

  	{% highlight mysql %}
  	SELECT count(*), alias
  	FROM#_content
  	GROUP BY alias
  	HAVING count(*)>1
  	ORDER BY count(*) DESC
  	{% endhighlight %}

This query will simply return a count of duplicate alias names. You might have multiple articles with the same title or legitimate duplicates of articles, so you will need to look at each one to determine if you need it.

Before you go any further, log into the Joomla admin and create a new category named 'Temp' and take note of its id. Keep this around as you will find yourself using it to group items for processing.

Follow these steps to remove duplicate articles without breaking any foreign-key relationships. Then repeat the process for categories.

#### Step 1 ####
Copy the result set of the duplicate count query to a text editor. Use Find a Replace to build a `SELECT` statement that returns all of the duplicated articles by alias. You should end up with something like this:

  	{% highlight mysql %}
  	SELECT *
  	FROM #_content
  	WHERE alias = 'alias-1' OR
  		 alias = 'alias-2' OR
  		 alias = 'alias-3'
  	{% endhighlight %}

#### Step 2 ####
Look through the results and try to find something that differentiates the original record from its duplicates. In my data, the duplicates had a `modifed_by` value of 0 while the original had a user id. This allowed me to differentiate them from the original.

#### Step 3 ####
Modify the `SELECT` statement into an `UPDATE` that keys off the `modified_by` field. Use this to move the duplicate records into the Temp category using the `catid` field. The query should look similar to this:

  	{% highlight mysql %}
  	UPDATE #_content
  	SET catid = 158
  	WHERE modified_by < 1
  	AND
  	(
  	alias = 'alias-1' OR
  	alias = 'alias-2' OR
  	alias = 'alias-3'
  	)
  	{% endhighlight %}

#### Step 4
Now head back to the Joomla admin and filter your articles by the Temp category. Now you have a collection of all the duplicate items that you can trash and delete. This process allows Joomla to remove the items and perform any necessary clean-up that you would have missed by performing a manual `DELETE` statement in the database.

### Run the Asset Fix script
Elin has written another great script to get you closer to resolution. So go download her [Asset Fix][4] tool and run it. Then run the Diagnostics tool again to see what was fixed and what wasn't.

### Restore asset table relationships
TODO: Rework to update all relationships, not just ones with an asset id of 0.
If you have noticed records with an `asset_id` of 0, there are likely asset records that exist for them and we need to restore that relationship. To do so, run this on the categories table.

	{% highlight mysql %}
    	UPDATE
    	  #_categories cats
    	SET
    	    cats.asset_id =
    		    (
    	            SELECT assets.id
    	            FROM #_assets assets
    	            WHERE SUBSTRING_INDEX(assets.name, 'com_content.category.', -1) = cats.id
    			)
    	WHERE
    	    cats.asset_id < 2;
	{% endhighlight %}

Then modify it to run on the content table. The broken relationships for articles and categories should now be restored.

### Create new asset table relationships
After restoring broken relationships, you will likely be left with items that have no asset relationship and they need one. Opening an item in the Joomla admin and saving it will create a relationship and this is the best approach if you have a few items to fix. If you too many for that solution to be feasible, follow these steps:
  1. Create a new category named Temp and note it ID.
  2. Log into the database an browse to the `#_content` table.
  3. Find all of the articles without asset id `SELECT FROM #_content WHERE asset_id < 1`
  4. Now add those articles to the Temp category by updating their records with the Temp categories id `UPDATE #_content SET catid = 158 WHERE asset_id < 1`. Remember to back up your database before running any queries.
  5. Head back to the Joomla admin. All of the broken articles now have something in common, a category, and that means you can perform a bulk operation on them. So filter the articles by the Temp category, select all of them and perform a bulk operation to move them into the Uncategorised category or another category of your choice.
  6. Repeat these step for broken categories as well.
  Now all your articles and categories will have an `asset_id`.

### Fix broken table relationships
The Joomla doc tells us what to do for this but not how to do it. Here is what I came up with…

For categories, the Joomla doc say, "Categories can be nested, but your top level categories should have a `parent_id` that matches the `asset_id` of the component they are part of. They should have a level of 2.

Subcategories should have their parent categories as parents and have a level of 3,4,5 or whatever value makes sense for your category structure.

If you have a category with a level of less than 2 (0,1) then you have a broken asset table"

### Component parent IDs.
The Joomla doc also states that, "Components should have `parent_id` of 1 (the root is their parent) and level of 1."

### Category parent IDs.
The Joomla doc mentioned that, "…top level categories should have a `parent_id` that matches the `asset_id` of the component they are part of."

### Validate the data
As a last step, you should run queries on all of the effected tables to ensure the data is now valid.

### Fix Article and Category permissions
So far we have removed bad data, added missing asset records, fixed broken records and repaired bad ACL levels. One more thing we need to do is fix missing permissions. If you look in the assets table you might notice that some records for articles (`com_content.article`) do not have a value in the Rules column. Let's fix that.

The update statements found in this [post][5] do a decent job of fixing permissions for items that have an asset record and have a valid relationship to it (The item's `asset_id` links to the correct asset record). Notice what is being set here as a rule. The `{"5":1}` you see for `core.create` is the Adjacency List Model we briefly touched on earlier. You need to understand how these work before you run these statements. DO NOT copy these and run them on your database as is. You need to know what levels are needed for your system.

Take another look at the *[Fixing the asset table][6]* article again.
Read this: [http://docs.joomla.org/ACL\_Technique\_in\_Joomla!][7]
And this: [http://docs.joomla.org/Developing\_a\_Model-View-Controller\_Component/2.5/Adding\_ACL][8]

Also, try adding the default rule properties first and see if that works. For example set all the rules below to `rules= {"core.create":[],"core.delete":[],"core.edit":[],"core.edit.state":[],"core.edit.own":[]}`

  	{% highlight mysql %}
  	/* Fix Categories */
  	UPDATE #_assets SET rules='{"core.create":{"5":1},"core.delete":{"5":1},"core.edit":{"4":1,"5":1},"core.edit.state":{"5":1},"core.edit.own":{"5":1}}'
  	WHERE name LIKE '%com_content.category%'
  	{% endhighlight %}

	{% highlight mysql %}
  	/* Fix Articles */
  	UPDATE #_assets SET rules='{"core.delete":{"6":1,"5":1},"core.edit":{"6":1,"4":1,"5":1},"core.edit.state":{"6":1,"5":1}}'
  	WHERE name LIKE '%com_content.article%'

  	DELETE
  		{
  			"core.create":{"6":1,"3":1,"8":1},
  			"core.delete":{"6":1},
  			"core.edit":{"6":1,"4":1,"8":1},
  			"core.edit.state":{"6":1,"5":1,"8":1},
  			"core.edit.own":{"6":1,"3":1,"8":1}
  		}

  		{
  			"core.create":{"5":1},
  			"core.delete":{"5":1},
  			"core.edit":{"4":1,"5":1},
  			"core.edit.state":{"5":1},
  			"core.edit.own":{"5":1}
  		}
	{% endhighlight %}

#### Validate Assets
Check for records with duplicate item references in the `name` field.

	{% highlight mysql %}
  	/* Duplicates for 'Uncategorised' is expected behavior */
  	SELECT count(*), name
  	FROM  whm_assets
  	GROUP BY name
  	HAVING count(*)>1
  	ORDER BY count(*) DESC
	{% endhighlight %}

#### Validate Categories
Check the total number of categories and compare it to the number of category assets. The count should be the same.

	{% highlight mysql %}
  	SELECT count(*) FROM #_categories

  	SELECT count(*) FROM #_assets
  	WHERE SUBSTRING_INDEX(name, 'com_content.category.', -1)
	{% endhighlight %}

#### Validate Articles
Check for broken references by locating an existing asset record for an item that has a different ID than the item's `asset_id`.

	{% highlight mysql %}
  	/* This should return 0 results if there are no broken relationships */
  	SELECT cont.asset_id, assets.id
  	FROM whm_content cont, whm_assets  assets
  	WHERE (cont.id = SUBSTRING_INDEX(assets.name, 'com_content.article.', -1)) AND   (cont.asset_id  <> assets.id )
	{% endhighlight %}

[1]:	http://en.wikipedia.org/wiki/Adjacency_list_model
[2]:	https://github.com/elinw/AssetDiagnosis
[3]:	http://docs.joomla.org/Fixing_the_assets_table
[4]:	https://github.com/elinw/AssetFix
[5]:	http://forum.joomla.org/viewtopic.php?p=2650344
[6]:	http://docs.joomla.org/Fixing_the_assets_table
[7]:	http://docs.joomla.org/ACL_Technique_in_Joomla!
[8]:	http://docs.joomla.org/Developing_a_Model-View-Controller_Component/2.5/Adding_ACL
