---
layout: post
title:  "Fixing Joomla Permission Issues"
date:   2014-1-17 20:00:00
author: Jason Doyle
categories: joomla
---
These are a collection of suggestions found on fairly credible sites. That doesn't mean they are correct.

##Notes on Apache
For Apache to see a file, the user that Apache runs as (probably www or _www) must have the proper access
to the site's directories. Having read/execute access to the contents of the site root is not
enough, because it has to be allowed to traverse from / down the path to the location of the site root.
When on a mac, make sure /, /Users/, /Users/myusername/, and /Users/myusername/Sites/ all have at least "a+x"
permission (the eXecute permission on directories allows that user class to traverse the directory, even if Read access is not allowed).

	`ls -lde / /Users/ /Users/myusername/ /Users/myusername/Sites`

If any of those directories doesn't show the last "x" set (the one for "others"), then use something like chmod a+x ... to set it for that directory.
If the ACL for any of those directories shows that user www has been specifically denied access, then use the appropriate arguments to chmod to fix the ACLs

##General File Permission Settings
###With FTP Layer
If a joomla installation is hosted on apache with `mod_php`, then all virtual hosts on that server run in the same context as your joomla code. If the files are owned by some other user than 'nobody' or 'wwwrun', the safest permissions are those which prevent changes to the joomla code, unless via an authorized channel (e.g. FTP):
*DocumentRoot directory: 750 (e.g. `public_html`)
*Files: 644
*Directories: 755 (711 if you are paranoid, but not for directories which need to be listed) (owner: some user)
With these permissions set, you will need to use FTP to update your Joomla installation. Not all modules support this. Remove modules which do not support FTP upgrades.
Other processes running under `mod_php` can read your configuration.php. You can frustrate automated hacks by renaming this file.

###With Fast CGI/suPHP
+ DocumentRoot directory: 750 (e.g. `public_html`)
+ PHP files: 600 (400 if you are truly paranoid)
+ HTML and image files: 644 (444 if you are truly paranoid)
+ Directories: 755 (711 if you are paranoid, but not for directories which need to be listed)

##Set `open_basedir`
`open_basedir`is not set in php.ini on our servers but should be. It limits the files that can be accessed by PHP to the specified directory. Also, fopen() uses the path to check the location of the file its opening. Also, some permission issues can be resolved by setting the tmp directory on the property as well. Multiple subdirectories can be added, separated by a colon.
Example:
`open_basedir=/home/site_name/public_html:/tmp` (must have trailing slash)
##Protect directories and files
Ensure that all configurable paths to writable or uploadable directories (document repositories, image galleries, caches) are outside of `public_html`.

Change the log path.
Some extensions use the built in JLog class. This will, by default write logs to http://yousite/logs. Change this to a place that a casual browser cannot find (and don't pick /tmp/), or lock it down with http authentication.

Change the temp folder path.
If the log and temp paths are changed and PHP `open_basedir` configuration directive is set, make sure that the new paths fall within the scope of `open_basedir`.

There is currently no easy way to move the Joomla! /image and /media directories. This is because thousands of third party extensions expect to find these important directories at the current location. The best plan is to make sure `open_basedir` is properly set for all the user accounts on your server.


##Tmp and session paths
One common problem with remote hosts is that they sometimes move sites to different folders on the host server. In general, this does not cause obvious problems in Joomla!. However, when you install an extension, you need to be able to write to the "tmp" directory.
In this case, you might get the error message: "`JFolder::create: Could not create directory" and "Warning! Failed to move file.`" If you have the Joomla! FTP layer enabled, you might get the message "`JFTP::mkdir: Bad response, JFTP::chmod: Bad response, JFTP::store: Bad response, Warning! Failed to move file.`"

tmp directory:
An incorrect tmp directory can cause this problem. To check this, look in your configuration.php file for the var `$tmp_path` value and make certain it matches your actual path. This must be writable to Joomla!.

Session path:
The `session.save_path` directive in your php.ini file must be writable. To verify, use the Forum Post Assistant. If it reports `save.session_path: Not Writable then there is a problem`. Look at your php.ini directives and verify the location and the permissions of the `session.save_path` value. It must be a valid location and it must be writable for Joomla!. You may require the assistance of your Web host for this, depending on your Web hosting situation.

php.ini: You could also check your php.ini file, main file is generally under `/etc directory`. If you can edit this file, you can set `open_basedir` to include the temp directory: `open_basedir` = `/tmp`. If you have another path included, as suggested by security settings for Joomla!, you can add additional paths by adding :/path. An example: `open_basedir = /var/www/html:/tmp`.

##File ownership advice from ianmac
At the heart of the issue is file ownership. There are generally two main server users that end up owning your files - the FTP user, and the Apache/PHP user. Obviously, when you upload files using FTP, the FTP user ends up owning them. Therefore, if you give a file 755 permissions, then ONLY the FTP user can write to that file.

If you install Joomla! without the FTP layer, then the files it creates are owned by the Apache/PHP user. If you give the file 755 permissions, then ONLY the Apache/PHP user can write to that file.
Just to emphasize, the fact that these username and passwords happen to be the same has no effect whatsoever on anything. They are different subsystems and are unrelated. It may be convenient, but will not solve your permission issues.
So there are generally two approaches to take:
	1. upload all the files via cpanel. This will generally result in all of the files being owned by the Apache/PHP user. Ensure that the root directory that all of your Joomla! files are installed in is writable, so that the installer can create the configuration.php file. Then, install Joomla! WITHOUT the FTP layer.
	2. upload all the files using FTP. This will generally result in all of the files being owned by the FTP user. Make sure that your Joomla! root directory is writable, again, so that the installer can create the configuration.php file. Then install Joomla! WITH the FTP layer.

Ensure that your cache folders are owned by the Apache/PHP user, because these files are written by PHP. (cache because writing using the PHP user is much faster than via FTP.
If you apply these principles - and choose either the first or the second approach, you should get better results and extension installation should work properly via the admin interface. Mixing the two approaches will cause you no end of grief.

A good way to check that everything is in order is to browse to the Administrator section of your site and browse to Help->System Info from the menu. Click on directory permissions.
If you don't have the FTP layer enabled, it is important that everything show up as Writable. If you do have the FTP layer enabled, then it is important that your two Cache directories show up as writable. It is most likely okay that the rest show up as unwritable, because Joomla! can likely write these files using the stored FTP settings.

##File ownership advice from srgb
I was stuck with the same issue and found a cool solution. You may use the FTP to upload files and Apache/PHP user for Joomla, you just need to do some preparation:
Right after the extraction of Joomla_install_xxx.zip file into your website's root dir, change file permissions recursively to 4770 (suid bit lets Joomla pretend it's a directory creator):
chmod -R 4770 /path/to/root/htdocs/dir
Later, change Joomla script a bit to create all new dirs with the same perms (in libraries/joomla/filesystem/folder.php):
function create($path = '', $mode = 4770)
That's all, enjoy your Joomla!

##Should Apache own some folders? What about relative vs abs patching?
###Achache owning Files
Site that mention setting Apache as the owner of the `/cache and /temp` directories:
[http://david-latham.blogspot.co.at/2008/08/allow-httpd-apache-to-write-to-files.html]

###Full Path Suggestions
[http://www.inmotionhosting.com/support/edu/joomla-3/server-settings/change-path-to-temp-folder]

