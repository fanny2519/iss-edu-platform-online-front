import ajax from "../../http/axios";

function getPage(pageNum, pageSize, queryValue) {
    let url = '/student/getPage?pageNum=' + pageNum + '&pageSize=' + pageSize;
    if (queryValue == '' || queryValue != undefined) {
        url += '&queryValue=' + queryValue;
    }
    return ajax({
        url,
        method: 'get'
    });
}

function getStudent(id) {
    return ajax({
        url: '/student/getStudents/' + id,
        method: 'get'
    });
}

function submitForm(id, user) {
    let url = id == undefined ? '/student/insertStudent' : '/student/updateStudent';
    return ajax({
        url,
        method: 'post',
        data: user
    });
}

function deleteStudent(id) {
    return ajax({
        url: '/student/delete/' + id,
        method: 'get'
    });
}

function deleteStudents(ids) {
    return ajax({
        url: '/student/deletes?ids=' + ids,
        method: 'get'
    });
}

function getClassTransfer() {
    return ajax({
        url: '/class/getTransfer',
        method: 'get'
    });
}

export default {getPage, getStudent, submitForm, deleteStudent, deleteStudents, getClassTransfer}