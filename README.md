# 開心論壇

### 展示

餐廳論壇網站，可以瀏覽各式餐廳，也可以留言給予餐廳的評價，或是給予鼓勵按個愛心。
![MyImage](https://github.com/kai3kai2/my-forum/blob/main/tempImage/%E7%95%AB%E9%9D%A22.png)
![MyImage](https://github.com/kai3kai2/my-forum/blob/main/tempImage/%E7%95%AB%E9%9D%A23.png)

### 功能介紹

- 沒有登入無法使用內部功能
- 會依登入成功或註冊失敗顯示訊息
- 可以填寫資料或使用 Google 做註冊用來登入
- 可以瀏覽每篇文章及進去文章裡留言
- 可以觀察到每篇文章的瀏覽人數
- 可以對每篇文章按喜歡，一人一次，並計算喜歡的人數
- 右上角換依登入使用者及管理者隨之對應不同功能
- 使用完可以點擊右上角登出按鈕
- 管理者可以管理標籤及文章


## 使用本專案

1. 先確認有安裝 Node.js 與 npm


2. 使用 clone 將資料載入本地


3. 安裝 npm 套件，使用 Terminal 輸入指令

```
npm install
```

4. 新增.env.example 檔案並設置資料庫連線字串，

```
依照該文件設置環境變數檔 .env 才能正確使用
```

5. 啟用前先使用 Terminal 輸入以下指令看見 done 代表建立成功。

啟用專案: 在 Terminal 請依序輸入以下指令

```
npm run dbmigrate
npm run seed
npm run dev 
```

---

6. 若成功運行會出現以下文字，即可以使用該網址前往

```
App is listening on https://localhost:XXXX
```

---

7. 欲暫停此專案在 Terminal 使用 :

```
ctrl + c (windows)
command + c (mac)
```

## 測試帳號
* 可以使用以下預設使用者帳號 :
  * email: user1@example.com
  * password: 12345678
  * email: user2@example.com
  * password: 12345678
* 可以使用管理者帳號
  * email: admin@forum.com
  * password: 12345678

## 開發工具

- Node.js 4.17.1
- Express 4.16.4
- Express-Handlebars
- Bootstrap 6.2.0
- Font-awesome
- MySQL
- sequelize-cli
- multer
- session
- bcryptjs
- passport-google-oauth20
- AWS 部署
- 其他詳見 package.json
