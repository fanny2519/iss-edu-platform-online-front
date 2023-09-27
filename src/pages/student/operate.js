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
        url: '/student/getStudent/' + id,
        method: 'get'
    });
}

function submitStudentForm(student) {
    let url = student.id == 0 ? '/student/insertStudent' : '/student/updateStudent';
    return ajax({
        url,
        method: 'post',
        data: student
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

function linkClasses(studentIds, classesIds) {

    return ajax({
        url: '/student/linkClasses/' + studentIds + '/' + classesIds,
        method: 'get',
    });
}



export default {getPage, getStudent, submitStudentForm, deleteStudent, deleteStudents, getClassTransfer, linkClasses}