import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
    region: process.env.REACT_APP_AWS_REGION,
    credentials: {
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY
    }
});

const getTaskAttchements = async (taskId, type) => {
    console.log('this is running');
    const params = {
        Bucket: process.env.REACT_APP_BUCKET,
        Prefix: `tasks/${taskId}/${type}`
    };
    const command = new ListObjectsV2Command(params);
    const { Contents } = await s3.send(command);
    if (Contents.length) {
        const attachements = Contents.map(({ Key }) => ({
            Bucket: process.env.REACT_APP_BUCKET,
            Key
        }));
        const data = await Promise.all(
            attachements?.map(async (attachment) => {
                const command = new GetObjectCommand(attachment);
                const response = await s3.send(command);
                const fileBuffer = await response.Body.transformToByteArray();
                const fileBlob = new Blob([fileBuffer], { type: 'application/octet-stream' });
                const fileName = attachment.Key.split('.');
                const fileType = fileName[fileName.length - 1];
                return { type: fileType, name: attachment.Key, buffer: fileBuffer, blob: fileBlob };
            })
        );
        return data;
    }
};

export default getTaskAttchements;
