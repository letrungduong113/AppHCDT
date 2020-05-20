import moment from "moment";

const convertFileSize = (size) => {
    if (size < 1024) {
        return size + " Bytes";
    }
    else if (size < 1048576) {
        return Math.round(size / 1024) + " Kb";
    }
    else {
        return Math.round(size / 1048576) + " MB"
    }
}
const convertTime = (time)=> {
    if (!time) return "";
    
    return moment(time).format('DD/MM/YYYY HH:mm');
}
const convertDate = (time)=> {
    if (!time) return "";
    
    return moment(time).format('DD/MM/YYYY');
}
const convertNumber= (input) => {
    var output = input
    if (parseFloat(input)) {
        input = new String(input); // so you can perform string operations
        var parts = input.split("."); // remove the decimal part
        parts[0] = parts[0].split("").reverse().join("").replace(/(\d{3})(?!$)/g, "$1,").split("").reverse().join("");
        output = parts.join(".");
    }

    return output;
}
export {convertFileSize, convertTime, convertDate, convertNumber};

// https://stackoverflow.com/questions/33628677/react-native-responsive-font-size