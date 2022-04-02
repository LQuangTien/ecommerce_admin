export const api =
  process.env.REACT_APP_MODE === "production"
    ? "https://quangtien-ecommerce-be.herokuapp.com/api"
    : "http://localhost:8080";
export const domain =
  process.env.REACT_APP_MODE === "production"
    ? "https://quangtien-ecommerce-be.herokuapp.com/admin"
    : "http://localhost:8080/admin";
export const generatePictureUrl = (filename) => {
  return filename;
};
