export const imageURL = "https://app.explorerbees.com/media/images/";
export const videoURL = "https://app.explorerbees.com/media/videos/";
export const baseURL = "https://app.explorerbees.com/apiv/api_v10/";


export const getImagefromArray = (array) => {
  if (!Array.isArray(array) || array.length === 0) {
    return imageURL + "placeholder_user.png";
  }
  return imageURL + array[0].image_name;
};