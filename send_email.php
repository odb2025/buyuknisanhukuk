<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    $to = "buyuknisanozgun@gmail.com";
    $subject = "Yeni İletişim Formu Mesajı";
    $body = "Ad: $name\nE-posta: $email\nMesaj:\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "Mesajınız başarıyla gönderildi.";
    } else {
        echo "Mesaj gönderilirken bir hata oluştu.";
    }
} else {
    echo "Geçersiz istek.";
}
?>
