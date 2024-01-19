tinymce.init({
    selector: 'textarea.tiny-mce',
    // tìm tất cả ô input có textarea thì chuyển thành tinymce   và .tiny-mce là lấy ra textarea có class = tiny-mce
    plugins: "image",
    // Thêm phần chèn hình ảnh
    file_picker_callback: function (cb, value, meta) {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
    
        input.onchange = function () {
          var file = this.files[0];
    
          var reader = new FileReader();
          reader.onload = function () {
            var id = 'blobid' + (new Date()).getTime();
            var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
            var base64 = reader.result.split(',')[1];
            var blobInfo = blobCache.create(id, file, base64);
            blobCache.add(blobInfo);
    
            cb(blobInfo.blobUri(), { title: file.name });
          };
          reader.readAsDataURL(file);
        };
    
        input.click();
      }
      // Xử lí chọn file ảnh
});
 