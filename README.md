# quan-ly-sinh-vien-nodejs

- Để chạy chương trình
  B1: npm install
  B2: npm run dev

# phân tích các API

     (-) là private - phải được cấp quyền
     (+) là public
    1. user
        User có thể là sinh viên, giảng viên hoặc admin
        + post '/register' : đăng ký
        + post '/login' : đăng nhập
        - get '/current' : lấy thông tin user hiện tại
        (chỉ khi đăng nhập thành công)
    2. sinhvien
        + get '/': lấy danh sách sinh viên
        + get '/khoa/:khoaId': lấy danh sách sinh viên theo khoa
        + get '/gianvien/:giangvienId': lấy danh sách sinh viên mà người dùng có giangvienId tạo
        - get '/maSV/:maSV': lấy sinh viên có maSV
        - get '/:id': lấy sinh viên có id
        (
            sinh viên đó và người tạo nó mới vào được
        )
        - post '/': tạo mới sinh viên
        (
            admin hoặc giảng viên mới tạo được
        )
        - put '/:id': cập nhật sinh viên - cập nhật sinh viên
        (
            sinh viên đó và người tạo nó mới vào được
        )
        - delete '/:id': xóa sinh viên có id
        (
            sinh viên đó và người tạo nó mới vào được
        )
    3. giangvien
        + get '/': lấy danh sách giảng viên
        + get '/khoa/:khoaId': lấy danh sách giảng viên theo khoa
        + get '/user/:userId': lấy danh sách giảng viên mà người dùng có userId tạo
        - get '/maGV/:maGV': lấy giảng viên có maGV
        - get '/:id': lấy giảng viên có id
        (
           admin và giảng viên đó mới vào được
        )
        - post '/':
        (
            admin mới vào được
        )
        - put '/:id':
         (
            admin và giảng viên đó mới vào được
        )
        - delete '/:id':
         (
            admin mới vào được
        )
    4. khoa
        + get '/': lây danh sách khoa
        + get '/:id': chi tiết khoa
           (
            admin mới vào được post, put, delete
        )
    5. post
        + get '/':
        (không lấy content)
        + get 'user/:userId':
        + get '/:id':
        (
            admin và giảng viên mới post được,
            còn put, delete thì chỉ người tạo nó mới đc
        )
    6. comment
        thuộc bài viết gồm: userId, repCommentId, postId, timestamps
        + get '/post/:postId': lấy tất cả comment của bài viết
        - post '/': người dùng comment vào bài viết
        - put, delete: người dùng tạo comment mới thực hiện được
    7. favorite
        thuộc bài viết gồm: userId, postId, timestamps
        + get '/user/:userId' lấy các tương tác của người dùng đó
        + get '/post/:postId' lấy các tương tác của bài viết đó
        - post '/'
        - put '/:id'


### Code my format
#### response - server trả về
    1. res.status 
        trả về mã lỗi để FE biết để fix/handle lỗi
         Các mã: 
         - 400: lỗi validation thường ở form 
         - 401: chưa đăng nhập hoặc không có quyền truy cập 
         - 403: khi user không có quyền truy cập 
         - 404: không tìm thấy tài nguyên
    2. res.data 
        res.data.message: trả về thông báo để FE hiển thị cho người dùng biết.
        res.data.${result}
            result ở đây là user, sinhvien, giangvien, ...
            nếu lấy danh sách thì thêm 's': users, sinhviens,...
        handle khi có lỗi thì sẽ có thêm:
        res.data.stackTrace: khi throw ra 1 Error thì sẽ có err.stackTrace.
        res.data.tilte: tiêu đề lỗi.
#### controller 
    - không trả về dữ liệu có _id và _v. 
    - ở mỗi controller có 1 hàm dataToDto để convert từ _id thành id 
    và các yêu cầu khác khi trả về ở mỗi API. 
    - khi lấy biến từ req.params => lấy theo kiểu destructoring.

    - luôn có phần check status(404) sau khi lấy dữ liệu từ mongoDb.