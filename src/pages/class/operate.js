import ajax from "../../http/axios";

function getPage(pageNum, pageSize, queryValue) {
    let url = '/class/getPage?pageNum=' + pageNum + '&pageSize=' + pageSize;
    if (queryValue == '' || queryValue != undefined) {
        url += '&queryValue=' + queryValue;
    }
    return ajax({
        url,
        method: 'get'
    });
}

function getTransferData() {
    return ajax({
        url: '/user/getTransfer',
        method: 'get'
    });
}

function submitClassForm(data) {
    return ajax({
        url: data.id == 0 ? '/class/insertClass' : '/class/updateClass',
        method: 'post',
        data
    });
}

function getClass(id) {
    return ajax({
        url: '/class/getClass/' + id,
        method: 'get'
    });
}

function deleteClass(id) {
    return ajax({
        url: '/class/delete/' + id,
        method: 'get'
    });
}

function deleteClasss(ids) {
    return ajax({
        url: '/class/deletes?ids=' + ids,
        method: 'get'
    });
}

function submitUploadForm(data) {
    return ajax({
        url: '/class/uploadMaterials',
        method: 'post',
        data
    });
}

function getCatalogues(pid, classId) {
    return ajax({
        url: '/catalogue/getCatalogues/' + pid + '/' + classId,
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

function deleteCatalogue(id, classId) {
    return ajax({
        url: '/catalogue/deleteCatalogue/' + id + '/' + classId,
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

function getMaterialsByClassId(id) {
    return ajax({
        url: '/material/getMaterialsByClassId/' + id,
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

function getClassTransfer() {
    return ajax({
        url: '/class/getTransfer',
        method: 'get'
    });
}

export default {
    getPage, getTransferData, submitClassForm, submitUploadForm, getClass,
    deleteClass, deleteClasss, getCatalogues, insertCatalogue, deleteCatalogue, iterator,
    getMaterialsByClassId, linkMaterials, getClassTransfer
}

