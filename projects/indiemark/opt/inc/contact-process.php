<?php
/*
Credits: Bit Repository
URL: http://www.bitrepository.com/
*/

include dirname(dirname(__FILE__)).'/config.php';

error_reporting (E_ALL ^ E_NOTICE);

$post = (!empty($_POST)) ? true : false;

if($post)
{
include 'functions.php';

$name = stripslashes($_POST['name']);
$email = trim($_POST['email']);
$phone = stripslashes($_POST['phone']);
$subject = stripslashes($_POST['subject']);
$message = stripslashes($_POST['message']);

$total = "Name : ".$name."\r\n Email : ".$email."\r\n Phone : ".$phone."\r\n Subject : ".$subject."\r\n Message : ".$message."\r\n ==================================== \r\n Another lead from Indiemark :) \r\n ====================================";


$error = '';

// Check name

if(!$name)
{
$error .= 'Please enter your name.<br />';
}

// Check email

if(!$email)
{
$error .= 'Please enter an email address.<br />';
}

if($email && !ValidateEmail($email))
{
$error .= 'Please enter a valid email address.<br />';
}

}

// Check message (length)

if(!$message || strlen($message) < 5)
{
$error .= "Please enter your message, at least 5 characters.<br />";
}


if(!$error)
{
ini_set("sendmail_from", WEBMASTER_EMAIL); // for windows server
$mail = mail(WEBMASTER_EMAIL, $subject, $total,
     "From: ".$name." <".$email.">\r\n"
    ."Reply-To: ".$email."\r\n"
    ."X-Mailer: PHP/" . phpversion());


if($mail)
{
echo 'OK';
}

}
else
{
echo '<div class="notification_error">'.$error.'</div>';
}


?>