export declare global {
    namespace NodeJS {
        interface ProcessEnv {
            JWT_SECRET: string;
            REDIS_HOST:string;
            REDIS_PORT:string;
            REDIS_PASSWORD:string;
            REDIS_REST_TOKEN:string;
            CYPRESS_VIDEO_OPTION:boolean;
            CYPRESS_USER_EMAIL:string;
            CYPRESS_USER_PASSWORD:string;
        }
    }
}