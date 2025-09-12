const imageURL = "/media/images/";
const videoURL = "/media/videos/";
export const baseURL = "https://app.explorerbees.com/apiv/api_v10/";

// Original function for user images (keep as is)
export const getImagefromArray = (array) => {
  if (!Array.isArray(array) || array.length === 0) {
    return imageURL + "placeholder_user.png";
  }
  return imageURL + array[0].image_name;
};

//  Main media URL function
export const getMediaURL = (mediaItem) => {
  if (!mediaItem || !mediaItem.name) {
    console.log("No mediaItem or name:", mediaItem);
    return imageURL + "placeholder_user.png";
  }

  if (mediaItem.type === "1") {
    // Video - HLS playlist URL (videos are stored as folder names without extension)
    const videoPath = videoURL + mediaItem.name + "/output.m3u8";
    console.log("Video URL constructed:", videoPath);
    return videoPath;
  } else {
    // Image - images should have extensions already
    const imagePath = imageURL + mediaItem.name;
    console.log("Image URL constructed:", imagePath);
    return imagePath;
  }
};

// Video thumbnail URL function
export const getVideoThumbnailURL = (mediaItem) => {
  if (!mediaItem || !mediaItem.video_thumbnail) {
    console.log("No video thumbnail:", mediaItem);
    return imageURL + "placeholder_user.png";
  }
  const thumbnailPath = imageURL + mediaItem.video_thumbnail;
  console.log("Thumbnail URL constructed:", thumbnailPath);
  return thumbnailPath;
};

// User image URL function
export const getUserImageURL = (user_image) => {
  if (!user_image) {
    return imageURL + "placeholder_user.png";
  }
  return imageURL + user_image;
};

// Helper functions to check media type
export const isVideo = (mediaItem) => {
  if (!mediaItem) return false;
  if (mediaItem.type === "1") return true;
  // fallback: check extension
  return /\.(mp4|webm|ogg|m3u8)$/i.test(mediaItem.name);
};

export const isImage = (mediaItem) => {
  if (!mediaItem) return false;
  if (mediaItem.type === "0") return true;
  // fallback: check extension
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(mediaItem.name);
};

// Enhanced getTrendingMedia with better error handling and logging
export const getTrendingMedia = async (
  type = "all",
  limit = 20,
  offset = 0
) => {
  try {
    const formData = new FormData();

    // Convert type parameter
    if (type === "images") type = "0";
    else if (type === "videos") type = "1";
    else if (type === "all") type = "";

    formData.append("type", type);
    formData.append("limit", limit.toString());
    formData.append("offset", offset.toString());

    console.log("API Request params:", { type, limit, offset });

    const response = await fetch(`${baseURL}getTrending.php`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data);

    return data;
  } catch (error) {
    console.error("Error fetching trending media:", error);
    throw error;
  }
};

// Debug function to test URLs
export const testMediaURLs = (mediaItem) => {
  console.log("Testing media item:", mediaItem);
  console.log("Is Video:", isVideo(mediaItem));
  console.log("Is Image:", isImage(mediaItem));
  console.log("Generated URL:", getMediaURL(mediaItem));

  if (isVideo(mediaItem)) {
    console.log("Video thumbnail URL:", getVideoThumbnailURL(mediaItem));
  }
};
