import ajax from "../../http/axios";

function getPage(pageNum, pageSize, queryValue) {
    let url = '/course/getPage?pageNum=' + pageNum + '&pageSize=' + pageSize;
    if (queryValue == '' || queryValue != undefined) {
        url += '&queryValue=' + queryValue;
    }
    return ajax({
        url,
        method: 'get'
    });
}

function getTeachersForSelect() {
    return ajax({
        url: '/user/getTeachers',
        method: 'get'
    });
}

function submitCourseForm(data) {
    return ajax({
        url: data.id == 0 ? '/course/insertCourse' : '/course/updateCourse',
        method: 'post',
        data
    });
}

function getCourse(id) {
    return ajax({
        url: '/course/getCourse/' + id,
        method: 'get'
    });
}

function deleteCourse(id) {
    return ajax({
        url: '/course/delete/' + id,
        method: 'get'
    });
}

function deleteCourses(ids) {
    return ajax({
        url: '/course/deletes?ids=' + ids,
        method: 'get'
    });
}

function submitUploadForm(data) {
    return ajax({
        url: '/course/uploadMaterials',
        method: 'post',
        data
    });
}

function getCatalogues(pid, courseId) {
    return ajax({
        url: '/catalogue/getCatalogues/' + pid + '/' + courseId,
        method: 'get'
    });
}

function insertCatalogue(node) {
    return ajax({
        url: '/catalogue/insertCatalogue',
        method: 'post',
        data: node
    });
}

function deleteCatalogue(id, courseId) {
    return ajax({
        url: '/catalogue/deleteCatalogue/' + id + '/' + courseId,
        method: 'get'
    });
}

function iterator(data, id) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            data.splice(i, 1);
        } else {
            if (data[i].children.length > 0) {
                iterator(data[i].children, id);
            }
        }
    }
}

function getMaterialsByCourseId(id) {
    return ajax({
        url: '/material/getMaterialsByCourseId/' + id,
        method: 'get'
    });
}

function linkMaterials(data) {
    return ajax({
        url: '/catalogue/linkMaterials',
        method: 'post',
        data
    });
}

export default {
    getPage, getTeachersForSelect, submitCourseForm, submitUploadForm, getCourse,
    deleteCourse, deleteCourses, getCatalogues, insertCatalogue, deleteCatalogue, iterator,
    getMaterialsByCourseId, linkMaterials
}

