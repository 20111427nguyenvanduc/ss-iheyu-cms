import axios from './axios';

export const uploadFile = (body = {}) => {
  const formData = new FormData();
  formData.append('folder', body.folder || 'test2');
  formData.append('resize', 'true');
  formData.append('fileUpload', body.file, body.filename);
  var config = {
    method: 'post',
    url: '/media/upload-single',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formData,
  };
  return axios(config);
};

export const deleteFile = (body = {}) => {
  return axios.post(`/media/decline-file`, body);
};
