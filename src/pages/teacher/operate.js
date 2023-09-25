import ajax from "../../http/axios";

function getPage(pageNum, pageSize, queryValue) {
    let url = '/user/getPage?pageNum=' + pageNum + '&pageSize=' + pageSize;
    if (queryValue == '' || queryValue != undefined) {
        url += '&queryValue=' + queryValue;
    }
    return ajax({
        url,
        method: 'get'
    });
}

function getUser(id) {
    return ajax({
        url: '/user/getUser/' + id,
        method: 'get'
    });
}

function submitTeacherForm(user) {
    let url = user.id == 0 ? '/user/insertUser' : '/user/updateUser';
    return ajax({
        url,
        method: 'post',
        data: user
    });
}

function deleteUser(id) {
    return ajax({
        url: '/user/delete/' + id,
        method: 'get'
    });
}

function deleteUsers(ids) {
    return ajax({
        url: '/user/deletes?ids=' + ids,
        method: 'get'
    });
}

function getClassTransfer() {
    return ajax({
        url: '/class/getTransfer',
        method: 'get'
    });
}

export default {getPage, getUser, submitTeacherForm, deleteUser, deleteUsers, getClassTransfer}