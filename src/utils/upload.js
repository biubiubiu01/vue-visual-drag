import request from "@/utils/request";
export default {
  install(Vue) {
    const defaultBucket = "bucker1";
    /**
     * 文件上传
     *
     * @param      {<string>}       api         上传api接口地址
     * @param      {<string>}       bucket      上传桶名称
     * @param      {<file>}         file        上传文件体
     * @param      {<string>}       fileType    上传类型 【1、对象存储 2、本地】
     * @param      {<string>}       filePath    上传路径
     * @param      {<number>}       blockSize   上传文件分片大小 默认1M（1024*1024）
     * @param      {<function>}     progress    上传进度监听函数 默认空函数  回调参数  0-100的整数
     * @param      {<function>}     before      上传之前，参数为上传的文件，若返回 false 则停止上传 默认为返回true的函数
     * @param      {<function>}     success     上传成功回调函数 默认空函数
     * @param      {<function>}     error       上传失败回调函数 默认空函数
     * @param      {<number>}       startSize   上传文件起始位置 默认为0
     * @param      {<number>}       endSize     上传文件结束位置
     * @param      {<string>}       fileId      上传文件分片上传返回的文件id
     */
    const $uploadFile = (
      {
        api,
        bucket = defaultBucket,
        file,
        fileType = 1,
        filePath = "",
        caseId = null,
        newAddParams = null, //2021 5.31 新增参数，主要是为了上传赋码功能传给后台获取到的base64
        blockSize = 1024 * 1024 * 20,
        progress = (_) => {},
        before = (_) => true,
        success = (_) => {},
        error = (_) => {},
      },
      startSize = 0,
      endSize,
      fileId
    ) => {
      /**
       * 检查参数完整性
       */
      if (!api || !bucket || !file) {
        const err_api = !api ? '"api"是必须参数' : "";
        const err_bucket = !bucket ? '"bucket"是必须参数' : "";
        const err_file = !file ? '"file"是必须参数' : "";
        let err_message = err_api;
        err_message = err_message ? `${err_message},${err_bucket}` : err_bucket;
        err_message = err_message ? `${err_message},${err_file}` : err_file;
        return console.error(`参数错误:${err_message}`);
      }

      if (!before(file)) {
        return;
      }
      /**
       * 文件分块函数  （兼容性处理）
       */
      const fileSlice = file.mozSlice
        ? "mozSlice"
        : file.webkitSlice
        ? "webkitSlice"
        : "slice";
      const fileSize = file.size;
      if (!endSize) {
        endSize = blockSize;
      }
      let formData = new FormData();

      formData.append("file", file[fileSlice](startSize, endSize), file.name);
      formData.append("fileType", fileType);
      if (filePath) {
        formData.append("filePath", filePath);
      }
      formData.append("bucket", bucket);
      formData.append("offset", startSize);
      formData.append("length", endSize - startSize);
      formData.append("fileSize", fileSize);
      if (fileId) {
        formData.append("fileId", fileId);
      }
      if (caseId) {
        formData.append("caseId", caseId);
      }
      if (newAddParams) {
        formData.append("qrcodeBase64", newAddParams);
      }

      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          progress(parseInt(100 * ((e.loaded + startSize) / fileSize), 10));
        },
      };
      request
        .post(api, formData, config)
        .then((res) => {
          if (res.succeed) {
            if (endSize < fileSize) {
              if (fileType == 2) {
                fileId = res.body.fileId;
              } else {
                fileId = res.body;
              }
              startSize = endSize;
              endSize = endSize + blockSize;
              if (endSize > fileSize) {
                endSize = fileSize;
              }
              $uploadFile(
                {
                  api,
                  bucket,
                  file,
                  fileType,
                  filePath,
                  caseId,
                  blockSize,
                  progress,
                  before,
                  success,
                  error,
                },
                startSize,
                endSize,
                fileId
              );
            } else {
              success(res.body, file);
            }
          } else {
            error(res);
          }
        })
        .catch((err) => {
          error(err);
        });
    };
    Vue.prototype.$uploadFile = $uploadFile;
  },
};
