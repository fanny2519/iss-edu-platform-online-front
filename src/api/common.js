function beforeAvatarUpload(file) {
    // const isJPG = file.type === 'image/jpeg';
    const isLt10M = file.size / 1024 / 1024 < 200;
    // if (!isJPG) {
    //     this.$message.error('上传头像图片只能是 JPG 格式!');
    // }
    if (!isLt10M) {
        this.$message.error('上传头像图片大小不能超过 200MB!');
    }
    return /*isJPG &&*/ isLt10M;
}

function deleteObject() {
    return new Promise(((resolve) => {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            resolve();
        }).catch(() => {
            this.$message.info('已取消删除');
        });
    }))
}


export default {beforeAvatarUpload, deleteObject}