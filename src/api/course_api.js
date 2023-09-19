import request from "../http/axios";

function get(id) {
    return request({
        url: '/course/getCourse/' + id,
        method: 'get'
    });
}

function getPagination(pageNum, pageSize, queryValue) {
    let url = '/course/getPage?pageNum=' + pageNum + '&pageSize=' + pageSize;
    if (queryValue == '' || queryValue != undefined) {
        url += '&queryValue=' + queryValue;
    }
    return request({
        url,
        method: 'get'
    });
}

function insert(formData) {
    return request({
        url: '/course/insertCourse',
        method: 'post',
        data: formData
    });
}

function uploadMaterials(formData) {
    return request({
        url: '/course/uploadMaterials',
        method: 'post',
        data: formData
    });
}

function getCatalogues(pid, courseId) {
    return request({
        url: '/catalogue/getCatalogues/' + pid + '/' + courseId,
        method: 'get'
    });
}

function insertCatalogue(formData) {
    return ajax({
        url: '/catalogue/insertCatalogue',
        method: 'post',
        data: formData
    });
}


function removeCatalogue(id, courseId) {
    return request({
        url: '/catalogue/deleteCatalogue/' + id + '/' + courseId,
        method: 'get'
    });
}

function remove(id) {
    return request({
        url: '/course/delete/' + id,
        method: 'get'
    });
}

function deletes(ids) {
    return request({
        url: '/course/deletes?ids=' + ids,
        method: 'get'
    })
}


function getMaterialsByCourseId(id) {
    return request({
        url: '/material/getMaterialsByCourseId/' + id,
        method: 'get'
    })
}

function linkMaterials(formData) {
    return request({
        method: 'post',
        data: formData
    });
}

export default {
    get,
    getPagination,
    insert,
    getCatalogues,
    insertCatalogue,
    removeCatalogue,
    remove,
    deletes,
    uploadMaterials,
    getMaterialsByCourseId,
    linkMaterials
}