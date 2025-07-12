export const uploadCloudinary = async (image) => {
    if (!image) {
        console.error("No image provided for upload");
        return null;
    }

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instagram");
    data.append("cloud_name", "dbasnhg1s");

    try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dbasnhg1s/image/upload", {
            method: "POST",
            body: data,
        });

        const fileData = await res.json();

        console.log("Cloudinary response:", fileData);

        if (fileData && fileData.url) {
            return fileData.url.toString();
        } else {
            console.error("Upload failed or unexpected response:", fileData);
            return null;
        }

    } catch (error) {
        console.error("Cloudinary upload error:", error);
        return null;
    }
};
