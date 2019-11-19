<?php
include "koneksi.php";
$number=$_GET['id_number'];

$query = mysqli_query($koneksi, "DELETE FROM tb_extension WHERE id_number='$number'") or die ("Query salah");

if($query > 0){
    echo "<script>window.location.href='../userextension.php'</script>";
}
?>
