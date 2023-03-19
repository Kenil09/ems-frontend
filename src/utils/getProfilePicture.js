import { S3Client, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

const s3 = new S3Client({
    region: process.env.REACT_APP_AWS_REGION,
    credentials: {
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY
    }
});

const getProfilePicture = async (bucketName, objectKey) => {
    const params = {
        Bucket: bucketName,
        Key: objectKey
    };
    const command = new GetObjectCommand(params);
    const { Body } = await s3.send(command);
    const imageBuffer = await Body.transformToByteArray(); // get the buffer from the Body property
    const imageBlob = new Blob([imageBuffer], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(imageBlob);

    return imageUrl;
};

export default getProfilePicture;
