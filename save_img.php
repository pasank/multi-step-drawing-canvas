<?php 
//https://stackoverflow.com/questions/13198131/how-to-save-an-html5-canvas-as-an-image-on-a-server

$img = $_POST['hiddenimg'];
$timetaken2 = $_POST['timetaken2'];
$timetaken3 = $_POST['timetaken3'];
$clientip = $_SERVER['REMOTE_ADDR'];
$clientagent = $_SERVER['HTTP_USER_AGENT'];

$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);

$date = date('Y-m-d-H-i-s');
$upload_dir = 'userimages/';
$file = $upload_dir.$date.".png";

$success = file_put_contents($file, $data);
$timestakenlist = array($timetaken2, $timetaken3);


$file = fopen('timestaken.csv', 'a');

$list = array(array($clientip, $clientagent, $timetaken2, $timetaken3));
foreach ($list as $fields) {
    fputcsv($file, $fields);
}

fclose($file);

header('Location: '.$_SERVER['HTTP_REFERER'])


?>