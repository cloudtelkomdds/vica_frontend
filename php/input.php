<?php
include "koneksi.php";
if(isset($_POST['Simpan']))
{
    $no_extension=$_POST['extension-number'];
    $password=$_POST['extension-password'];
    $pengguna=$_POST['extesion-assign'];
    
    $query = mysqli_query($koneksi,"INSERT INTO tb_extension VALUES('','$no_extension','$password', '$pengguna' )");
    
    if($query > 0){
        echo "<script>alert('Pelanggan baru telah disimpan');
        window.location.href='../UserExtension.php'</script>";
    }
    else {
        
        echo "<script>alert('Tidak dapat menambahkan ekstensi');
        window.location.href='../UserExtension.php'</script>";
    }
}
?>