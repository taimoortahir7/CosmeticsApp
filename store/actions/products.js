export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";
import Product from "../../models/product";

export const fetchProducts = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://perfumesrnproject.firebaseio.com/products.json"
    );

    const resData = await response.json();
    console.log("resData: ", resData);
    const loadedProducts = [];

    for (const key in resData) {
      loadedProducts.push(
        new Product(
          key,
          "u1",
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price
        )
      );
    }
    console.log("loaded products: ", loadedProducts);
    dispatch({ type: SET_PRODUCTS, products: loadedProducts });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://perfumesrnproject.firebaseio.com/products.json?auth=${token}`,
      {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      }
    );
    const resData = await response.json();
    console.log(resData);
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl,
    },
  };
};
