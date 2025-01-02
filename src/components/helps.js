const changeAlias = (alias) => {
  let str = alias;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/ /g, "");
  str = str.replace(/[^a-zA-Z0-9]/g, "");
  str = str.trim();
  return str;
};

function removePhone(str) {
  const arrStartedPhoneNumber = ["09", "01", "08", "02", "84", "05"];

  let phoneFromStr = "";

  for (var i = 0; i < arrStartedPhoneNumber.length; i++) {
    var phone = getPhoneNumberSub(str, arrStartedPhoneNumber[i]);
    if (phone != "-1" && phone != "-2" && phone.length >= 10) {
      phoneFromStr = phone;
      break;
    }
  }

  if (phoneFromStr) {
    str = str.replace(/\+84/g, "0");
    str = str.replace(/0 /g, "0");
    var i = -1;
    while ((i = str.indexOf("0", i + 1)) >= 0) {
      var temp = str.substring(i);
      temp = temp.replace(/[^a-zA-Z0-9]/g, "");
      if (temp.startsWith(phoneFromStr)) {
        // Found phone number
        str =
          str.substring(0, i + phoneFromStr.length - 2) +
          "**" +
          str.substring(i + phoneFromStr.length);
        return str;
      }
    }
  }

  return str;
}

function getPhoneNumberSub(str, startedpn) {
  str = str.replace(/\+84/g, "0");
  str = str.replace(/[^a-zA-Z0-9]/g, "");
  let phone = "-1";
  //alert(str);
  if (str.length < 10) return "-2";
  if (str.indexOf(startedpn) >= 0) {
    let idx = str.indexOf(startedpn);
    let iPhoneNumber = 0;
    try {
      phone = str.substring(idx, idx + 11);
      if (isNaN(phone)) {
        // Khong phai la so
        phone = str.substring(idx, idx + 10);
        iPhoneNumber = parseInt(phone);
        if (isNaN(phone)) {
          return getPhoneNumberSub(str.substring(idx + 2), startedpn);
        }
      }
    } catch (e) {
      return getPhoneNumberSub(str.substring(idx + 2), startedpn);
    }
  }
  return phone;
}

function isInt(value) {
  return (
    !isNaN(value) &&
    (function (x) {
      return (x | 0) === x;
    })(parseFloat(value))
  );
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function msToTime(duration) {
  let minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return hours + ":" + minutes;
}

export { changeAlias, msToTime };
