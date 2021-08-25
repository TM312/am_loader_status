import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'

const BUCKET_NAME = process.env.BUCKET_NAME
const BUCKET_PREFIX = process.env.BUCKET_PREFIX
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
const AWS_DEFAULT_REGION = process.env.AWS_DEFAULT_REGION




export const createApi = ({ store }) => ({
    client: null,

    getClient() {
        if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
            return;
        }

        if (!this.client) {
            this.client = new S3Client({
                credentials: {
                    accessKeyId: AWS_ACCESS_KEY_ID,
                    secretAccessKey: AWS_SECRET_ACCESS_KEY,
                },
                apiVersion: '2006-03-01',
                region: AWS_DEFAULT_REGION,
            });
        }

        return this.client;
    },

    /**
     * Update the remote store with the current local store state
     */
    async listObjects() {
        const client = this.getClient();

        if (!client) {
            return;
        }

        try {
            const params = {
                Bucket: BUCKET_NAME,
                Prefix: BUCKET_PREFIX,
            };

            res = await client.send(new ListObjectsV2Command(params));
            return res
        } catch (e) {
            throw new Error(e.message);
        }
    },
});