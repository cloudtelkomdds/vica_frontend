<?php

// Koneksi
$host = "localhost";
$user = "root";
$pass = "";
$database = "db_extension";
$koneksi = mysqli_connect($host, $user, $pass, $database) or die(
    "Tidak terkoneksi dengan database");
?>