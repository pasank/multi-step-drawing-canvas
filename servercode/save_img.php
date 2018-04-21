<?php 
//https://stackoverflow.com/questions/13198131/how-to-save-an-html5-canvas-as-an-image-on-a-server

// $upload_dir = somehow_get_upload_dir();  //implement this function yourself


$img = $_POST['hiddenimg'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);

$date = date('Y-m-d-H-i-s');
//$upload_dir = 'userimages/';
$upload_dir = '/opt/lampp/htdocs/multi-step-2/userimages/';
$file = $upload_dir.$date.".png";

// $file = "image_name.png";
$success = file_put_contents($file, $data);
// header('Location: '.$_POST['return_url']);
header('Location: '.$_SERVER['HTTP_REFERER'])
?>
