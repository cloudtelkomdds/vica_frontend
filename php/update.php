<?php
include "koneksi.php";
if (isset($_POST['Edit'])) {
    $number=$_GET['id_number'];
    $no_extension = $_POST['extension-number'];
    $password = $_POST['extension-password'];
    $pengguna = $_POST['extension-assign'];

    $query = mysqli_query($koneksi, "UPDATE tb_extension SET no_extension='$no_extension', password='$password', pengguna='$pengguna' WHERE id_number='$number'");

        if($query > 0){
            echo "<script>alert('Pelanggan baru telah disimpan'); window.location.href='../UserExtension.php'</script>";
        } else {
            echo "<script>alert('Gagal Disimpan'); window.location.href='../UserExtension.php'</script>";
        }
        }
        ?>