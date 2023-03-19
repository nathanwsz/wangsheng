<?php


if($_POST["message"]) {


mail("wangsheng.zhu@utdallas.edu", $_POST["fullname"],


$_POST["message"]. "From: wangsheng.zhu@utdallas.edu");


}


?>