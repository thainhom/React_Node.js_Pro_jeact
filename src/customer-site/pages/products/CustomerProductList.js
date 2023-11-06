import ProductList from '../../components/products/ProductList';

function CustomerProductList() {
    return (
        <>
            <h1 className="text-white text-center mt-3">Danh sách sản phẩm home</h1>
            <ProductList isShowCategory={true} isShowSort={true} />
        </>
    );
};

export default CustomerProductList;
