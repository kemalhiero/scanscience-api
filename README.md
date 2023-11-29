# API-Scan-Sciencce
API Aplikasi Mobile (Login, Register, Logout)

# Instalasi

1. Pastikan Anda memiliki Node.js terinstal di sistem Anda. Unduh dari https://nodejs.org  dan ikuti petunjuk instalasinya.
2. Salin repositori ini ke dalam folder lokal Anda.
3. Buka terminal dan arahkan ke direktori proyek.
4. Jalankan perintah berikut untuk menginstal depedensi :
   <h4>npm install</h4>
5. Penginstalan berhasil ketika folder node_modules sudah muncul pada direktori Anda.
6. buat file baru dengan nama `.env`
7. buka file `.env.example`, copy isinya lalu pastekan ke file `.env`
8. isikan nama database, host, port, username, password, dan kode token ke file `.env`
9. untuk menjalankan api jalankan perintah npm test di terminal, pastikan sudah pernah install nodemon sebelumnya


# Token
API Token ini digunakan untuk memverifikasi pengaksesan data, dimana user diberi waktu sesi selama 1 minggu, jika tidak digunakan dalam 1 minggu setelahnya maka sesi token akan habis dan user harus melakukan login. Token juga berfungsi untuk memberikan akses data, agar data tersebut bisa diakses ketika user sudah login.

<p><b>Results</b></p>
<table>
   <tr>
      <th>Key</th>
      <th>Description</th>
   </tr>
   <tr>
      <td>success</td>
      <td>'true' jika sesi token belum habis atau status kode 200, dan 'false' jika sesi token telah habis atau status kode 404</td>
   </tr>
   <tr>
      <td>message</td>
      <td>Berisikan pesan yang dapat ditampilkan menggunakan 'alert'</td>
   </tr>
</table>
<p><b>Example</b></p>
<ol>
   <li>Jika Sesi Token Telah Habis</li>
   <table>
      <tr>
         <td>
            { <br>
    "success": false, <br>
    "message": "Session Token Has Expired" <br>
}
         </td>
      </tr>
   </table>
</ol>


# Request
**<h2>1. Register</h2>**
Register digunakan untuk membuat akun, dan dapat melakukan login
**<h3> `POST` register</h3>**
> Url
`http://localhost:3000/register`
<p><b>Body</b></p>
<table>
   <tr>
      <th>Body</th>
      <th></th>
      <th>Description</th>
   </tr>
   <tr>
      <td>nama</td>
      <td>required</td>
      <td>Data nama yang ingin didaftarkan untuk akun anda</td>
   </tr>
   <tr>
      <td>email</td>
      <td>required</td>
      <td>Data email yang ingin didaftarkan untuk akun anda</td>
   </tr>
    <tr>
      <td>password</td>
      <td>required</td>
      <td>Data Password yang akan digunakan untuk akun anda</td>
   </tr>
   <tr>
      <td>jenis_kelamin</td>
      <td>required</td>
      <td>Data jenis kelamin yang akan digunakan untuk akun anda</td>
   </tr>
</table>
<p><b>Results</b></p>
<table>
   <tr>
      <th>Key</th>
      <th>Description</th>
   </tr>
   <tr>
      <td>success</td>
      <td>'true' jika pemrosesan data berhasil atau status kode 200, dan 'false' jika pemrosesan data tidak berhasil atau status kode 400</td>
   </tr>
   <tr>
      <td>message</td>
      <td>Berisikan pesan yang dapat ditampilkan menggunakan 'alert'</td>
   </tr>
</table>
<p><b>Example</b></p>
<ol>
   <li>Jika Tidak Menginputkan nama / email / password / jenis kelamin</li>
   <table>
      <tr>
         <td>
            { <br>
    "success": false, <br>
    "message": "Please complete your account data" <br>
}
         </td>
      </tr>
   </table>
   <li>Jika Email Sudah Digunakan</li>
   <table>
      <tr>
         <td>
           { <br>
    "success": false, <br>
    "message": "Email is already in use" <br>
}
         </td>
      </tr>
   </table>
   <li>Jika Register Berhasil</li>
   <table>
      <tr>
         <td>
            { <br>
    "success": true, <br>
    "message": "Account registration successful", <br>
}
         </td>
      </tr>
   </table>
   <li>Jika Register Tidak Berhasil</li>
   <table>
      <tr>
         <td>
            { <br>
    "success": true, <br>
    "message": "Account registration was unsuccessful", <br>
}
         </td>
      </tr>
   </table>
</ol>

**<h2>2. Login</h2>**
Login digunakan untuk dapat memasuki halaman utama dan bisa mengakses seluruh fitur aplikasi
**<h3> `POST` Login</h3>**
> Url
`http://localhost:3000/login`
<p><b>Body</b></p>
<table>
   <tr>
      <th>Body</th>
      <th></th>
      <th>Description</th>
   </tr>
   <tr>
      <td>email</td>
      <td>required</td>
      <td>Data Email yang terdaftar pada akun bapas</td>
   </tr>
    <tr>
      <td>password</td>
      <td>required</td>
      <td>Data Password yang terdaftar pada akun bapas</td>
   </tr>
</table>
<p><b>Results</b></p>
<table>
   <tr>
      <th>Key</th>
      <th>Description</th>
   </tr>
   <tr>
      <td>success</td>
      <td>'true' jika pemrosesan data berhasil atau status kode 200, dan 'false' jika pemrosesan data tidak berhasil atau status kode 400</td>
   </tr>
   <tr>
      <td>message</td>
      <td>Berisikan pesan yang dapat ditampilkan menggunakan 'alert'</td>
   </tr>
   <tr>
      <td>token</td>
      <td>Nilai token yang akan digunakna untuk verifikasi proses login</td>
   </tr>
   <tr>
      <td>id_user</td>
      <td>'id' dari user yang login atau aktif </td>
   </tr>
</table>
<p><b>Example</b></p>
<ol>
   <li>Jika Tidak Menginputkan Email / Password </li>
   <table>
      <tr>
         <td>
            { <br>
    "success": false, <br>
    "message": "Please complete your account data" <br>
}
         </td>
      </tr>
   </table>
   <li>Jika Email Salah</li>
   <table>
      <tr>
         <td>
          { <br>
    "success": false, <br>
    "message": "Email not found" <br>
}
         </td>
      </tr>
   </table>
   <li>Jika Password Salah</li>
   <table>
      <tr>
         <td>
           { <br>
    "success": false, <br>
    "message": "Your password is wrong" <br>
}
         </td>
      </tr>
   </table>
   <li>Jika Login Berhasil</li>
   <table>
      <tr>
         <td>
            { <br>
    "success": true, <br>
    "message": "Login Berhasil", <br>
"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoyLCJpYXQiOjE2OTkwMDYwNDcsImV4cCI6MTY5OTAxMzI0N30.SkPfczKMZ9VXgncmlc-oSkOIUrvOLv7ZG3XTeIUJn3s", <br>
    "id_user": 2 <br>
}
         </td>
      </tr>
   </table>
</ol>

**<h2>3. Logout</h2>**
API logout digunakan untuk keluar dari akun yang sedang aktif

**<h3> `POST` Logout</h3>**
> Url
`http://localhost:3000/logout`
<p><b>Results</b></p>
<table>
   <tr>
      <th>Key</th>
      <th>Description</th>
   </tr>
   <tr>
      <td>success</td>
      <td>'true' jika pemrosesan data berhasil atau status kode 200, dan 'false' jika pemrosesan data tidak berhasil atau status kode 400</td>
   </tr>
   <tr>
      <td>message</td>
      <td>Berisikan pesan yang dapat ditampilkan menggunakan 'alert'</td>
   </tr>
</table>
<p><b>Example</b></p>
<ol>
   <li>Jika Logout Berhasil</li>
   <table>
      <tr>
         <td>
            { <br>
    "success": true, <br>
    "message": "logout was successful" <br>
}
         </td>
      </tr>
   </table>
   <li>Jika Logout Tidak Berhasil</li>
   <table>
      <tr>
         <td>
          { <br>
    "success": false, <br>
    "message": "Logging out didn't work" <br>
}
         </td>
      </tr>
   </table>
</ol>

