export default class MediaHandler {
    getPermissions(video = false, audio = true) {
        return new Promise((res, rej) => {
          navigator.getUserMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);
            navigator.mediaDevices.getUserMedia({video: false, audio})
                .then((stream) => {
                    res(stream);
                })
                .catch(err => {
                    rej(`Bạn chưa cấp quyền truy cập, vui lòng kiểm tra lại quyền truy cập của máy`)
                })
        });
    }
}
