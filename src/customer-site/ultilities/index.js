const getStaticResourceUrl = (path) => {
    console.log(path);
    return path ? `http://localhost:8000/${path}` : '';

}

export {
    getStaticResourceUrl
};
