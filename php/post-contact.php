<?php
	session_start(); // Session for storing the status message
	$name = $_POST['name'];
	$to = 'info@example.com'; // Set Email id where you want to receive Contact Form Emails
	$from = $_POST['email'];
	$subject = "Subject";
	$message = $_POST['message'];
	$headers = 'From: '.$from."\r\n" .
						'Reply-To: info@example.com' . "\r\n" . //Set to your webmaster Email Address
    				'X-Mailer: PHP/' . phpversion();;

	$send_mail = mail($to, $subject, $message, $headers);
	if( $send_mail ) {
		$res['status'] = 'success';
		$res['message'] = 'Message sent successfully.';
	} else {
		$res['status'] = 'fail';
		$res['message'] = 'Error while sending the message.';
	}
	$_SESSION['res'] = $res;
	header("Location: message.php");
?>